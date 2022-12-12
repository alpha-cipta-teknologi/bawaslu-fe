import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { convertNodeToElement } from 'react-html-parser'
import { EllipsisVerticalIcon, HeartIcon } from '@heroicons/react/24/outline'
import _truncate from 'lodash/truncate'

import { hooks, momentHelper, styleHelper, toastify, utils } from 'utility'
import { actions } from 'store'

import Card from '../Card'
import Text from '../Text'
import CustomIcon from '../CustomIcon'
import TextHTML from '../TextHTML'
import Menu from '../Menu'
import EmptyState from '../EmptyState'
import Spinner from '../Loader/Spinner'

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

const ForumArticleList = ({
  fulfilledCondition,
  withActionCard,
  page,
  setPage,
  rowsPerPage = 10,
  emptyStateTitle = 'Tidak ada data'
}) => {
  const getDataForumArticle = hooks.useCustomDispatch(actions.forums.getDataForumArticleAuth)
  const deleteForumArticle = hooks.useCustomDispatch(actions.forums.deleteForumArticle)

  const forumList = useSelector(state => state.forums).forumList
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const observer = useRef()

  const [hasMoreData, setHasMoreData] = useState(true)
  const [refreshing, setRefreshing] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  const loadingForumArticle = utils.isLazyLoading(lazyLoad, 'getDataForumArticle')

  const lastElementRef = useCallback(node => {
    if (loadingForumArticle) return

    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreData) {
        if (setPage) setPage(prev => prev + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [loadingForumArticle, hasMoreData])

  useEffect(() => {
    if (fulfilledCondition) {
      const pageCount = Math.ceil(forumList?.total / rowsPerPage) || 1

      if (page >= pageCount) {
        setHasMoreData(false)
      } else {
        setHasMoreData(true)
      }
    }
  }, [page, forumList?.total, fulfilledCondition])

  const fetchForumArticle = () => {
    getDataForumArticle({
      page,
      perPage: rowsPerPage
    }, () => {
      if (!isMounted) setIsMounted(true)
      if (refreshing) setRefreshing(false)
    })
  }

  useEffect(() => {
    if (fulfilledCondition) {
      fetchForumArticle()
    }
  }, [page, fulfilledCondition])

  // ==== Refreshing ====
  useEffect(() => {
    if (refreshing) {
      window.scrollTo({
        left: 0,
        top: 0
      })

      if (fulfilledCondition && isMounted) {
        if (page !== 1) {
          if (setPage) setPage(1)
        } else fetchForumArticle()
      }
    }
  }, [refreshing, fulfilledCondition])

  const onClickMenuCardArticle = (menu, data) => {
    if (menu.id === 'delete') {
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
                  src={utils.getImageAPI(author?.image_foto)}
                  alt={author?.full_name}
                />
              </div>
              <div className='grid gap-y-1'>
                <Text size='text-sm' weight='font-bold' color='text-black-default'>{author.full_name}</Text>
                <Text size='text-xs' color='text-grey-base'>{momentHelper.formatDateFull(data.created_date)}</Text>
              </div>
            </div>

            {withActionCard && (
              <Menu
                renderButton={() => <EllipsisVerticalIcon className='w-5 h-5' />}
                menuItems={menuCardArticle}
                onClickMenuItem={menu => onClickMenuCardArticle(menu, data)}
              />
            )}
          </div>

          <Text weight='font-bold'>{data.title}</Text>

          <ExtendedTextArticle text={data.description || ''} />
        </div>

        {data.path_image && (
          <img
            alt={data.title}
            src={utils.getImageAPI(data.path_image)}
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

  const renderSpinner = () => {
    return (
      <div className='w-full my-12.5 center-content'>
        <Spinner sizing='w-7.5 h-7.5' />
      </div>
    )
  }

  const renderForumArticles = () => {
    if (!forumList?.data?.length && !loadingForumArticle && isMounted) {
      return (
        <EmptyState title={emptyStateTitle} />
      )
    }

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

        {loadingForumArticle && renderSpinner()}
      </div>
    )
  }

  return renderForumArticles()
}

export default ForumArticleList