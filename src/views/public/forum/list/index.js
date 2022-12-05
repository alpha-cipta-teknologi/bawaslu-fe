import React, { useState, useEffect, Fragment} from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Text, Card, Button, CustomIcon, Input } from 'core/components'
import { HeartIcon } from '@heroicons/react/24/outline'
import { hooks, utils, momentHelper } from 'utility'
import { actions } from 'store'
import { apiConfig } from 'configs'
import { images } from 'constant'

const ForumListPage = () => {

  const history = useHistory()
  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : {userdata: null}

  // ** Store & Actions
  const getDataForumArticle = hooks.useCustomDispatch(userdata ? actions.forums.getDataForumArticleAuth : actions.forums.getDataForumArticle)
  const likeForumArticle = hooks.useCustomDispatch(actions.forums.likeForumArticle)
  const commentForumArticle = hooks.useCustomDispatch(actions.forums.commentForumArticle)
  const getDataCommentForumArticle = hooks.useCustomDispatch(actions.forums.getDataCommentForumArticle)

  const forumList = useSelector(state => state.forums).forumList
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [forumArticles, setForumArticle] = useState([])
  const [commentArticle, setCommentArticle] = useState('')
  const [replyCommentArticle, setReplyCommentArticle] = useState('')

  const loading = utils.isLazyLoading(lazyLoad, 'getDataForumArticle')

  useEffect(() => {
    getDataForumArticle({
      page: currentPage,
      perPage: rowsPerPage
    }, async data => {
      let oldForumArticles = forumArticles
      oldForumArticles = oldForumArticles.concat(data)
      setForumArticle(oldForumArticles.map(d => {
        d.comment = {
          values: [],
          total: 0
        }
        return d
      }))
    })
  }, [currentPage])

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

  return (
    <div className='py-5 md:py-11'>
      <div className='flex flex-col w-full md:flex-row'>
        <div className='w-full md:flex-1 md:w-20'>
          <Card cardClassnames='flex-row'>
            <Text weight='font-bold'>Trending</Text>
            <ul className="list-disc pl-3 pr-3">
              {forumList.data.map(data => {
                return (
                  <li key={data.id}><Text size='text-sm'>{data.title}</Text></li>
                )
              })}
            </ul>
          </Card>
        </div>
        <div className='flex flex-col w-full md:flex-auto md:w-60 overflow-y-auto h-screen'>
          {forumArticles.map(data => {
            return (
              <Fragment key={data.id}>
                <Card cardClassName='mt-1 mb-2 md:mt-0 md:ml-2 md:mr-2' contentClassName='flex flex-col'>
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
                  <div className='mb-1' dangerouslySetInnerHTML={{__html: data.description}} />
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
                          {/* <div className='flex flex-row items-center mr-4'>
                            <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
                          </div> */}
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
                                  {/* <div className='flex flex-row items-center mr-4'>
                                    <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
                                  </div> */}
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
          })}
          {/* <Card cardClassName='mt-1 mb-2 md:mt-0 md:ml-2 md:mr-2' contentClassName='flex flex-col'>
            <span className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'>
              <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
                <img
                  className='h-8 w-8 rounded-full'
                  src={'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                  alt={'Yudi Wahyudi'}
                />
              </div>
              <div className='flex-1'>
                <Text
                  size='text-xs'
                  weight='font-bold'
                  lineClamp='line-clamp-1'
                  cursor='cursor-pointer'
                >Yudi Wahyudi</Text>
                <Text
                  size='text-xxs'
                  color='text-grey-base'
                  lineClamp='line-clamp-1'
                  cursor='cursor-pointer'
                >27 September 2022</Text>
              </div>
            </span>
            <Text weight='font-bold' size='text-sm'>
              Bawaslu Lakukan Penyuluhan ke SMA se jabodetabek.
            </Text>
            <Text size='text-sm' className='mb-1'>
              Komunitas Digital Pengawasan Partisipatif adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid u (lanjut)
            </Text>
            <img
              className='w-full'
              src={'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'}
              alt={''}
            />
            <div className='flex flex-row w-full mt-2'>
              <div className='flex flex-row items-center mr-4'>
                <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
                <Text size='text-xs'>13 Menyukai</Text>
              </div>
              <div className='flex flex-row items-center mr-4'>
                <CustomIcon iconName='comment' className='w-5 h-5 mr-1' /> 
                <Text size='text-xs'>13 Komentar</Text>
              </div>
              <div className='flex flex-row items-center'>
                <CustomIcon iconName='share' className='w-5 h-5 mr-1' /> 
                <Text size='text-xs'>13 Dibagikan</Text>
              </div>
            </div>
          </Card>
          <Card cardClassName='mb-2 bg-[#F6F9FB] md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around items-center' paddingVertical='p-3' paddingHorizontal='p-3'>
            <div className='flex-shrink-0 bg-gray-200 h-8 w-8 rounded-full'>
              <img
                className='h-8 w-8 rounded-full'
                src={'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                alt={'Yudi Wahyudi'}
              />
            </div>
            <Input
              containerClassName='border border-solid border-[#E0E0E0] flex-auto mx-4'
              key={'title'}
              id={'title'}
              placeholder='Tambahkan Komentar'
            />
            <Button.ButtonPrimary
              href='/forum/create'
              spacing='py-2.5 px-5'
              fontSize='text-base'
            >
             Komentar
            </Button.ButtonPrimary>
          </Card>
          <Card cardClassName='mb-2 md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around' paddingVertical='p-3' paddingHorizontal='p-3'>
            <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-11 w-11 rounded-full'>
              <img
                className='h-11 w-11 rounded-full'
                src={'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                alt={'Yudi Wahyudi'}
              />
            </div>
            <div className='flex-auto'>
              <div className='flex flex-row justify-between'>
                <Text
                  size='text-xs'
                  weight='font-bold'
                  lineClamp='line-clamp-1'
                  cursor='cursor-pointer'
                >Yudi Wahyudi</Text>
                <Text
                  size='text-xxs'
                  color='text-grey-base'
                  lineClamp='line-clamp-1'
                  cursor='cursor-pointer'
                >27 September 2022 12:00</Text>
              </div>
              <Text size='text-sm' className='mb-1'>
              Bagus nih acara kayak gini harus dilauin biar generasi muda kita melek sama politik
              </Text>
              <div className='flex flex-row w-full mt-2 mb-1'>
                <div className='flex flex-row items-center mr-4'>
                  <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
                </div>
                <div className='flex flex-row items-center mr-4'>
                  <CustomIcon iconName='comment' className='w-5 h-5 mr-1' /> 
                  <Text size='text-xs'>Balas</Text>
                </div>
              </div>
              <Card cardClassName='mb-2 bg-[#F6F9FB] md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around items-center' paddingVertical='p-3' paddingHorizontal='p-3'>
                <Input
                  containerClassName='border border-solid border-[#E0E0E0] flex-auto mr-4'
                  key={'title'}
                  id={'title'}
                  placeholder='Balas'
                />
                <Button.ButtonPrimary
                  href='/forum/create'
                  spacing='py-2.5 px-5'
                  fontSize='text-base'
                >
                Balas
                </Button.ButtonPrimary>
              </Card>
            </div>
          </Card>
          <Card cardClassName='mb-2 md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around' paddingVertical='p-3' paddingHorizontal='p-3'>
            <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-11 w-11 rounded-full'>
              <img
                className='h-11 w-11 rounded-full'
                src={'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                alt={'Yudi Wahyudi'}
              />
            </div>
            <div className='flex-auto'>
              <div className='flex flex-row justify-between'>
                <Text
                  size='text-xs'
                  weight='font-bold'
                  lineClamp='line-clamp-1'
                  cursor='cursor-pointer'
                >Yudi Wahyudi</Text>
                <Text
                  size='text-xxs'
                  color='text-grey-base'
                  lineClamp='line-clamp-1'
                  cursor='cursor-pointer'
                >27 September 2022 12:00</Text>
              </div>
              <Text size='text-sm' className='mb-1'>
                TOP BGT ya
              </Text>
              <div className='flex flex-row w-full mt-2 mb-1'>
                <div className='flex flex-row items-center mr-4'>
                  <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
                </div>
                <div className='flex flex-row items-center mr-4'>
                  <CustomIcon iconName='comment' className='w-5 h-5 mr-1' /> 
                  <Text size='text-xs'>Balas</Text>
                </div>
              </div>
              <Card cardClassName='mb-2 md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around' paddingVertical='p-3' paddingHorizontal='p-3' border='border-0'>
                <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
                  <img
                    className='h-8 w-8 rounded-full'
                    src={'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                    alt={'Yudi Wahyudi'}
                  />
                </div>
                <div className='flex-auto'>
                  <div className='flex flex-row justify-between'>
                    <Text
                      size='text-xs'
                      weight='font-bold'
                      lineClamp='line-clamp-1'
                      cursor='cursor-pointer'
                    >Samsul Anwar</Text>
                    <Text
                      size='text-xxs'
                      color='text-grey-base'
                      lineClamp='line-clamp-1'
                      cursor='cursor-pointer'
                    >27 September 2022 12:00</Text>
                  </div>
                  <Text size='text-sm' className='mb-1'>
                    Kamu naenya?
                  </Text>
                  <div className='flex flex-row w-full mt-2'>
                    <div className='flex flex-row items-center mr-4'>
                      <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
                    </div>
                    <div className='flex flex-row items-center mr-4'>
                      <CustomIcon iconName='comment' className='w-5 h-5 mr-1' /> 
                      <Text size='text-xs'>Balas</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
          <Card cardClassName='mt-1 mb-2 md:mt-0 md:ml-2 md:mr-2' contentClassName='flex flex-col'>
            <span className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'>
              <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
                <img
                  className='h-8 w-8 rounded-full'
                  src={'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                  alt={'Yudi Wahyudi'}
                />
              </div>
              <div className='flex-1'>
                <Text
                  size='text-xs'
                  weight='font-bold'
                  lineClamp='line-clamp-1'
                  cursor='cursor-pointer'
                >Yudi Wahyudi</Text>
                <Text
                  size='text-xxs'
                  color='text-grey-base'
                  lineClamp='line-clamp-1'
                  cursor='cursor-pointer'
                >27 September 2022</Text>
              </div>
            </span>
            <Text weight='font-bold' size='text-sm'>
              Bawaslu Lakukan Penyuluhan ke SMA se jabodetabek.
            </Text>
            <Text size='text-sm' className='mb-1'>
              Komunitas Digital Pengawasan Partisipatif adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid u (lanjut)
            </Text>
            <img
              className='w-full'
              src={'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'}
              alt={''}
            />
            <div className='flex flex-row w-full mt-2'>
              <div className='flex flex-row items-center mr-4'>
                <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
                <Text size='text-xs'>13 Menyukai</Text>
              </div>
              <div className='flex flex-row items-center mr-4'>
                <CustomIcon iconName='comment' className='w-5 h-5 mr-1' /> 
                <Text size='text-xs'>13 Komentar</Text>
              </div>
              <div className='flex flex-row items-center'>
                <CustomIcon iconName='share' className='w-5 h-5 mr-1' /> 
                <Text size='text-xs'>13 Dibagikan</Text>
              </div>
            </div>
          </Card>
          <Card cardClassName='mt-1 mb-2 md:mt-0 md:ml-2 md:mr-2' contentClassName='flex flex-col'>
            <span className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'>
              <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
                <img
                  className='h-8 w-8 rounded-full'
                  src={'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                  alt={'Yudi Wahyudi'}
                />
              </div>
              <div className='flex-1'>
                <Text
                  size='text-xs'
                  weight='font-bold'
                  lineClamp='line-clamp-1'
                  cursor='cursor-pointer'
                >Yudi Wahyudi</Text>
                <Text
                  size='text-xxs'
                  color='text-grey-base'
                  lineClamp='line-clamp-1'
                  cursor='cursor-pointer'
                >27 September 2022</Text>
              </div>
            </span>
            <Text weight='font-bold' size='text-sm'>
              Bawaslu Lakukan Penyuluhan ke SMA se jabodetabek.
            </Text>
            <Text size='text-sm' className='mb-1'>
              Komunitas Digital Pengawasan Partisipatif adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid u (lanjut)
            </Text>
            <img
              className='w-full'
              src={'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'}
              alt={''}
            />
            <div className='flex flex-row w-full mt-2'>
              <div className='flex flex-row items-center mr-4'>
                <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
                <Text size='text-xs'>13 Menyukai</Text>
              </div>
              <div className='flex flex-row items-center mr-4'>
                <CustomIcon iconName='comment' className='w-5 h-5 mr-1' /> 
                <Text size='text-xs'>13 Komentar</Text>
              </div>
              <div className='flex flex-row items-center'>
                <CustomIcon iconName='share' className='w-5 h-5 mr-1' /> 
                <Text size='text-xs'>13 Dibagikan</Text>
              </div>
            </div>
          </Card>
          <Card cardClassName='mt-1 mb-2 md:mt-0 md:ml-2 md:mr-2' contentClassName='flex flex-col'>
            <span className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'>
              <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
                <img
                  className='h-8 w-8 rounded-full'
                  src={'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                  alt={'Yudi Wahyudi'}
                />
              </div>
              <div className='flex-1'>
                <Text
                  size='text-xs'
                  weight='font-bold'
                  lineClamp='line-clamp-1'
                  cursor='cursor-pointer'
                >Yudi Wahyudi</Text>
                <Text
                  size='text-xxs'
                  color='text-grey-base'
                  lineClamp='line-clamp-1'
                  cursor='cursor-pointer'
                >27 September 2022</Text>
              </div>
            </span>
            <Text weight='font-bold' size='text-sm'>
              Bawaslu Lakukan Penyuluhan ke SMA se jabodetabek.
            </Text>
            <Text size='text-sm' className='mb-1'>
              Komunitas Digital Pengawasan Partisipatif adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid u (lanjut)
            </Text>
            <img
              className='w-full'
              src={'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'}
              alt={''}
            />
            <div className='flex flex-row w-full mt-2'>
              <div className='flex flex-row items-center mr-4'>
                <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
                <Text size='text-xs'>13 Menyukai</Text>
              </div>
              <div className='flex flex-row items-center mr-4'>
                <CustomIcon iconName='comment' className='w-5 h-5 mr-1' /> 
                <Text size='text-xs'>13 Komentar</Text>
              </div>
              <div className='flex flex-row items-center'>
                <CustomIcon iconName='share' className='w-5 h-5 mr-1' /> 
                <Text size='text-xs'>13 Dibagikan</Text>
              </div>
            </div>
          </Card> */}
        </div>
        <div className='w-full md:flex-1 md:w-20'>
          <Card>
            <Text weight='font-bold'>Buat Thread</Text>
            <Button.ButtonPrimary
              href={`${!utils.isUserLoggedIn() ? '/login' : '/forum/create'}`}
              spacing='py-2.5 px-5'
              fontSize='text-base'
              sizing='w-full'
            >
              Buat
            </Button.ButtonPrimary>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ForumListPage