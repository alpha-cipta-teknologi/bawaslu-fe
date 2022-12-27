import React, { useEffect, useState } from 'react'

import {
  utils,
  hooks,
  screen,
  styleHelper
} from 'utility'

import CustomIcon from '../CustomIcon'

const VideoPlayer = ({
  thumbnailImg,
  sizing = 'w-full h-full',
  borderRadius = 'rounded-xl',
  buttonSizing = 'w-15 h-15 sm:w-20 sm:h-20',
  videoUrl,
  imageClassName,
  wrapperClassName,
  visible = true,
  widthIFrame = '100%',
  heightIFrame = '100%'
}) => {
  const [iFrameLoading, setIFrameLoading] = useState(false)
  const [playVideo, setPlayVideo] = useState(false)

  const windowDimensions = hooks.useWindowDimensions()
  const isMobile = windowDimensions.width < screen.lg

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
    'absolute-center',
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

    setPlayVideo(true)
  }

  const renderPlayer = () => {
    const thumbnailYoutube = utils.getYoutubeThumbnail(videoUrl)

    if (playVideo || isMobile || (!thumbnailYoutube && !thumbnailImg)) {
      const src = playVideo && thumbnailYoutube ? `${videoUrl}?autoplay=1` : videoUrl

      return (
        <>
          {iFrameLoading && <></>}

          <iframe
            src={src}
            onLoad={() => setIFrameLoading(false)}
            className={imageClassNames}
            frameBorder='0'
            allow='autoplay'
            allowFullScreen
            width={widthIFrame}
            height={heightIFrame}
          />
        </>
      )
    }

    return (
      <>
        <img
          alt=''
          src={thumbnailImg || thumbnailYoutube}
          className={imageClassNames}
          loading='lazy'
        />

        <div className='w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-black-default relative absolute-center'>
          <CustomIcon iconName='play_button' className={buttonPlayClassNames} />
        </div>
      </>
    )
  }

  return (
    <div className={wrapperClassNames} onClick={onClickVideoImage}>
      {renderPlayer()}
    </div>
  )
}

export default VideoPlayer
