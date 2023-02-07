import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { Button, Text, Skeleton, VideoPlayer, Modal, ModalLoader, TextHTML } from 'core/components'
import { hooks, utils, toastify } from 'utility'
import { images } from 'constant'
import { actions } from 'store'

const HomePage = () => {
  const history = useHistory()

  //Query Params
  const query = hooks.useQuery()
  // ** Store & Actions
  const getDataContentHome = hooks.useCustomDispatch(actions.home.getDataContentHome)
  const handleLoginSSO = hooks.useCustomDispatch(actions.auth.handleLoginSSO)
  const getAllDataCommunity = hooks.useCustomDispatch(actions.communities.getAllDataCommunity)

  const content = useSelector(state => state.home).content
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const [openModalDesc, setOpenModalDesc] = useState(false)

  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : { userdata: null }

  useEffect(() => {

    if (query.get("access_token") && query.get("refresh_token")) {
      const { realm_access: { roles } } = jwt_decode(query.get("access_token"))

      if (roles?.includes('app_komunitas')) {
        const formLogin = {
          access_token: query.get("access_token"),
          refresh_token: query.get("refresh_token")
        }

        handleLoginSSO(formLogin, async () => {
          try {
            history.push('/')

            toastify.success('You have successfully logged in')

          } catch (error) {
            toastify.error('Maaf, terjadi kesalahan. Silakan muat ulang halaman beberapa saat lagi')
          }
        })
      }
    }

    getDataContentHome()
  }, [])

  // const transformDescription = (node, nodeIdx) => {
  //   if (node.type === 'tag' && (['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.name))) {
  //     if (node.attribs?.style) {
  //       node.attribs.style = `${node.attribs?.style || ''}; font-family: "Montserrat" !important;`
  //     }
  //   }

  //   if (node.type === 'tag' && node.name === 'p' && nodeIdx === 0) {
  //     return (
  //       <Text
  //         key={nodeIdx}
  //         type='span'
  //       >
  //         {node.children.map((child, childIdx) => {
  //           if (child.attribs?.style) {
  //             child.attribs.style = `${child.attribs?.style || ''}; font-family: "Montserrat" !important;`
  //           }

  //           return convertNodeToElement(child, childIdx, transformDescription)
  //         })}
  //       </Text>
  //     )
  //   }
  // }

  const onClickToForum = () => {
    if (userdata?.komunitas_id) {
      history.push(`/forum/channel/${userdata?.komunitas_id}`)

      return
    }

    getAllDataCommunity(data => {
      if (data && data?.length) {
        history.push(`/forum/channel/${data[0]?.value || 1}`)
      }
    })
  }

  const onShowModalDesc = useCallback(() => setOpenModalDesc(true), [])

  const renderModalDescription = () => {
    return (
      <Modal
        open={openModalDesc}
        setOpen={setOpenModalDesc}
        width='max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-5xl w-full'
        className='max-h-[65vh] sm:max-h-[70vh] md:max-h-[80vh] custom-scrollbar overflow-y-auto'
        padding='p-4 sm:p-6'
        closeButtonType='outside'
      >
        <div>
          <TextHTML
            htmlString={content?.description || content?.short_description || ''}
          // options={{ transform: transformDescription }}
          />
        </div>
      </Modal>
    )
  }

  const renderTagline = () => {
    if (content?.header) {
      return (
        <div className='mt-28 lg:mt-40 mb-10'>
          <div className='relative width-container lg:bg-white bg-[#FC7600] bg-opacity-5 lg:bg-opacity-100'>
            <img
              alt=''
              src={images.illu.circles}
              className='absolute -z-0 top-1/2 -translate-y-1/2 -left-4.5 w-3/5 h-[800px] hidden lg:block'
            />

            <img
              alt=''
              src={images.illu.dots}
              className='absolute -z-0 -top-9 -left-2 w-[205px] h-[205px] hidden lg:block'
            />

            <div className='lg:px-7.5'>
              <div className='lg:bg-[#FC7600] lg:bg-opacity-5 py-6 lg:py-15 md:px-6 lg:px-10 flex flex-col gap-7.5 items-center justify-center'>
                <img
                  alt='bawaslu'
                  src={images.logo_bawaslu_large}
                  className='h-16 md:h-20 w-auto object-contain'
                />

                <Text
                  size='text-4.75xl'
                  weight='font-bold'
                  align='text-center'
                >{content?.header}</Text>

                <Button.ButtonPrimary
                  spacing='py-3 px-10'
                  fontSize='text-xl'
                  onClick={onClickToForum}
                >Ayo Awasi Bersama</Button.ButtonPrimary>
              </div>
            </div>

            <img
              alt=''
              src={images.illu.dots}
              className='absolute -z-0 -bottom-9 -right-2 w-[205px] h-[205px] hidden lg:block'
            />
          </div>
        </div>
      )
    }

    return null
  }

  const renderMascotSection = () => {
    return (
      <div className='py-15'>
        <div className='width-container relative'>
          <div className='absolute -z-0 left-1/2 -translate-x-1/2 top-0 w-full'>
            <div className='relative'>
              {Array.from(Array(5).keys()).map(index => {
                return (
                  <img
                    key={index}
                    alt=''
                    src={images.illu.wave}
                    className='w-full h-auto absolute left-0'
                    style={{ top: index * 50 }}
                  />
                )
              })}
            </div>
          </div>

          <div className='flex items-center justify-center px-8 sm:px-0'>
            <img
              alt='mascot'
              className='w-full sm:w-[500px] h-auto object-contain z-[1]'
              src={utils.getImageAPI(content?.path_image) || images.illu.mascot}
            />
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    const loadingContent = utils.isLazyLoading(lazyLoad, 'getDataContentHome') || false
    const videoUrl = content?.link_url || utils.getImageAPI(content?.path_video)

    return (
      <>
        <div className='flex flex-col'>
          <div className='bg-[#fcf8f3]'>
            <div className='width-container flex flex-col lg:grid lg:grid-cols-7 lg:items-center gap-12 pt-10 pb-14'>
              <div className='lg:col-span-4'>
                <Skeleton
                  loading={loadingContent}
                  paragraph={{ rows: 6 }}
                  className='mt-4'
                >
                  <div className='flex flex-col gap-6'>
                    <Text size='text-5xl' weight='font-bold'>{content?.title || 'Jarimu Awasi Pemilu'}</Text>

                    <Text lineHeight='leading-[30px]'>
                      {content?.sort_description}
                    </Text>

                    <div>
                      <Button.ButtonPrimary
                        fontSize='text-base'
                        spacing='py-3 px-7.5'
                        onClick={onShowModalDesc}
                      >Pelajari Lebih Lanjut</Button.ButtonPrimary>
                    </div>
                  </div>
                </Skeleton>
              </div>

              <div className='w-full lg:col-span-3'>
                <div>
                  <Skeleton
                    loading={loadingContent}
                    avatar={{
                      sizing: 'w-full h-full max-h-[348px] aspect-w-16 aspect-h-9',
                      shape: 'rounded-xl'
                    }}
                  >
                    {videoUrl
                      ? (
                        <div className='relative'>
                          <VideoPlayer
                            videoUrl={utils.convertVideoUrl(videoUrl)}
                            wrapperClassName='w-full h-full max-h-[348px] aspect-w-16 aspect-h-9 z-[1]'
                          />

                          <img
                            alt=''
                            src={images.illu.dots}
                            className='absolute -bottom-10 lg:block hidden -z-0 right-4 w-[205px] h-[195px]'
                          />
                        </div>
                      )
                      : <></>}
                  </Skeleton>
                </div>
              </div>
            </div>
          </div>

          {renderMascotSection()}
        </div>

        {renderTagline()}
      </>
    )
  }

  const loadingLoginSSO = utils.isLazyLoading(lazyLoad, 'loginSSO') || false

  return (
    <div className='pb-20 overflow-hidden'>
      <ModalLoader open={loadingLoginSSO} />
      {renderContent()}

      {renderModalDescription()}
    </div>
  )
}

export default HomePage