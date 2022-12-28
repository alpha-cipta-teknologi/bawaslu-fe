import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Button, Text, Skeleton, VideoPlayer, TextHTML } from 'core/components'
import { hooks, utils } from 'utility'
import { actions } from 'store'

const HomePage = () => {
  // ** Store & Actions
  const getDataContentHome = hooks.useCustomDispatch(actions.home.getDataContentHome)

  const content = useSelector(state => state.home).content
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  // const [playingVideo, setPlayingVideo] = useState(false)

  useEffect(() => {
    getDataContentHome()
  }, [])

  // const renderPlayIcon = () => {
  //   return (
  //     <div className='w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-black-default relative'>
  //       <CustomIcon iconName='play_button' className='w-15 h-15 sm:w-20 sm:h-20 absolute-center' />
  //     </div>
  //   )
  // }

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
              {/* {videoUrl
                ? (
                  <ReactPlayer
                    url={videoUrl}
                    playing={playingVideo}
                    volume={1}
                    width='100%'
                    height='100%'
                    style={{
                      borderRadius: 12,
                      overflow: 'hidden'
                    }}
                    playIcon={renderPlayIcon()}
                    onClickPreview={() => setPlayingVideo(true)}
                    light={utils.getYoutubeThumbnail(videoUrl)}
                    controls
                  />
                )
                : null} */}

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

  return (
    <div className='py-10 md:py-20'>
      {renderContent()}
    </div>
  )
}

export default HomePage