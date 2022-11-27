import React from 'react'
import PropTypes from 'prop-types'
import lodash from 'lodash'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

import { styleHelper } from 'utility'

const ArrowListIcon = ({
  direction,
  wrapperClassName,
  arrowClassName,
  background = 'bg-hydeBlack-900 bg-opacity-50',
  arrowColor = 'text-white',
  sizing = 'w-11 h-11',
  arrowSizing = 'h-4 w-5',
  cursor = 'cursor-pointer',
  onClick
}) => {
  const ArrowIcon = direction === 'left'
    ? ArrowLeftIcon
    : ArrowRightIcon

  return (
    <div className={styleHelper.classNames(
      'relative overflow-hidden hover:opacity-90',
      'rounded-full',
      background,
      sizing,
      cursor,
      wrapperClassName
    )}
      onClick={onClick ? lodash.debounce(
        e => onClick(),
        800,
        {
          leading: true,
          trailing: false
        }
      ) : undefined}
    >
      <ArrowIcon className={styleHelper.classNames(
        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        arrowColor,
        arrowSizing,
        arrowClassName,
        cursor
      )} />
    </div>
  )
}

ArrowListIcon.propTypes = {
  direction: PropTypes.string,
  background: PropTypes.string,
  wrapperClassName: PropTypes.string,
  arrowClassName: PropTypes.string,
  arrowColor: PropTypes.string,
  arrowSizing: PropTypes.string,
  sizing: PropTypes.string,
  cursor: PropTypes.string,
  onClick: PropTypes.func
}

export default ArrowListIcon
