import React from 'react'
import PropTypes from 'prop-types'

import { styleHelper } from 'utility'

import Text from '../Text'

const Badge = ({
  color,
  text
}) => {
  return (
    <Text
      type='span'
      size='text-xs'
      weight='font-medium'
      className={ styleHelper.classNames(
        color,
        'inline-flex items-center px-2.5 py-0.5 rounded-full capitalize'
      ) }
    >
      { text }
    </Text>
  )
}

Badge.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string
}

export default Badge