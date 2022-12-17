import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Text, Card, Button, ForumArticleList, Spinner } from 'core/components'
import { hooks, utils, momentHelper } from 'utility'
import { actions } from 'store'

const ForumListPage = () => {

  const history = useHistory()
  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : { userdata: null }

  // ** Store & Actions
  const likeForumArticle = hooks.useCustomDispatch(actions.forums.likeForumArticle)
  const commentForumArticle = hooks.useCustomDispatch(actions.forums.commentForumArticle)
  const getDataCommentForumArticle = hooks.useCustomDispatch(actions.forums.getDataCommentForumArticle)
  const getDataTrendingForumArticle = hooks.useCustomDispatch(actions.forums.getDataTrendingForumArticle)

  const trendingForumList = useSelector(state => state.forums).trendingForumList
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [forumArticles, setForumArticle] = useState([])
  const [commentArticle, setCommentArticle] = useState('')
  const [replyCommentArticle, setReplyCommentArticle] = useState('')

  useEffect(() => {
    getDataTrendingForumArticle()
  }, [])

  // useEffect(() => {
  //   getDataForumArticle({
  //     page: currentPage,
  //     perPage: rowsPerPage,
  //     ...userdata
  //       ? { type: 'fe' }
  //       : {}
  //   }, async data => {
  //     let oldForumArticles = forumArticles
  //     oldForumArticles = oldForumArticles.concat(data)
  //     setForumArticle(oldForumArticles.map(d => {
  //       d.comment = {
  //         values: [],
  //         total: 0
  //       }
  //       return d
  //     }))
  //   })
  // }, [currentPage])

  const handleLike = async id => {
    let oldForumArticles = forumArticles
    oldForumArticles = oldForumArticles.map(d => {
      if (d.id === id) {
        if (d.like) {
          d.like = false
          d.counter_like = d.counter_like - 1
        } else {
          d.like = true
          d.counter_like = d.counter_like + 1
        }

      }
      return d
    })

    setForumArticle(oldForumArticles)

    likeForumArticle({
      group: 1,
      id
    })
  }

  const handleOpenComment = async id => {
    let oldForumArticles = forumArticles
    oldForumArticles = oldForumArticles.map(d => {

      if (d.id === id) {
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

    setForumArticle(oldForumArticles)
  }

  const handleShowComment = async id => {
    getDataCommentForumArticle({
      group: 1,
      id_external: id,
      perPage: 1000,
      page: 1
    }, async data => {
      let oldForumArticles = forumArticles
      oldForumArticles = oldForumArticles.map(d => {

        if (d.id === id) {
          d.comment = data
        }

        return d
      })

      setForumArticle(oldForumArticles)
    })
  }

  const handleCommentArticle = async (id) => {

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

    let oldForumArticles = forumArticles
    oldForumArticles = oldForumArticles.map(d => {
      if (d.id === id) {
        d.counter_comment = d.counter_comment + 1
        if (d.comment) {
          d.comment.values.unshift({
            id: 0,
            id_external: id,
            group_comment: 1,
            comment: commentArticle,
            created_date: momentHelper.now(),
            author,
            reply_comment: []
          })
        }
      }
      return d
    })

    setForumArticle(oldForumArticles)

    commentForumArticle({
      group: 1,
      status: 1,
      comment: commentArticle,
      id
    })

    setCommentArticle('')
  }

  const handleOpenReplyComment = async (articleid, commentid, author = null) => {

    let oldForumArticles = forumArticles
    oldForumArticles = oldForumArticles.map(d => {

      if (d.id === articleid) {
        d.comment.values = d.comment.values.map(dt => {
          if (dt.id === commentid) {
            if (dt.is_comment) {
              dt.is_comment = false
            } else {
              dt.is_comment = true
            }
          } else {
            dt.is_comment = false
          }
          return dt
        })
      }

      return d
    })

    if (author) setReplyCommentArticle(`@${author.username} `)
    setForumArticle(oldForumArticles)
  }

  const handleReplyCommentArticle = async (articleid, commentid) => {

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

    let oldForumArticles = forumArticles
    oldForumArticles = oldForumArticles.map(d => {

      if (d.id === articleid) {
        d.comment.values = d.comment.values.map(dt => {
          if (dt.id === commentid) {
            dt.reply_comment.unshift({
              id: commentid,
              id_external: commentid,
              group_comment: 3,
              comment: replyCommentArticle,
              created_date: momentHelper.now(),
              author,
              reply_comment: []
            })
          }
          return dt
        })
      }

      return d
    })

    setForumArticle(oldForumArticles)

    commentForumArticle({
      group: commentid === 0 ? 1 : 3,
      status: 1,
      comment: replyCommentArticle,
      id: commentid === 0 ? articleid : commentid
    })

    setReplyCommentArticle('')
    handleOpenReplyComment(articleid, commentid)
  }

  const renderCardCreatePost = () => {
    return (
      <Card cardClassName='w-full' paddingHorizontal='px-3' paddingVertical='py-3'>
        <Text weight='font-bold' spacing='mb-4'>Buat Thread</Text>
        <Button.ButtonPrimary
          href={`${!utils.isUserLoggedIn() ? '/login' : '/forum/create'}`}
          spacing='py-2.5 px-5'
          fontSize='text-base'
          sizing='w-full'
        >
          Buat
        </Button.ButtonPrimary>
      </Card>
    )
  }

  const renderContentTrending = () => {
    const data = trendingForumList || []
    const loading = utils.isLazyLoading(lazyLoad, 'getDataTrendingForumArticle')

    if (loading) {
      return <Spinner sizing='w-7.5 h-7.5' />
    }

    if (!data.length && !loading) {
      return <Text size='text-sm'>Tidak ada data</Text>
    }

    return (
      <ul className='list-outside list-disc ml-4 text-sm grid gap-y-3'>
        {data.map(data => {
          return (
            <li key={data.id}><Text size='text-sm' weight='font-bold'>{data.title}</Text></li>
          )
        })}
      </ul>
    )
  }

  const renderCardTrending = () => {
    return (
      <div className='w-full lg:col-span-3'>
        <Card paddingHorizontal='px-3' paddingVertical='py-3'>
          <Text weight='font-bold' spacing='mb-4'>Trending</Text>

          {renderContentTrending()}
        </Card>
      </div>
    )
  }

  return (
    <div className='py-6 md:py-11'>
      <div className='grid lg:grid-cols-12 flex-col w-full md:flex-row gap-5'>
        <div className='w-full flex lg:hidden'>
          {renderCardCreatePost()}
        </div>

        {renderCardTrending()}

        <div className='flex flex-col w-full lg:col-span-6 lg:overflow-y-auto custom-scrollbar lg:h-screen'>
          {/* {forumArticles.map(data => {
            return (
              <Fragment key={data.id}>
                <Card cardClassName='mb-2 lg:mx-2' contentClassName='flex flex-col'>
                  <span className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'>
                    <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
                      <img
                        className='h-8 w-8 rounded-full'
                        src={apiConfig.baseUrl + data.author.image_foto}
                        onError={(e) => (e.target.src = images.empty_state.profile)}
                        alt={data.author.full_name}
                      />
                    </div>
                    <div className='flex-1'>
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
                      >{momentHelper.formatDateFull(data.created_date)}</Text>
                    </div>
                  </span>
                  <Text weight='font-bold' size='text-sm'>
                    {data.title}
                  </Text>
                  <div className='mb-1' dangerouslySetInnerHTML={{ __html: data.description }} />
                  <img
                    className='w-full'
                    src={apiConfig.baseUrl + data.path_thumbnail}
                    alt={''}
                  />
                  <div className='flex flex-row w-full mt-2'>
                    <div className='flex flex-row items-center mr-4'>
                      <HeartIcon onClick={() => handleLike(data.id)} className={`w-5 h-5 mr-1 cursor-pointer ${data.like ? 'fill-[#EB5757] stroke-[#EB5757]' : ''}`} />
                      <Text size='text-xs'>{data.counter_like} Menyukai</Text>
                    </div>
                    <div onClick={() => {
                      handleOpenComment(data.id)
                      handleShowComment(data.id)
                    }} className='flex flex-row items-center mr-4 cursor-pointer'>
                      <CustomIcon iconName='comment' className='w-5 h-5 mr-1' />
                      <Text size='text-xs' cursor='cursor-pointer'>{data.counter_comment} Komentar</Text>
                    </div>
                    <div className='flex flex-row items-center'>
                      <CustomIcon iconName='share' className='w-5 h-5 mr-1' />
                      <Text size='text-xs'>{data.counter_share} Dibagikan</Text>
                    </div>
                  </div>
                </Card>
                {data.is_comment &&
                  <Card cardClassName='mb-2 bg-[#F6F9FB] md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around items-center' paddingVertical='p-3' paddingHorizontal='p-3'>
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
                      key={'commentar'}
                      id={'commentar'}
                      placeholder='Tambahkan Komentar'
                      onChange={(e) => setCommentArticle(e.target.value)}
                      value={commentArticle}
                    />
                    <Button.ButtonPrimary
                      spacing='py-2.5 px-5'
                      fontSize='text-base'
                      onClick={() => handleCommentArticle(data.id)}
                    >
                      Komentar
                    </Button.ButtonPrimary>
                  </Card>
                }
                {data.comment && data.comment.values.map(dt => {
                  return (
                    <Card cardClassName='mb-2 md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around' paddingVertical='p-3' paddingHorizontal='p-3' key={dt.id}>
                      <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-11 w-11 rounded-full'>
                        <img
                          className='h-11 w-11 rounded-full'
                          src={apiConfig.baseUrl + dt.author.image_foto}
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
                          <div onClick={() => handleOpenReplyComment(data.id, dt.id, dt.author)} className='flex flex-row items-center mr-4 cursor-pointer'>
                            <CustomIcon iconName='comment' className='w-5 h-5 mr-1' />
                            <Text size='text-xs' cursor='cursor-pointer'>Balas</Text>
                          </div>
                        </div>
                        {dt.is_comment &&
                          <Card cardClassName='mb-2 bg-[#F6F9FB] md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around items-center' paddingVertical='p-3' paddingHorizontal='p-3'>
                            <Input
                              containerClassName='border border-solid border-[#E0E0E0] flex-auto mr-4'
                              key={'title'}
                              id={'title'}
                              placeholder='Balas'
                              value={replyCommentArticle}
                              onChange={(e) => setReplyCommentArticle(e.target.value)}
                              autoFocus
                            />
                            <Button.ButtonPrimary
                              spacing='py-2.5 px-5'
                              fontSize='text-base'
                              onClick={() => handleReplyCommentArticle(data.id, dt.id)}
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
                                  src={apiConfig.baseUrl + rdt.author.image_foto}
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
                                  <div onClick={() => handleOpenReplyComment(data.id, dt.id, rdt.author)} className='flex flex-row items-center mr-4 cursor-pointer'>
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
                })
                }
              </Fragment>
            )
          })} */}
          <ForumArticleList
            fulfilledCondition
            emptyStateTitle='Tidak ada thread'
            wrapperListClassName='lg:mx-2'
            page={currentPage}
            setPage={setCurrentPage}
          />
        </div>
        <div className='w-full hidden lg:block lg:col-span-3'>
          {renderCardCreatePost()}
        </div>
      </div>
    </div>
  )
}

export default ForumListPage