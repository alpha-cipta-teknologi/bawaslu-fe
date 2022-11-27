import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { images } from 'constant'
import { styleHelper } from 'utility'

export const BasicImage = ({
  src,
  srcError,
  alt,
  loading,
  setLoading,
  borderRadius,
  className,
  onClick,
  loaderRelative = true,
  withWrapper = true,
  withLoading = true,
  loaderClassName = 'skeleton-box'
}) => {
  const [defaultLoading, setDefaultLoading] = useState(withLoading)
  const [isImageError, setIsImageError] = useState(false)

  const loadImage = loading || defaultLoading

  const renderSkeletonImage = () => {
    if (loadImage) {
      return (
        <div className={ styleHelper.classNames(
          loadImage ? 'block' : 'hidden',
          loaderRelative ? 'relative overflow-hidden' : '',
          borderRadius,
          loaderClassName,
          className
        ) } />
      )
    }

    return null
  }

  const onStoploadingImage = () => {
    setDefaultLoading(false)

    if (setLoading) setLoading(false)

    // setTimeout(() => {
    // }, 4000)
  }

  const renderImage = () => {
    return (
      <img
        alt={ alt || '' }
        src={ src }
        onLoad={ onStoploadingImage }
        onError={ ({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src = srcError || images.illu.image_error

          onStoploadingImage()

          setIsImageError(true)
        } }
        className={ styleHelper.classNames(
          borderRadius,
          isImageError ? 'object-contain-important bg-gray-200' : onClick ? 'cursor-pointer' : '',
          loadImage ? 'invisible' : 'visible',
          loadImage ? 'w-0 h-0' : className
        ) }
        onClick={ isImageError ? undefined : onClick }
        loading='lazy'
      />
    )
  }

  if (withWrapper) {
    return (
      <div>
        { renderSkeletonImage() }

        { renderImage() }
      </div>
    )
  }

  return (
    <>
      { renderSkeletonImage() }

      { renderImage() }
    </>
  )
}

BasicImage.propTypes = {
  src: PropTypes.string,
  srcError: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  borderRadius: PropTypes.string,
  wrapperClassName: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  loaderRelative: PropTypes.bool,
  withWrapper: PropTypes.bool,
  withLoading: PropTypes.bool,
  loaderClassName: PropTypes.string
}

export default BasicImage
