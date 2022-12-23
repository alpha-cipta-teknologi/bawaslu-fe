import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { hooks, styleHelper, toastify, utils, screen } from 'utility'
import { actions } from 'store'

import EmptyState from '../EmptyState'
import Spinner from '../Loader/Spinner'

import { CardArticle } from './components'

// const menuCardArticle = [
//   {
//     id: 'delete',
//     name: 'Hapus',
//     icon: () => <CustomIcon iconName='trash_outline' />
//   }
// ]

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
  const getForumArticleDetail = hooks.useCustomDispatch(actions.forums.getForumArticleDetail)
  // const deleteCommentArticle = hooks.useCustomDispatch(actions.forums.deleteCommentArticle)
  // const likeForumArticle = hooks.useCustomDispatch(actions.forums.likeForumArticle)
  // const commentForumArticle = hooks.useCustomDispatch(actions.forums.commentForumArticle)
  // const getDataCommentForumArticle = hooks.useCustomDispatch(actions.forums.getDataCommentForumArticle)

  const forumList = useSelector(state => state.forums).forumList
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const observer = useRef()

  const [hasMoreData, setHasMoreData] = useState(true)
  const [refreshing, setRefreshing] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  // const [commentArticle, setCommentArticle] = useState('')
  // const [replyCommentArticle, setReplyCommentArticle] = useState('')
  // const [openCommentSection, setOpenCommentSection] = useState({
  //   articleid: 0,
  //   commentid: 0,
  //   rcommentid: 0
  // })

  const loadingForumArticle = utils.isLazyLoading(lazyLoad, 'getDataForumArticle')
  const windowDimensions = hooks.useWindowDimensions()

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

  const handleGoToDetail = (data, state) => {
    getForumArticleDetail(data, () => {
      history.push({
        pathname: `/forum/${data.slug}`,
        state
      })
    })
  }

  // const handleShowComment = async id => {
  //   getDataCommentForumArticle({
  //     group: 1,
  //     id_external: id,
  //     perPage: 1000,
  //     page: 1
  //   })
  // }

  const onClickMenuCardArticle = (menu, data) => {
    if (menu.id === 'delete') {
      deleteForumArticle(data.id, () => {
        toastify.success('Berhasil menghapus postingan')

        setRefreshing(true)
      })
    }
  }

  // const onClickMenuCardComment = (menu, dataComment, articleId) => {
  //   if (menu.id === 'delete') {
  //     deleteCommentArticle({
  //       id: dataComment.id,
  //       articleid: articleId,
  //       group_comment: dataComment.group_comment,
  //       reducer: 'forums'
  //     }, () => {
  //       toastify.success('Berhasil menghapus comment')

  //       handleShowComment(articleId)
  //     })
  //   }
  // }

  // const handleLike = id => {
  //   if (!utils.isUserLoggedIn()) {
  //     history.push('/login')
  //     return
  //   }

  //   likeForumArticle({
  //     group: 1,
  //     id,
  //     reducer: 'forums'
  //   })
  // }

  // const handleOpenComment = id => {
  //   setOpenCommentSection(prev => ({
  //     articleid: prev?.articleid === id ? 0 : id,
  //     commentid: 0,
  //     rcommentid: 0
  //   }))
  // }

  // const handleCommentArticle = (id) => {

  //   if (!utils.isUserLoggedIn()) {
  //     history.push('/login')
  //     return
  //   }

  //   if (commentArticle === '') return

  //   commentForumArticle({
  //     group: 1,
  //     status: 1,
  //     comment: commentArticle,
  //     id,
  //     articleid: id,
  //     reducer: 'forums'
  //   }, isSuccess => {
  //     if (isSuccess) {
  //       handleShowComment(id)
  //     }
  //   })

  //   setCommentArticle('')
  // }

  // const handleOpenReplyComment = async (articleid, commentid, rcommentid = null, author = null) => {
  //   setOpenCommentSection(prev => ({
  //     articleid,
  //     commentid: prev?.rcommentid === rcommentid ? 0 : commentid,
  //     rcommentid: prev?.rcommentid === rcommentid ? 0 : rcommentid
  //   }))

  //   if (author) setReplyCommentArticle(`@${author.username} `)
  // }

  // const handleReplyCommentArticle = (articleid, commentid) => {

  //   if (!utils.isUserLoggedIn()) {
  //     history.push('/login')
  //     return
  //   }

  //   if (replyCommentArticle === '') return

  //   commentForumArticle({
  //     group: commentid === 0 ? 1 : 3,
  //     status: 1,
  //     comment: replyCommentArticle,
  //     id: commentid === 0 ? articleid : commentid,
  //     comment_type: 'Reply',
  //     reducer: 'forums'
  //   }, isSuccess => {
  //     if (isSuccess) {
  //       handleShowComment(articleid)
  //     }
  //   })

  //   setReplyCommentArticle('')
  // }

  const renderCardArticle = data => {
    const isMobile = windowDimensions.width < screen.sm

    return (
      <CardArticle
        data={data}
        withActionCard={withActionCard}
        onClickMenuCardArticle={onClickMenuCardArticle}
        // onClickComment={() => {
        //   handleOpenComment(data.id)
        //   handleShowComment(data.id)
        // }}
        onClickComment={() => handleGoToDetail(data, { isOpenComment: true })}
        isMobile={isMobile}
        onClickShowMoreContent={() => handleGoToDetail(data)}
        isContentTruncate
      />
    )
  }

  // const isPossibleDeleteComment = createdById => {
  //   return utils.isUserLoggedIn() && createdById === userdata?.resource_id
  // }

  // const renderCommentSection = data => {
  //   const isArticleComment = data.id === openCommentSection?.articleid
  //   const loadingButtonComment = utils.isLazyLoading(lazyLoad, 'commentForumArticle')
  //   const loadingButtonReplyComment = utils.isLazyLoading(lazyLoad, 'commentForumArticleReply')

  //   return (
  //     <div className={styleHelper.classNames('grid gap-y-4', isArticleComment ? 'mt-4' : '')}>
  //       {isArticleComment &&
  //         <Card cardClassName='bg-[#F6F9FB]' contentClassName='flex flex-row justify-around items-center' paddingVertical='py-3' paddingHorizontal='px-3'>
  //           <div className='flex-shrink-0 bg-gray-200 h-8 w-8 rounded-full'>
  //             <img
  //               className='h-8 w-8 rounded-full'
  //               src={userdata && userdata?.image_foto ? utils.getImageAPI(userdata?.image_foto) : images.empty_state.profile}
  //               onError={(e) => (e.target.src = images.empty_state.profile)}
  //               alt={userdata?.full_name}
  //             />
  //           </div>
  //           <Input
  //             containerClassName='flex-auto mx-4'
  //             borderColor='border-grey-light-1'
  //             key='commentar'
  //             id='commentar'
  //             placeholder='Tambahkan Komentar'
  //             textSize='text-sm'
  //             onChange={(e) => setCommentArticle(e.target.value)}
  //             value={commentArticle}
  //           />
  //           <Button.ButtonPrimary
  //             spacing='py-2.5 px-5'
  //             fontSize='text-sm'
  //             onClick={() => handleCommentArticle(data.id)}
  //             loading={loadingButtonComment}
  //           >
  //             Komentar
  //           </Button.ButtonPrimary>
  //         </Card>}

  //       {isArticleComment && data.comment && data.comment.values.map(dt => {
  //         const isReplyComment = data.id === openCommentSection?.articleid && dt.id === openCommentSection?.commentid

  //         return (
  //           <Card contentClassName='flex flex-row justify-around' paddingVertical='py-3' paddingHorizontal='px-3' border='border border-grey-light-2' key={dt.id}>
  //             <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-11 w-11 rounded-full'>
  //               <img
  //                 className='h-11 w-11 rounded-full'
  //                 src={utils.getImageAPI(dt.author.image_foto)}
  //                 onError={(e) => (e.target.src = images.empty_state.profile)}
  //                 alt={dt.author.full_name}
  //               />
  //             </div>
  //             <div className='flex-auto'>
  //               <div className='flex flex-row justify-between'>
  //                 <Text
  //                   size='text-xs'
  //                   weight='font-bold'
  //                   lineClamp='line-clamp-1'
  //                   cursor='cursor-pointer'
  //                 >{dt.author.full_name}</Text>

  //                 <div className='flex items-center gap-x-2.5'>
  //                   <Text
  //                     size='text-xxs'
  //                     color='text-grey-base'
  //                     lineClamp='line-clamp-1'
  //                     cursor='cursor-pointer'
  //                   >{`${momentHelper.formatDateFull(dt.created_date)} ${momentHelper.formatTime(dt.created_date)}`}</Text>

  //                   {isPossibleDeleteComment(dt.created_by) && (
  //                     <Menu
  //                       renderButton={() => <EllipsisVerticalIcon className='w-4 h-4' />}
  //                       menuItems={menuCardArticle}
  //                       onClickMenuItem={menu => onClickMenuCardComment(menu, dt, data.id)}
  //                     />
  //                   )}
  //                 </div>
  //               </div>
  //               <Text size='text-sm' className='mb-1'>
  //                 {dt.comment}
  //               </Text>
  //               <div className='flex flex-row w-full mt-2 mb-1'>
  //                 <div onClick={() => handleOpenReplyComment(data.id, dt.id, null, dt.author)} className='flex flex-row items-center mr-4 cursor-pointer'>
  //                   <CustomIcon iconName='comment' className='w-5 h-5 mr-1' />
  //                   <Text size='text-xs' cursor='cursor-pointer'>Balas</Text>
  //                 </div>
  //               </div>

  //               {isReplyComment &&
  //                 <Card cardClassName='mb-2 bg-[#F6F9FB] md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around items-center' paddingVertical='py-3' paddingHorizontal='px-0'>
  //                   <Input
  //                     containerClassName='flex-auto mr-4'
  //                     borderColor='border-grey-light-1'
  //                     key='title'
  //                     id='title'
  //                     placeholder='Balas'
  //                     textSize='text-sm'
  //                     value={replyCommentArticle}
  //                     onChange={(e) => setReplyCommentArticle(e.target.value)}
  //                     autoFocus
  //                   />
  //                   <Button.ButtonPrimary
  //                     spacing='py-2.5 px-5'
  //                     fontSize='text-sm'
  //                     onClick={() => handleReplyCommentArticle(data.id, dt.id)}
  //                     loading={loadingButtonReplyComment}
  //                   >
  //                     Balas
  //                   </Button.ButtonPrimary>
  //                 </Card>
  //               }

  //               {dt.reply_comment.map(rdt => {
  //                 return (
  //                   <Card cardClassName='mb-2 md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around' paddingVertical='py-3' paddingHorizontal='px-0' border='border-0' key={rdt.id}>
  //                     <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
  //                       <img
  //                         className='h-8 w-8 rounded-full'
  //                         src={utils.getImageAPI(rdt.author.image_foto)}
  //                         onError={(e) => (e.target.src = images.empty_state.profile)}
  //                         alt={rdt.author.full_name}
  //                       />
  //                     </div>
  //                     <div className='flex-auto'>
  //                       <div className='flex flex-row justify-between'>
  //                         <Text
  //                           size='text-xs'
  //                           weight='font-bold'
  //                           lineClamp='line-clamp-1'
  //                           cursor='cursor-pointer'
  //                         >{rdt.author.full_name}</Text>

  //                         <div className='flex items-center gap-x-2.5'>
  //                           <Text
  //                             size='text-xxs'
  //                             color='text-grey-base'
  //                             lineClamp='line-clamp-1'
  //                             cursor='cursor-pointer'
  //                           >{`${momentHelper.formatDateFull(rdt.created_date)} ${momentHelper.formatTime(rdt.created_date)}`}</Text>

  //                           {isPossibleDeleteComment(rdt.created_by) && (
  //                             <Menu
  //                               renderButton={() => <EllipsisVerticalIcon className='w-4 h-4' />}
  //                               menuItems={menuCardArticle}
  //                               onClickMenuItem={menu => onClickMenuCardComment(menu, rdt, data.id)}
  //                             />
  //                           )}
  //                         </div>
  //                       </div>
  //                       <Text size='text-sm' className='mb-1'>
  //                         {rdt.comment}
  //                       </Text>
  //                       <div className='flex flex-row w-full mt-2'>
  //                         <div onClick={() => handleOpenReplyComment(data.id, dt.id, rdt.id, rdt.author)} className='flex flex-row items-center mr-4 cursor-pointer'>
  //                           <CustomIcon iconName='comment' className='w-5 h-5 mr-1' />
  //                           <Text size='text-xs' cursor='cursor-pointer'>Balas</Text>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </Card>
  //                 )
  //               })}
  //             </div>
  //           </Card>
  //         )
  //       })}
  //     </div>
  //   )
  // }

  const renderSpinner = () => {
    return (
      <div className='w-full my-12.5 flex justify-center items-center'>
        <Spinner sizing='w-7.5 h-7.5' />
      </div>
    )
  }

  const renderForumArticles = () => {
    if ((loadingForumArticle && !isMounted) || forumList?.data?.length) {
      return (
        <div className={styleHelper.classNames('grid gap-y-4', wrapperListClassName)}>
          {!isMounted || (loadingForumArticle && page === 1)
            ? renderSpinner()
            : (
              <>
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
              </>
            )}

          {loadingForumArticle
            && isMounted
            && page > 1
            && renderSpinner()}
        </div>
      )
    }

    return (
      <EmptyState title={emptyStateTitle} />
    )
  }

  return renderForumArticles()
}

export default ForumArticleList