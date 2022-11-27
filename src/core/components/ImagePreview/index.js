import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { styleHelper } from 'utility'

import Text from '../Text'
import Modal from '../Modal'
import ArrowListIcon from '../ArrowListIcon'
import DotsPaginate from '../DotsPaginate'
import Image from '../Image'

const getSrcImage = (src, index = 0) => { // src?: string | string[]
  const firstSrc = Array.isArray(src) && src?.length
    ? src[index]
    : typeof src === 'string'
      ? src
      : undefined

  return firstSrc
}

const isNotShowPagination = (src) => { // src?: string | string[]
  return (src && typeof src === 'string') || (Array.isArray(src) && src?.length <= 1)
}

const ImagePreview = ({
  title,
  renderTitle,
  src,
  imageSizing = 'w-full h-full',
  imageModalClassName = 'max-h-[60vh] lg:max-h-screen min-h-[250px] h-full w-full',
  paddingModal = 'p-4',
  borderRadius = 'rounded-2lg',
  imageClassName
}) => {
  const [openModalGallery, setOpenModalGallery] = useState(false)
  const [currentShowing, setCurrentShowing] = useState({
    title: '',
    src: '',
    index: 0
  })

  const onClickShowModalImage = () => {
    setCurrentShowing(prevCurrent => ({
      ...prevCurrent,
      title,
      src: getSrcImage(src),
      index: 0
    }))

    setOpenModalGallery(true)
  }

  const onClickArrowImage = (type) => { // type : 'left' | 'right'
    const prevIndex = (currentShowing?.index || 1) - 1
    const nextIndex = (currentShowing?.index || 0) + 1
    const indexShow = type === 'left' ? prevIndex : nextIndex

    setCurrentShowing(prevCurrent => ({
      ...prevCurrent,
      src: getSrcImage(src, indexShow),
      index: indexShow
    }))
  }

  const onClickDot = (nextActiveSlide) => {
    setCurrentShowing(prevCurrent => ({
      ...prevCurrent,
      src: getSrcImage(src, nextActiveSlide),
      index: nextActiveSlide
    }))
  }

  const renderArrowPagination = (type) => { // type: 'left' | 'right'
    if (isNotShowPagination(src)) return null

    const disabledArrow =
      (currentShowing.index === 0 && type === 'left') ||
      (currentShowing.index === (src || []).length - 1 && type === 'right')
    const cursorStyle = disabledArrow ? 'cursor-default' : 'cursor-pointer'

    return (
      <ArrowListIcon
        key={ type }
        direction={ type }
        background={ disabledArrow
          ? 'bg-hydeBlack-900 bg-opacity-40'
          : 'bg-hydeBlack-900 bg-opacity-50' }
        arrowColor={ styleHelper.classNames(
          'text-white',
          disabledArrow ? 'text-opacity-50' : ''
        ) }
        cursor={ cursorStyle }
        onClick={ disabledArrow ? undefined : () => onClickArrowImage(type) }
      />
    )
  }

  const renderDotsPagination = () => {
    if (isNotShowPagination(src)) return null

    return (
      <DotsPaginate
        slides={ Array.isArray(src) ? src : [] }
        activeSlide={ currentShowing.index || 0 }
        onClickDot={ onClickDot }
        wrapperClassName='bottom-8'
      />
    )
  }

  const renderModalGallery = () => {
    return (
      <Modal
        open={ openModalGallery }
        setOpen={ setOpenModalGallery }
        padding={ paddingModal }
        title={ renderTitle
          ? renderTitle
          : (
            <Text
              size='text-sm'
              weight='font-bold'
              responsiveSize={ false }
            >{ currentShowing.title }</Text>
          ) }
      >
        <div className='relative'>
          <Image
            alt={ title }
            src={ currentShowing.src || '' }
            className={ styleHelper.classNames(
              borderRadius,
              imageModalClassName
            ) }
            loaderRelative={ false }
            withWrapper={ false }
          />

          { renderDotsPagination() }

          <div className='flex items-center gap-5 absolute right-5 bottom-5'>
            { renderArrowPagination('left') }
            { renderArrowPagination('right') }
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <>
      <Image
        src={ getSrcImage(src) }
        onClick={ onClickShowModalImage }
        className={ styleHelper.classNames(
          imageSizing,
          borderRadius,
          imageClassName
        ) }
        borderRadius={ borderRadius }
      />

      { renderModalGallery() }
    </>
  )
}

ImagePreview.propTypes = {
  title: PropTypes.string,
  renderTitle: PropTypes.node,
  src: PropTypes.any,
  imageSizing: PropTypes.string,
  imageModalClassName: PropTypes.string,
  aspectModal: PropTypes.string,
  paddingModal: PropTypes.string,
  borderRadius: PropTypes.string,
  imageClassName: PropTypes.string
}

export default ImagePreview
