import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { images } from 'constant'
import { styleHelper } from 'utility'

import Text from '../Text'

const Logo = ({
  type = 'image',
  sizing = 'w-auto h-9',
  direction = 'horizontal',
  imageClassName
}) => {
  const renderLogoText = () => {
    return (
      <Text
        size='text-lg'
        weight='font-bold'
        align='text-center'
      >Komunitas</Text>
    )
  }

  const renderLogo = () => {
    if (type === 'image') {
      return (
        <Link to='/home'>
          <img
            alt='Bawaslu'
            src={direction === 'horizontal' ? images.logo_bawaslu : images.logo_bawaslu_3}
            className={styleHelper.classNames(sizing, imageClassName)}
          />
        </Link>
      )
    }

    return renderLogoText()
  }

  return renderLogo()
}

Logo.propTypes = {
  type: PropTypes.oneOf(['text', 'image']),
  imageClassName: PropTypes.string,
  sizing: PropTypes.string,
  direction: PropTypes.string // vertical | horizontal
}

export default Logo