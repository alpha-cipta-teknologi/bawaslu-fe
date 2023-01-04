import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'

import { Text, Card, CardArticle, Button, Input, CustomIcon, Menu } from 'core/components'
import { hooks, momentHelper, styleHelper, toastify, utils, screen } from 'utility'
import { actions } from 'store'
import { images } from 'constant'

import { CardTrending, CardCreatePost } from '../components'

const CommunityList = lazy(() => import('core/components/CommunityList'))

const menuCardArticle = [
  {
    id: 'delete',
    name: 'Hapus',
    icon: () => <CustomIcon iconName='trash_outline' />
  }
]

const rowsPerPage = 2

const ForumDetailPage = () => {
  const history = useHistory()
  const location = useLocation()
  const { slug } = useParams()
  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : { userdata: null }

  // ** Store & Actions
  const deleteCommentArticle = hooks.useCustomDispatch(actions.forums.deleteCommentArticle)
  const commentForumArticle = hooks.useCustomDispatch(actions.forums.commentForumArticle)
  const getDataCommentForumArticle = hooks.useCustomDispatch(actions.forums.getDataCommentForumArticle)
  const getDataTrendingForumArticle = hooks.useCustomDispatch(actions.forums.getDataTrendingForumArticle)
  const counterViewShare = hooks.useCustomDispatch(actions.forums.counterViewShare)
  const getAllDataCommunity = hooks.useCustomDispatch(actions.communities.getAllDataCommunity)
  const getForumArticleDetail = hooks.useCustomDispatch(utils.isUserLoggedIn() ? actions.forums.getForumArticleDetailAuth : actions.forums.getForumArticleDetail)

  const allCommunities = useSelector(state => state.communities)?.allCommunities
  const forumDetail = useSelector(state => state.forums).forumDetail
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const observer = useRef()

  const [commentArticle, setCommentArticle] = useState('')
  const [replyCommentArticle, setReplyCommentArticle] = useState('')
  const [openCommentSection, setOpenCommentSection] = useState({
    articleid: 0,
    commentid: 0,
    rcommentid: 0
  })
  const [hasMoreData, setHasMoreData] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [page, setPage] = useState(1)

  const windowDimensions = hooks.useWindowDimensions()

  const loadingComment = utils.isLazyLoading(lazyLoad, 'getDataCommentForumArticle')

  const handleOpenComment = id => {
    setOpenCommentSection(prev => ({
      articleid: prev?.articleid === id ? 0 : id,
      commentid: 0,
      rcommentid: 0
    }))
  }

  const fetchCommentArticle = id => {
    getDataCommentForumArticle({
      group: 1,
      id_external: id || forumDetail?.id,
      perPage: rowsPerPage,
      page
    }, () => {
      if (!isMounted) setIsMounted(true)
      if (refreshing) setRefreshing(false)
    })
  }

  useEffect(() => {
    // todo: minta api u/ get forum article detail without auth
    const getData = () => {
      if (!utils.isUserLoggedIn() && forumDetail?.slug !== slug) {
        if (allCommunities?.length) {
          history.push(`/forum/channel/${allCommunities[0]?.value || 1}`)
        } else {
          getAllDataCommunity(data => {
            if (data && data?.length) {
              history.push(`/forum/channel/${data[0]?.value || 1}`)
            }
          })
        }

        return
      }

      if (utils.isUserLoggedIn() && slug !== forumDetail?.slug) {
        getForumArticleDetail({ slug }, (isSuccess, data) => {
          if (isSuccess || data?.id) {
            counterViewShare({
              id: data?.id,
              group: 1,
              counter: 'view',
              reducer: 'forums'
            })

            fetchCommentArticle(data?.id)
          }
        })
      } else {
        counterViewShare({
          id: forumDetail?.id,
          group: 1,
          counter: 'view',
          reducer: 'forums'
        })
      }
    }

    getData()
  }, [slug])

  useEffect(() => {
    getDataTrendingForumArticle()
    getAllDataCommunity()
  }, [slug])

  useEffect(() => {
    if (location.state?.isOpenComment && forumDetail?.id) {
      handleOpenComment(forumDetail?.id)
    }
  }, [forumDetail?.id])

  const handleGoToDetail = data => {
    getForumArticleDetail(data, () => {
      setPage(1)

      history.push(`/forum/${data.slug}`)
    })
  }

  const lastElementRef = useCallback(node => {
    if (loadingComment) return

    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreData) {
        if (setPage) setPage(prev => prev + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [loadingComment, hasMoreData])

  useEffect(() => {
    const pageCount = Math.ceil(forumDetail?.comment?.total / rowsPerPage) || 1

    if (page >= pageCount) {
      setHasMoreData(false)
    } else {
      setHasMoreData(true)
    }
  }, [page, forumDetail?.comment?.total])

  useEffect(() => {
    fetchCommentArticle()
  }, [page, forumDetail?.id])

  // ==== Refreshing ====
  useEffect(() => {
    if (refreshing) {
      if (page !== 1) {
        if (setPage) setPage(1)
      } else {
        fetchCommentArticle()
      }
    }
  }, [refreshing])

  const onClickMenuCardComment = (menu, dataComment, articleId) => {
    if (menu.id === 'delete') {
      deleteCommentArticle({
        id: dataComment.id,
        articleid: articleId,
        group_comment: dataComment.group_comment,
        reducer: 'forums'
      }, () => {
        toastify.success('Berhasil menghapus comment')

        // handleShowComment(articleId)
        setRefreshing(true)
      })
    }
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
        setRefreshing(true)
        // handleShowComment(id)
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
        // handleShowComment(articleid)
        setRefreshing(true)
      }
    })

    setReplyCommentArticle('')
  }

  const renderCardArticle = () => {
    // const author = forumDetail?.author
    const isMobile = windowDimensions.width < screen.sm

    return (
      <CardArticle
        data={forumDetail}
        onClickComment={() => {
          handleOpenComment(forumDetail?.id)
          // setRefreshing(true)
          // handleShowComment(forumDetail?.id)
        }}
        isMobile={isMobile}
      />
    )
  }

  const isPossibleDeleteComment = createdById => {
    return utils.isUserLoggedIn() && createdById === userdata?.resource_id
  }

  const renderCardComment = dt => {
    const loadingButtonReplyComment = utils.isLazyLoading(lazyLoad, 'commentForumArticleReply')
    const isReplyComment = forumDetail?.id === openCommentSection?.articleid && dt.id === openCommentSection?.commentid

    return (
      <Card contentClassName='flex flex-row justify-around' paddingVertical='py-3' paddingHorizontal='px-3' border='border border-grey-light-2' key={dt.id}>
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

            <div className='flex items-center gap-x-2.5'>
              <Text
                size='text-xxs'
                color='text-grey-base'
                lineClamp='line-clamp-1'
                cursor='cursor-pointer'
              >{`${momentHelper.formatDateFull(dt.created_date)} ${momentHelper.formatTime(dt.created_date)}`}</Text>

              {isPossibleDeleteComment(dt.created_by) && (
                <Menu
                  renderButton={() => <EllipsisVerticalIcon className='w-4 h-4' />}
                  menuItems={menuCardArticle}
                  onClickMenuItem={menu => onClickMenuCardComment(menu, dt, forumDetail?.id)}
                />
              )}
            </div>
          </div>
          <Text size='text-sm' className='mb-1'>
            {dt.comment}
          </Text>
          <div className='flex flex-row w-full mt-2 mb-1'>
            <div onClick={() => handleOpenReplyComment(forumDetail?.id, dt.id, null, dt.author)} className='flex flex-row items-center mr-4 cursor-pointer'>
              <CustomIcon iconName='comment' className='w-5 h-5 mr-1' />
              <Text size='text-xs' cursor='cursor-pointer'>Balas</Text>
            </div>
          </div>

          {isReplyComment &&
            <Card cardClassName='mb-2 bg-[#F6F9FB]' contentClassName='flex flex-row justify-around items-center' paddingVertical='py-3' paddingHorizontal='px-2'>
              <Input
                containerClassName='flex-auto mr-4'
                borderColor='border-grey-light-1'
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
                onClick={() => handleReplyCommentArticle(forumDetail?.id, dt.id)}
                loading={loadingButtonReplyComment}
              >
                Balas
              </Button.ButtonPrimary>
            </Card>
          }

          {dt.reply_comment.map(rdt => {
            return (
              <Card cardClassName='mb-2 md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around' paddingVertical='py-3' paddingHorizontal='px-0' border='border-0' key={rdt.id}>
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

                    <div className='flex items-center gap-x-2.5'>
                      <Text
                        size='text-xxs'
                        color='text-grey-base'
                        lineClamp='line-clamp-1'
                        cursor='cursor-pointer'
                      >{`${momentHelper.formatDateFull(rdt.created_date)} ${momentHelper.formatTime(rdt.created_date)}`}</Text>

                      {isPossibleDeleteComment(rdt.created_by) && (
                        <Menu
                          renderButton={() => <EllipsisVerticalIcon className='w-4 h-4' />}
                          menuItems={menuCardArticle}
                          onClickMenuItem={menu => onClickMenuCardComment(menu, rdt, forumDetail?.id)}
                        />
                      )}
                    </div>
                  </div>
                  <Text size='text-sm' className='mb-1'>
                    {rdt.comment}
                  </Text>
                  <div className='flex flex-row w-full mt-2'>
                    <div onClick={() => handleOpenReplyComment(forumDetail?.id, dt.id, rdt.id, rdt.author)} className='flex flex-row items-center mr-4 cursor-pointer'>
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
  }

  const renderCommentSection = () => {
    const isArticleComment = forumDetail?.id === openCommentSection?.articleid
    const loadingButtonComment = utils.isLazyLoading(lazyLoad, 'commentForumArticle')

    return (
      <div className={styleHelper.classNames('grid gap-y-4', isArticleComment ? 'mt-4' : '')}>
        {isArticleComment &&
          <Card cardClassName='bg-[#F6F9FB]' contentClassName='flex flex-row justify-around items-center' paddingVertical='py-3' paddingHorizontal='px-3'>
            <div className='flex-shrink-0 bg-gray-200 h-8 w-8 rounded-full'>
              <img
                className='h-8 w-8 rounded-full'
                src={userdata && userdata?.image_foto ? utils.getImageAPI(userdata?.image_foto) : images.empty_state.profile}
                onError={(e) => (e.target.src = images.empty_state.profile)}
                alt={userdata?.full_name}
              />
            </div>
            <Input
              containerClassName='flex-auto mx-4'
              borderColor='border-grey-light-1'
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
              onClick={() => handleCommentArticle(forumDetail?.id)}
              loading={loadingButtonComment}
            >
              Komentar
            </Button.ButtonPrimary>
          </Card>}

        {isArticleComment
          && forumDetail?.comment
          && forumDetail?.comment.values.map((dt, i) => {
            const isLastElement = forumDetail?.comment.values?.length === i + 1

            return isLastElement ? (
              <div key={i} ref={lastElementRef}>
                {renderCardComment(dt)}
              </div>
            ) : (
              <div key={i}>
                {renderCardComment(dt)}
              </div>
            )
          })}
      </div>
    )
  }

  const renderCommunityList = (cardClassName, cardStyle) => {
    return (
      <Suspense fallback={<></>}>
        <CommunityList
          channelId={forumDetail?.komunitas?.id ? +forumDetail?.komunitas?.id : undefined}
          cardClassName={cardClassName}
          cardStyle={cardStyle}
        />
      </Suspense>
    )
  }

  const renderStickyCommunityList = () => {
    const isMobile = windowDimensions.width < screen.lg

    return (
      <div className='lg:sticky lg:top-[90px]'>
        {renderCommunityList('overflow-y-auto custom-scrollbar', { maxHeight: isMobile ? 500 : 'calc(100vh - 110px)' })}
      </div>
    )
  }

  const renderCardCreatePost = (isBottomSheet = false) => {
    const channelId = forumDetail?.komunitas?.id ? +forumDetail?.komunitas?.id : undefined

    return (
      <CardCreatePost channelId={channelId} isBottomSheet={isBottomSheet} />
    )
  }

  return (
    <>
      <div className='py-6 md:py-11'>

        <div className='grid lg:grid-cols-12 flex-col w-full md:flex-row gap-5'>
          <CardTrending onClick={handleGoToDetail} wrapperClassName='hidden lg:block' />

          <div className='flex flex-col w-full lg:col-span-6'>
            {renderCardArticle()}
            {renderCommentSection()}
          </div>

          <div className='w-full hidden lg:flex lg:flex-col gap-5 lg:col-span-3'>
            {renderCardCreatePost()}

            {renderStickyCommunityList()}
          </div>

          <div className='w-full flex lg:hidden flex-col gap-5'>
            <CardTrending onClick={handleGoToDetail} />

            {renderStickyCommunityList()}
          </div>

        </div>
      </div>

      {renderCardCreatePost(true)}
    </>
  )
}

export default ForumDetailPage