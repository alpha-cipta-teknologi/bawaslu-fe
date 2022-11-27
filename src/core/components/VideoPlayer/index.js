import React, { useEffect, useState, lazy } from 'react'

import {
  hooks,
  screen,
  styleHelper,
  utils
} from 'utility'

import Text from '../Text'
import CustomIcon from '../CustomIcon'

const ModalVideo = lazy(() => import('../ModalVideo'))

const VideoPlayer = ({
  thumbnailImg,
  sizing = 'w-full h-full',
  borderRadius = 'rounded-xl',
  buttonSizing = 'w-5 h-5',
  title,
  videoUrl,
  imageClassName,
  wrapperClassName,
  withModal = true,
  visible = true,
  renderPlayerModal
}) => {
  const [openModalVideo, setOpenModalVideo] = useState(false)
  const [iFrameLoading, setIFrameLoading] = useState(false)
  const [playVideo, setPlayVideo] = useState(false)

  const windowDimensions = hooks.useWindowDimensions()
  const isMobile = windowDimensions.width <= screen.lg

  const wrapperClassNames = styleHelper.classNames(
    'relative overflow-hidden cursor-pointer group',
    sizing,
    borderRadius,
    wrapperClassName
  )
  const imageClassNames = styleHelper.classNames(
    sizing,
    borderRadius,
    imageClassName
  )
  const buttonPlayClassNames = styleHelper.classNames(
    'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    'group-hover:fill-[#231f20b3] fill-[#231f2080]',
    buttonSizing
  )

  useEffect(() => {
    if (!visible) {
      setPlayVideo(false)
      setIFrameLoading(false)
    }
  }, [visible])

  const onClickVideoImage = () => {
    setIFrameLoading(true)

    if (withModal) {
      setOpenModalVideo(true)
    } else {
      setPlayVideo(true)
    }
  }

  const renderModalVideo = () => {
    return (
      <ModalVideo
        open={openModalVideo}
        setOpen={setOpenModalVideo}
        title={
          title ? (
            <Text
              size='text-xl'
              weight='font-bold'
              lineClamp='line-clamp-1'
            >{title}</Text>
          ) : undefined
        }
        loading={iFrameLoading}
        setLoading={setIFrameLoading}
        url={videoUrl}
        renderPlayer={renderPlayerModal}
      />
    )
  }

  const renderPlayer = () => {
    if ((playVideo || isMobile) && !withModal) {
      const src = playVideo ? `${videoUrl}?autoplay=1` : videoUrl

      return (
        <>
          {iFrameLoading && <></>}

          <div className='relative overflow-hidden aspect-w-16 aspect-h-9'>
            <iframe
              src={src}
              onLoad={() => setIFrameLoading(false)}
              className={imageClassNames}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        </>
      )
    }

    return (
      <>
        <div className='relative overflow-hidden bg-white'>
          <img
            alt={title || ''}
            src={utils.getYoutubeThumbnail(videoUrl) || thumbnailImg || ''}
            className={styleHelper.classNames(imageClassNames, 'object-cover')}
          />
        </div>

        <CustomIcon iconName='play_button' className={buttonPlayClassNames} />
      </>
    )
  }

  return (
    <>
      <div className={wrapperClassNames} onClick={onClickVideoImage}>
        {renderPlayer()}
      </div>

      {renderModalVideo()}
    </>
  )
}

export default VideoPlayer
