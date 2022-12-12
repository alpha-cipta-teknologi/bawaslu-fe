import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { convertNodeToElement } from 'react-html-parser'
import { EllipsisVerticalIcon, HeartIcon } from '@heroicons/react/24/outline'
import _truncate from 'lodash/truncate'

import { Card, Tabs, Text, CustomIcon, TextHTML, Menu } from 'core/components'
import { hooks, momentHelper, styleHelper, toastify, utils } from 'utility'
import { actions } from 'store'
import { apiConfig } from 'configs'

import { FormChangePassword, FormUpdateProfile } from './components'

const profileMenus = [
  {
    id: 'profile',
    name: 'Profile',
    iconName: 'user'
  },
  {
    id: 'forum_article',
    name: 'Postingan',
    iconName: 'document'
  },
  {
    id: 'change_password',
    name: 'Kata Sandi',
    iconName: 'lock'
  },
  {
    id: 'logout',
    name: 'Keluar',
    iconName: 'logout_2'
  }
]

const menuCardArticle = [
  {
    id: 'delete',
    name: 'Hapus',
    icon: () => <CustomIcon iconName='trash_outline' />
  }
]

const ExtendedTextArticle = ({ text, length = 200 }) => {
  const [showMore, setShowMore] = useState(false)

  const transformArticle = (node, nodeIdx) => {
    if (node.type === 'tag' && node.name === 'p' && nodeIdx === 0) {
      return (
        <Text
          key={nodeIdx}
          type='span'
          size='text-sm'
        >
          {node.children.map((child, childIdx) => {
            return convertNodeToElement(child, childIdx, transformArticle)
          })}
        </Text>
      )
    }
  }

  return (
    <span>
      <TextHTML
        htmlString={showMore ? text : _truncate(text || '', { length })}
        size='text-sm'
        options={{ transform: transformArticle }}
      />{' '}

      {text?.length > length &&
        <Text
          type='span'
          size='text-sm'
          color='text-primary'
          underlineOnHover
          onClick={() => setShowMore(!showMore)}
        >{showMore ? '(sembunyikan)' : '(lanjut)'}</Text>
      }
    </span>
  )
}

const CounterArticle = ({
  text,
  renderIcon
}) => {
  return (
    <div className='flex flex-row items-center gap-x-1.5'>
      {renderIcon()}
      <Text size='text-xs' weight='font-medium'>{text}</Text>
    </div>
  )
}

const ProfilePage = () => {
  const history = useHistory()

  const handleLogout = hooks.useCustomDispatch(actions.auth.handleLogout)
  const getDataForumArticle = hooks.useCustomDispatch(actions.forums.getDataForumArticleAuth)
  const deleteForumArticle = hooks.useCustomDispatch(actions.forums.deleteForumArticle)

  const forumList = useSelector(state => state.forums).forumList
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const observer = useRef()

  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : { userdata: null }

  const [selectedMenuId, setSelectedMenuId] = useState(profileMenus[0].id)
  const [rowsPerPageForum] = useState(1)
  const [pageForum, setPageForum] = useState(1)
  const [hasMoreData, setHasMoreData] = useState(true)
  const [formPassword, setFormPassword] = useState({
    old_password: '',
    password: '',
    confirm_password: ''
  })
  const [showErrorInput, setShowErrorInput] = useState(false)
  const [refreshing, setRefreshing] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  const loadingForumArticle = utils.isLazyLoading(lazyLoad, 'getDataForumArticle')

  const lastElementRef = useCallback(node => {
    if (loadingForumArticle) return

    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreData) {
        setPageForum(prev => prev + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [loadingForumArticle, hasMoreData])

  useEffect(() => {
    if (selectedMenuId === 'forum_article') {
      const pageForumCount = Math.ceil(forumList?.total / rowsPerPageForum) || 1

      if (pageForum >= pageForumCount) {
        setHasMoreData(false)
      } else {
        setHasMoreData(true)
      }
    }
  }, [pageForum, forumList?.total, selectedMenuId])

  const fetchForumArticle = () => {
    getDataForumArticle({
      page: pageForum,
      perPage: rowsPerPageForum
    }, () => {
      if (!isMounted) setIsMounted(true)
      if (refreshing) setRefreshing(false)
    })
  }

  useEffect(() => {
    if (selectedMenuId === 'forum_article') {
      fetchForumArticle()
    }
  }, [pageForum, selectedMenuId])

  // ==== Refreshing ====
  useEffect(() => {
    if (refreshing) {
      window.scrollTo({
        left: 0,
        top: 0
      })

      if (selectedMenuId === 'forum_article' && isMounted) {
        if (pageForum !== 1) setPageForum(1)
        else fetchForumArticle()
      }
    }
  }, [refreshing, selectedMenuId])

  const onLogout = () => {
    handleLogout()

    history.replace('/login')
  }

  const onClickMenuProfile = id => {
    setSelectedMenuId(id)

    if (id === 'profile' || id === 'change_password') setShowErrorInput(false)
    if (id === 'logout') onLogout()
    if (id === 'forum_article') setPageForum(1)
    if (id === 'change_password') {
      setFormPassword({
        old_password: '',
        password: '',
        confirm_password: ''
      })
    }
  }

  const onClickMenuCardArticle = (menu, data) => {
    if (menu.id === 'delete') {
      console.log('delete', data)
      deleteForumArticle(data.id, () => {
        toastify.success('Berhasil menghapus postingan')

        setRefreshing(true)
      })
    }
  }

  const renderCardArticle = data => {
    const author = data.author

    return (
      <Card paddingHorizontal='px-0' paddingVertical='py-4'>
        <div className='px-3 grid gap-y-1.5'>
          <div className='flex justify-between'>
            <div className='flex'>
              <div className='mr-4 flex-shrink-0 self-center'>
                <img
                  className='inline-block h-11 w-11 rounded-full'
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  alt={author?.full_name}
                />
              </div>
              <div className='grid gap-y-1'>
                <Text size='text-sm' weight='font-bold' color='text-black-default'>{author.full_name}</Text>
                <Text size='text-xs' color='text-grey-base'>{momentHelper.formatDateFull(data.created_date)}</Text>
              </div>
            </div>

            <Menu
              renderButton={() => <EllipsisVerticalIcon className='w-5 h-5' />}
              menuItems={menuCardArticle}
              onClickMenuItem={menu => onClickMenuCardArticle(menu, data)}
            />
          </div>

          <Text weight='font-bold'>{data.title}</Text>

          <ExtendedTextArticle text={data.description || ''} />
        </div>

        {data.path_image && (
          <img
            alt={data.title}
            src={apiConfig.baseUrl + data.path_image}
            className='w-full h-full max-h-80 object-cover mt-1.5'
          />
        )}

        <div className='flex flex-row w-full mt-6 px-3 gap-x-4.5'>
          <CounterArticle
            renderIcon={() => (
              <HeartIcon className={styleHelper.classNames(
                'w-5 h-5',
                data.like ? 'fill-[#EB5757] stroke-[#EB5757]' : ''
              )} />
            )}
            text={`${data.counter_like} Menyukai`}
          />
          <CounterArticle
            renderIcon={() => <CustomIcon iconName='comment' className='w-5 h-5' />}
            text={`${data.counter_comment} Komentar`}
          />
          <CounterArticle
            renderIcon={() => <CustomIcon iconName='share' className='w-5 h-5' />}
            text={`${data.counter_share} Dibagikan`}
          />
        </div>
      </Card>
    )
  }

  const renderForumArticles = () => {
    return (
      <div className='grid gap-y-4'>
        {forumList?.data?.map((data, i) => {
          const isLastElement = forumList?.data?.length === i + 1

          return isLastElement ? (
            <div key={i} ref={lastElementRef}>
              {renderCardArticle(data)}
            </div>
          ) : (
            <div key={i}>
              {renderCardArticle(data)}
            </div>
          )
        })}
      </div>
    )
  }

  const renderContent = () => {
    switch (selectedMenuId) {
      case 'forum_article':
        return renderForumArticles()
      case 'profile':
        return (
          <FormUpdateProfile
            selectedMenuId={selectedMenuId}
            showErrorInput={showErrorInput}
            setShowErrorInput={setShowErrorInput}
            userdata={userdata}
          />
        )
      case 'change_password':
        return (
          <FormChangePassword
            selectedMenuId={selectedMenuId}
            showErrorInput={showErrorInput}
            setShowErrorInput={setShowErrorInput}
            userdata={userdata}
            formPassword={formPassword}
            setFormPassword={setFormPassword}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className='py-6 md:py-10'>
      <div className='flex flex-col md:gap-9 md:flex-row'>
        <div className='md:w-1/4'>
          <div className='hidden md:flex flex-col space-y-2 w-full md:sticky md:top-[120px]'>
            <Text size='text-2.5xl' weight='font-bold' className='mb-7'>Profil</Text>

            <Card paddingHorizontal='px-3' paddingVertical='py-3'>
              {profileMenus.map(menu => {
                const isSelected = selectedMenuId === menu.id

                return (
                  <div
                    key={menu.id}
                    className={styleHelper.classNames(
                      'flex items-center gap-x-3 px-4 py-3.5 cursor-pointer rounded',
                      isSelected ? 'bg-primary bg-opacity-[0.12]' : 'bg-white'
                    )}
                    onClick={() => onClickMenuProfile(menu.id)}
                  >
                    <CustomIcon iconName={menu.iconName} className={isSelected ? 'stroke-primary' : 'stroke-grey-light-8'} />

                    <Text
                      weight={isSelected ? 'font-semibold' : 'font-medium'}
                      color={isSelected ? 'text-primary' : 'text-grey-light-8'}
                      cursor='cursor-pointer'
                    >{menu.name}</Text>
                  </div>
                )
              })}
            </Card>
          </div>

          <div className='md:hidden'>
            <Tabs
              tabs={profileMenus}
              selectedTab={selectedMenuId}
              setSelectedTab={setSelectedMenuId}
              keyName='id'
              wrapperClassName='space-x-8 justify-start overflow-x-auto no-scrollbar'
              onClick={tab => onClickMenuProfile(tab.id || '')}
            />
          </div>
        </div>

        <div className='w-full mt-7.5 md:mt-16 md:w-3/4 min-h-[65vh]'>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage