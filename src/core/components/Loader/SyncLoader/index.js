import React from 'react'
import PropTypes from 'prop-types'

import { styleHelper } from 'utility'

const SyncLoader = ({
  loading = true,
  bgColor = 'bg-primary',
  wrapperClassName,
  sizing = 'w-4 h-4',
  spacing = 'm-2'
}) => {
  const roundClassName = styleHelper.classNames(
    bgColor,
    sizing,
    spacing,
    'inline-block rounded-full',
    'animate-sync'
  )

  if (!loading) {
    return null
  }

  return (
    <span className={wrapperClassName}>
      {Array.from(Array(3).keys()).map(val => (
        <span
          key={val}
          className={roundClassName}
          style={{
            animationFillMode: 'both',
            animationDelay: `${val * 0.07}s`
          }}
        />
      ))}
    </span>
  )
}

SyncLoader.propTypes = {
  loading: PropTypes.bool,
  bgColor: PropTypes.string,
  wrapperClassName: PropTypes.string,
  sizing: PropTypes.string,
  spacing: PropTypes.string
}

export default SyncLoader