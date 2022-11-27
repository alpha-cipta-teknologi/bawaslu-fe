import React from 'react'
import PropTypes from 'prop-types'

import { styleHelper } from 'utility'

const DotsPaginate = ({
  slides,
  activeSlide,
  wrapperClassName = 'bottom-5 md:bottom-14',
  dotClassName = 'h-2.5 w-2.5 mr-2.5',
  onClickDot
}) => {
  const wrapperClassNames = styleHelper.classNames(
    'flex items-center justify-center w-full absolute',
    wrapperClassName
  )

  return (
    <div className={ wrapperClassNames }>
      { slides.map((_, i) => (
        <span
          key={ i }
          className={
            styleHelper.classNames(
              'cursor-pointer rounded-full',
              activeSlide === i ? 'bg-[#FBFCFE]' : 'bg-[#9D9B9F]',
              dotClassName
            )
          }
          onClick={ () => onClickDot && onClickDot(i) }
        />
      )) }
    </div>
  )
}

DotsPaginate.propTypes = {
  slides: PropTypes.array.isRequired,
  activeSlide: PropTypes.number.isRequired,
  wrapperClassName: PropTypes.string,
  dotClassName: PropTypes.string,
  onClickDot: PropTypes.func
}

export default DotsPaginate
