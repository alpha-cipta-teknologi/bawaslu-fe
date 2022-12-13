import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { convertNodeToElement } from 'react-html-parser'
import { EllipsisVerticalIcon, HeartIcon } from '@heroicons/react/24/outline'
import _truncate from 'lodash/truncate'

import { hooks, momentHelper, styleHelper, toastify, utils } from 'utility'
import { actions } from 'store'
import { images } from 'constant'

import Card from '../Card'
import CounterArticle from '../CounterArticle'
import Text from '../Text'
import Input from '../Input'
import Button from '../Button'
import CustomIcon from '../CustomIcon'
import TextHTML from '../TextHTML'
import Menu from '../Menu'
import EmptyState from '../EmptyState'

const menuCardArticle = [
  {
    id: 'delete',
    name: 'Hapus',
    icon: () => <CustomIcon iconName='trash_outline' />
  }
]

const ExtendedTextArticle = ({ text, length = 300 }) => {
  const [showMore, setShowMore] = useState(false)

  const transformArticle = (node, nodeIdx) => {
    if (node.type === 'tag' && (['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.name))) {
      if (node.attribs?.style) {
        node.attribs.style = `${node.attribs?.style || ''}; font-family: "Montserrat" !important;`
      }
    }

    if (node.type === 'tag' && node.name === 'p' && nodeIdx === 0) {
      return (
        <Text
          key={nodeIdx}
          type='span'
          size='text-sm'
        >
          {node.children.map((child, childIdx) => {
            if (child.attribs?.style) {
              child.attribs.style = `${child.attribs?.style || ''}; font-family: "Montserrat" !important;`
            }

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

const ForumArticleList = ({
  fulfilledCondition,
  withActionCard,
  page,
  setPage,
  rowsPerPage = 10,
  emptyStateTitle = 'Tidak ada data',
  wrapperListClassName
}) => {
  const history = useHistory()
  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : { userdata: null }

  // ** Store & Actions
  const getDataForumArticle = hooks.useCustomDispatch(userdata ? actions.forums.getDataForumArticleAuth : actions.forums.getDataForumArticle)
  const deleteForumArticle = hooks.useCustomDispatch(actions.forums.deleteForumArticle)
  const likeForumArticle = hooks.useCustomDispatch(actions.forums.likeForumArticle)
  const commentForumArticle = hooks.useCustomDispatch(actions.forums.commentForumArticle)
  const getDataCommentForumArticle = hooks.useCustomDispatch(actions.forums.getDataCommentForumArticle)

  const forumList = useSelector(state => state.forums).forumList
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const observer = useRef()

  const [hasMoreData, setHasMoreData] = useState(true)
  const [refreshing, setRefreshing] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [commentArticle, setCommentArticle] = useState('')
  const [replyCommentArticle, setReplyCommentArticle] = useState('')
  const [openCommentSection, setOpenCommentSection] = useState({
    articleid: 0,
    commentid: 0,
    rcommentid: 0
  })

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
      perPage: rowsPerPage,
      ...userdata && !withActionCard
        ? { type: 'fe' }
        : {}
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
    if (refreshing && fulfilledCondition && isMounted) {
      if (page !== 1) {
        if (setPage) setPage(1)
      } else {
        fetchForumArticle()
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

  const handleLike = id => {
    if (!utils.isUserLoggedIn()) {
      history.push('/login')
      return
    }

    likeForumArticle({
      group: 1,
      id,
      reducer: 'forums'
    })
  }

  const handleShowComment = async id => {
    getDataCommentForumArticle({
      group: 1,
      id_external: id,
      perPage: 1000,
      page: 1
    })
  }

  const handleOpenComment = id => {
    setOpenCommentSection(prev => ({
      articleid: prev?.articleid === id ? 0 : id,
      commentid: 0,
      rcommentid: 0
    }))
  }

  const handleCommentArticle = (id) => {

    if (!utils.isUserLoggedIn()) {
      history.push('/login')
      return
    }

    if (commentArticle === '') return

    commentForumArticle({
      group: 1,
      status: 1,
      comment: commentArticle,
      id,
      articleid: id,
      reducer: 'forums'
    }, isSuccess => {
      if (isSuccess) {
        handleShowComment(id)
      }
    })

    setCommentArticle('')
  }

  const handleOpenReplyComment = async (articleid, commentid, rcommentid = null, author = null) => {
    setOpenCommentSection(prev => ({
      articleid,
      commentid: prev?.rcommentid === rcommentid ? 0 : commentid,
      rcommentid: prev?.rcommentid === rcommentid ? 0 : rcommentid
    }))

    if (author) setReplyCommentArticle(`@${author.username} `)
  }

  const handleReplyCommentArticle = (articleid, commentid) => {

    if (!utils.isUserLoggedIn()) {
      history.push('/login')
      return
    }

    if (replyCommentArticle === '') return

    commentForumArticle({
      group: commentid === 0 ? 1 : 3,
      status: 1,
      comment: replyCommentArticle,
      id: commentid === 0 ? articleid : commentid,
      comment_type: 'Reply',
      reducer: 'forums'
    }, isSuccess => {
      if (isSuccess) {
        handleShowComment(articleid)
      }
    })

    setReplyCommentArticle('')
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
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null
                    currentTarget.src = images.empty_state.profile
                  }}
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
                'w-5 h-5 cursor-pointer',
                data.like ? 'fill-[#EB5757] stroke-[#EB5757]' : ''
              )} />
            )}
            text={`${data.counter_like} Menyukai`}
            onClick={() => handleLike(data.id)}
          />
          <CounterArticle
            renderIcon={() => (<CustomIcon iconName='comment' className='w-5 h-5 cursor-pointer' />)}
            text={`${data.counter_comment} Komentar`}
            onClick={() => {
              handleOpenComment(data.id)
              handleShowComment(data.id)
            }}
          />
          <CounterArticle
            renderIcon={() => <CustomIcon iconName='share' className='w-5 h-5' />}
            text={`${data.counter_share} Dibagikan`}
          />
        </div>
      </Card>
    )
  }

  const renderCommentSection = data => {
    const isArticleComment = data.id === openCommentSection?.articleid
    const loadingButtonComment = utils.isLazyLoading(lazyLoad, 'commentForumArticle')
    const loadingButtonReplyComment = utils.isLazyLoading(lazyLoad, 'commentForumArticleReply')

    return (
      <div className={styleHelper.classNames('grid gap-y-4', isArticleComment ? 'mt-4' : '')}>
        {isArticleComment &&
          <Card cardClassName='bg-[#F6F9FB]' contentClassName='flex flex-row justify-around items-center' paddingVertical='p-3' paddingHorizontal='p-3'>
            <div className='flex-shrink-0 bg-gray-200 h-8 w-8 rounded-full'>
              <img
                className='h-8 w-8 rounded-full'
                src={userdata && userdata?.image_foto ? utils.getImageAPI(userdata?.image_foto) : images.empty_state.profile}
                onError={(e) => (e.target.src = images.empty_state.profile)}
                alt={userdata?.full_name}
              />
            </div>
            <Input
              containerClassName='border border-solid border-[#E0E0E0] flex-auto mx-4'
              key='commentar'
              id='commentar'
              placeholder='Tambahkan Komentar'
              textSize='text-sm'
              onChange={(e) => setCommentArticle(e.target.value)}
              value={commentArticle}
            />
            <Button.ButtonPrimary
              spacing='py-2.5 px-5'
              fontSize='text-sm'
              onClick={() => handleCommentArticle(data.id)}
              loading={loadingButtonComment}
            >
              Komentar
            </Button.ButtonPrimary>
          </Card>}

        {isArticleComment && data.comment && data.comment.values.map(dt => {
          const isReplyComment = data.id === openCommentSection?.articleid && dt.id === openCommentSection?.commentid

          return (
            <Card contentClassName='flex flex-row justify-around' paddingVertical='p-3' paddingHorizontal='p-3' border='border border-grey-light-2' key={dt.id}>
              <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-11 w-11 rounded-full'>
                <img
                  className='h-11 w-11 rounded-full'
                  src={utils.getImageAPI(dt.author.image_foto)}
                  onError={(e) => (e.target.src = images.empty_state.profile)}
                  alt={dt.author.full_name}
                />
              </div>
              <div className='flex-auto'>
                <div className='flex flex-row justify-between'>
                  <Text
                    size='text-xs'
                    weight='font-bold'
                    lineClamp='line-clamp-1'
                    cursor='cursor-pointer'
                  >{dt.author.full_name}</Text>
                  <Text
                    size='text-xxs'
                    color='text-grey-base'
                    lineClamp='line-clamp-1'
                    cursor='cursor-pointer'
                  >{`${momentHelper.formatDateFull(dt.created_date)} ${momentHelper.formatTime(dt.created_date)}`}</Text>
                </div>
                <Text size='text-sm' className='mb-1'>
                  {dt.comment}
                </Text>
                <div className='flex flex-row w-full mt-2 mb-1'>
                  <div onClick={() => handleOpenReplyComment(data.id, dt.id, null, dt.author)} className='flex flex-row items-center mr-4 cursor-pointer'>
                    <CustomIcon iconName='comment' className='w-5 h-5 mr-1' />
                    <Text size='text-xs' cursor='cursor-pointer'>Balas</Text>
                  </div>
                </div>

                {isReplyComment &&
                  <Card cardClassName='mb-2 bg-[#F6F9FB] md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around items-center' paddingVertical='p-3' paddingHorizontal='p-3'>
                    <Input
                      containerClassName='border border-solid border-[#E0E0E0] flex-auto mr-4'
                      key='title'
                      id='title'
                      placeholder='Balas'
                      textSize='text-sm'
                      value={replyCommentArticle}
                      onChange={(e) => setReplyCommentArticle(e.target.value)}
                      autoFocus
                    />
                    <Button.ButtonPrimary
                      spacing='py-2.5 px-5'
                      fontSize='text-sm'
                      onClick={() => handleReplyCommentArticle(data.id, dt.id)}
                      loading={loadingButtonReplyComment}
                    >
                      Balas
                    </Button.ButtonPrimary>
                  </Card>
                }

                {dt.reply_comment.map(rdt => {
                  return (
                    <Card cardClassName='mb-2 md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around' paddingVertical='p-3' paddingHorizontal='p-3' border='border-0' key={rdt.id}>
                      <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
                        <img
                          className='h-8 w-8 rounded-full'
                          src={utils.getImageAPI(rdt.author.image_foto)}
                          onError={(e) => (e.target.src = images.empty_state.profile)}
                          alt={rdt.author.full_name}
                        />
                      </div>
                      <div className='flex-auto'>
                        <div className='flex flex-row justify-between'>
                          <Text
                            size='text-xs'
                            weight='font-bold'
                            lineClamp='line-clamp-1'
                            cursor='cursor-pointer'
                          >{rdt.author.full_name}</Text>
                          <Text
                            size='text-xxs'
                            color='text-grey-base'
                            lineClamp='line-clamp-1'
                            cursor='cursor-pointer'
                          >{`${momentHelper.formatDateFull(rdt.created_date)} ${momentHelper.formatTime(rdt.created_date)}`}</Text>
                        </div>
                        <Text size='text-sm' className='mb-1'>
                          {rdt.comment}
                        </Text>
                        <div className='flex flex-row w-full mt-2'>
                          <div onClick={() => handleOpenReplyComment(data.id, dt.id, rdt.id, rdt.author)} className='flex flex-row items-center mr-4 cursor-pointer'>
                            <CustomIcon iconName='comment' className='w-5 h-5 mr-1' />
                            <Text size='text-xs' cursor='cursor-pointer'>Balas</Text>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </Card>
          )
        })}
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
      <div className={styleHelper.classNames('grid gap-y-4', wrapperListClassName)}>
        {forumList?.data?.map((data, i) => {
          const isLastElement = forumList?.data?.length === i + 1

          return isLastElement ? (
            <div key={i} ref={lastElementRef}>
              {renderCardArticle(data)}
              {renderCommentSection(data)}
            </div>
          ) : (
            <div key={i}>
              {renderCardArticle(data)}
              {renderCommentSection(data)}
            </div>
          )
        })}
      </div>
    )
  }

  return renderForumArticles()
}

export default ForumArticleList