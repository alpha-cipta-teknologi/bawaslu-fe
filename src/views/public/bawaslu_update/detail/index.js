import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { HeartIcon, EyeIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'

import { Text, CustomIcon, Card, Input, Button } from 'core/components'
import { hooks, utils, momentHelper } from 'utility'
import { actions } from 'store'
import { apiConfig } from 'configs'
import { images } from 'constant'

import { MoreArticles, TopArticles } from '../components'

const BawasluUpdateDetailPage = () => {
  const history = useHistory()
  const { slug } = useParams()

  // ** Store & Actions
  const getDataBawasluUpdate = hooks.useCustomDispatch(actions.bawasluupdates.getDataBawasluUpdate)
  const getBawasluUpdateDetail = hooks.useCustomDispatch(actions.bawasluupdates.getBawasluUpdateDetail)
  const commentBawasluUpdate = hooks.useCustomDispatch(actions.forums.commentForumArticle)
  const getDataCommentBawasluUpdate = hooks.useCustomDispatch(actions.forums.getDataCommentForumArticle)

  const bawasluList = useSelector(state => state.bawasluupdates).bawasluList
  const bawasluDetail = useSelector(state => state.bawasluupdates).bawasluDetail
  const lazyLoad = useSelector(state => state.misc).lazyLoad
  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : { userdata: null }

  // ** States
  const [commentArticle, setCommentArticle] = useState('')
  const [replyCommentArticle, setReplyCommentArticle] = useState('')
  const [articleId, setArticleId] = useState('')
  const [dataComment, setDataComment] = useState({
    values: [],
    total: 0
  })

  const loading = utils.isLazyLoading(lazyLoad, 'getBawasluUpdateDetail')

  useEffect(() => {
    getDataBawasluUpdate({
      page: 1,
      perPage: 10
    })
  }, [])

  const actionGetDataComment = articleId => {
    getDataCommentBawasluUpdate({
      group: 2,
      id_external: articleId,
      perPage: 1000,
      page: 1
    }, async dt => {
      setDataComment(dt)
    })
  }

  useEffect(() => {
    getBawasluUpdateDetail(slug,
      async data => {
        setArticleId(data.id)

        actionGetDataComment(data.id)
      }
    )
  }, [slug])

  // useEffect(() => {
  //   if (articleId) {
  //     getDataCommentBawasluUpdate({
  //       group: 2,
  //       id_external: articleId,
  //       perPage: 1000,
  //       page: 1
  //     }, async dt => {
  //       setDataComment(dt)
  //     })
  //   }
  // }, [articleId])

  const handleCommentArticle = async () => {

    if (!utils.isUserLoggedIn()) {
      history.push('/login')
      return
    }

    if (commentArticle === '') return

    const author = {
      full_name: userdata.full_name,
      username: userdata.username,
      image_foto: userdata.image_foto
    }

    commentBawasluUpdate({
      group: 2,
      status: 1,
      comment: commentArticle,
      id: articleId
    }, isSuccess => {
      if (isSuccess) {
        actionGetDataComment(articleId)
      }
    })

    setCommentArticle('')
  }

  const handleOpenReplyComment = async (commentid, author = null) => {
    const newDataComment = {
      ...dataComment,
      values: dataComment.values.map(d => {
        if (d.id === commentid) {
          if (d.is_comment) {
            d.is_comment = false
          } else {
            d.is_comment = true
          }
        } else {
          d.is_comment = false
        }

        return d
      })
    }

    setDataComment(newDataComment)

    if (author) setReplyCommentArticle(`@${author.username} `)
  }

  const handleReplyCommentArticle = async (commentid) => {

    if (!utils.isUserLoggedIn()) {
      history.push('/login')
      return
    }

    if (replyCommentArticle === '') return

    const author = {
      full_name: userdata.full_name,
      username: userdata.username,
      image_foto: userdata.image_foto
    }

    const oldDataComment = dataComment
    oldDataComment.values = oldDataComment.values.map(d => {
      if (d.id === commentid) {
        d.reply_comment.unshift({
          id: commentid,
          id_external: commentid,
          group_comment: 3,
          comment: replyCommentArticle,
          created_date: momentHelper.now(),
          author,
          reply_comment: []
        })
      }

      return d
    })
    setDataComment(oldDataComment)

    commentBawasluUpdate({
      group: 3,
      status: 1,
      comment: replyCommentArticle,
      id: commentid
    })

    setReplyCommentArticle('')
    handleOpenReplyComment(commentid)
  }

  const renderCardComment = () => {
    const loadingComment = utils.isLazyLoading(lazyLoad, 'commentForumArticle')

    return (
      <Card cardClassName='mb-2 bg-[#F6F9FB]' contentClassName='flex flex-row justify-around items-center' paddingVertical='p-3' paddingHorizontal='p-3'>
        <div className='flex-shrink-0 bg-gray-200 h-8 w-8 rounded-full'>
          <img
            className='h-8 w-8 rounded-full'
            src={`${userdata} ? ${apiConfig.baseUrl + userdata?.image_foto} : ${images.empty_state.profile}`}
            onError={(e) => (e.target.src = images.empty_state.profile)}
            alt={userdata?.full_name}
          />
        </div>
        <Input
          containerClassName='border border-solid border-[#E0E0E0] flex-auto mx-4'
          key='title'
          id='title'
          placeholder='Tambahkan Komentar'
          onChange={(e) => setCommentArticle(e.target.value)}
          value={commentArticle}
        />
        <Button.ButtonPrimary
          onClick={handleCommentArticle}
          spacing='py-2.5 px-5'
          fontSize='text-base'
          loading={loadingComment}
        >
          Tambah Komentar
        </Button.ButtonPrimary>
      </Card>
    )
  }

  const renderCardReplyComment = id => {
    const loadingReply = utils.isLazyLoading(lazyLoad, 'commentForumArticle')

    return (
      <Card cardClassName='mb-2 bg-[#F6F9FB] md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around items-center' paddingVertical='p-3' paddingHorizontal='p-3'>
        <Input
          containerClassName='border border-solid border-[#E0E0E0] flex-auto mr-4'
          key='title'
          id='title'
          placeholder='Balas'
          value={replyCommentArticle}
          onChange={(e) => setReplyCommentArticle(e.target.value)}
          autoFocus
        />
        <Button.ButtonPrimary
          spacing='py-2.5 px-5'
          fontSize='text-base'
          onClick={() => handleReplyCommentArticle(id)}
          disabled={loadingReply}
        >
          Balas
        </Button.ButtonPrimary>
      </Card>
    )
  }

  return (
    <div className='py-3 md:py-6'>
      <Text weight='font-bold' size='text-2xl' className='mb-7'>Bawaslu Update</Text>

      <TopArticles mainArticle={bawasluDetail} sideArticleList={bawasluList?.data || []} />

      <div className='flex flex-row w-full my-4'>
        <div className='flex flex-row items-center mr-4'>
          <EyeIcon className='w-5 h-5 mr-1' />
          <Text size='text-xs'>{bawasluDetail.counter_view} Melihat</Text>
        </div>
        <div className='flex flex-row items-center mr-4'>
          <HeartIcon className='w-5 h-5 mr-1' />
          <Text size='text-xs'>{bawasluDetail.counter_like} Menyukai</Text>
        </div>
        <div className='flex flex-row items-center mr-4'>
          <CustomIcon iconName='comment' className='w-5 h-5 mr-1' />
          <Text size='text-xs'>{bawasluDetail.counter_comment} Komentar</Text>
        </div>
        <div className='flex flex-row items-center'>
          <CustomIcon iconName='share' className='w-5 h-5 mr-1' />
          <Text size='text-xs'>{bawasluDetail.counter_share} Dibagikan</Text>
        </div>
      </div>
      <div className='flex flex-col'>
        <Text size='text-xxs' className='mb-3'>{momentHelper.formatDateFull(bawasluDetail.created_date)}</Text>
        <Text weight='font-bold' size='text-sm' className='mb-3'>
          {bawasluDetail.title}
        </Text>
        <div className='mb-3' dangerouslySetInnerHTML={{ __html: bawasluDetail.description }} />
      </div>

      {renderCardComment()}

      {dataComment.values.map(data => {
        return (
          <Card cardClassName='mb-2' contentClassName='flex flex-row justify-around' paddingVertical='p-3' paddingHorizontal='p-3' key={data.id}>
            <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-11 w-11 rounded-full'>
              <img
                className='h-11 w-11 rounded-full'
                src={data.author.image_foto ? apiConfig.baseUrl + data.author.image_foto : ''}
                onError={e => (e.target.src = images.empty_state.profile)}
                alt={data.author.full_name}
              />
            </div>
            <div className='flex-auto'>
              <div className='flex flex-row justify-between'>
                <Text
                  size='text-xs'
                  weight='font-bold'
                  lineClamp='line-clamp-1'
                  cursor='cursor-pointer'
                >{data.author.full_name}</Text>
                <Text
                  size='text-xxs'
                  color='text-grey-base'
                  lineClamp='line-clamp-1'
                  cursor='cursor-pointer'
                >{`${momentHelper.formatDateFull(data.created_date)} ${momentHelper.formatTime(data.created_date)}`}</Text>
              </div>
              <Text size='text-sm' className='mb-1'>
                {data.comment}
              </Text>
              <div className='flex flex-row w-full mt-2 mb-1'>
                {/* <div className='flex flex-row items-center mr-4'>
                  <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
                </div> */}
                <div onClick={() => handleOpenReplyComment(data.id, data.author)} className='flex flex-row items-center mr-4 cursor-pointer'>
                  <CustomIcon iconName='comment' className='w-5 h-5 mr-1' />
                  <Text size='text-xs' cursor='cursor-pointer'>Balas</Text>
                </div>
              </div>
              {!!data.is_comment && renderCardReplyComment(data.id)}
              {data.reply_comment.map(rdt => {
                return (
                  <Card cardClassName='mb-2 md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around' paddingVertical='p-3' paddingHorizontal='p-3' border='border-0' key={rdt.id}>
                    <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
                      <img
                        className='h-8 w-8 rounded-full'
                        src={rdt.author.image_foto ? apiConfig.baseUrl + rdt.author.image_foto : ''}
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
                        {/* <div className='flex flex-row items-center mr-4'>
                        <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
                      </div> */}
                        <div onClick={() => handleOpenReplyComment(data.id, rdt.author)} className='flex flex-row items-center mr-4 cursor-pointer'>
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

      <Text weight='font-bold' size='text-2xl' className='my-7'>Berita Lainnya</Text>

      <MoreArticles limit={5} />
    </div>
  )
}

export default BawasluUpdateDetailPage