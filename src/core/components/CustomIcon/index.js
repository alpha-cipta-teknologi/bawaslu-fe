import React from 'react'
import PropTypes from 'prop-types'

import { images } from 'constant'
import { styleHelper } from 'utility'

const CustomIcon = ({
  iconName,
  onClick,
  wrapperClassName,
  className
}) => {
  const Icon = images.icons[iconName || '']

  return (
    <div onClick={ onClick } className={ styleHelper.classNames(wrapperClassName) }>
      <Icon className={ styleHelper.classNames(className) } />
    </div>
  )
}

CustomIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  wrapperClassName: PropTypes.string,
  className: PropTypes.string
}

export default CustomIcon
