import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Text, Card, Button, ForumArticleList, Spinner } from 'core/components'
import { hooks, utils } from 'utility'
import { actions } from 'store'

const ForumListPage = () => {
  const history = useHistory()

  // ** Store & Actions
  const getDataTrendingForumArticle = hooks.useCustomDispatch(actions.forums.getDataTrendingForumArticle)
  const getForumArticleDetail = hooks.useCustomDispatch(actions.forums.getForumArticleDetail)

  const trendingForumList = useSelector(state => state.forums).trendingForumList
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  // ** States
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getDataTrendingForumArticle()
  }, [])

  const handleGoToDetail = data => {
    getForumArticleDetail(data, () => {
      history.push(`/forum/${data.slug}`)
    })
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
        {data.map(el => {
          return (
            <li key={el.id} onClick={() => handleGoToDetail(el)}>
              <Text size='text-sm' weight='font-bold' underlineOnHover>{el.title}</Text>
            </li>
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