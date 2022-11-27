import React from 'react'
import PropTypes from 'prop-types'

import { styleHelper } from 'utility'

import Button from '../index'

const ButtonPrimary = ({
  className,
  sizing = 'w-auto',
  borderRadius = 'rounded-2sm',
  spacing = 'py-3 px-6',
  disabled,
  inverse,
  type,
  ...props
}) => {
  const classStr = styleHelper.classNames(
    'flex items-center justify-center',
    'border text-center font-primary',
    className
  )

  const renderButton = () => {
    return (
      <Button.BasicButton
        type={type}
        className={classStr}
        spacing={spacing}
        sizing={sizing}
        borderRadius={borderRadius}
        disabled={disabled}
        border={
          styleHelper.classNames(
            inverse
              ? disabled
                ? 'border-grey-light-3 border-opacity-50'
                : 'border-primary'
              : 'border-transparent'
          )
        }
        background={
          styleHelper.classNames(
            disabled
              ? inverse
                ? 'bg-transparent'
                : 'bg-grey-light-3 bg-opacity-50'
              : inverse
                ? 'bg-white'
                : 'bg-primary'
          )
        }
        fontColor={
          styleHelper.classNames(
            disabled
              ? 'text-grey-base'
              : inverse
                ? 'text-primary'
                : 'text-white'
          )
        }
        shadow='shadow-sm'
        fontWeight='font-bold'
        {...props}
      />
    )
  }

  return renderButton()
}

ButtonPrimary.propTypes = {
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  text: PropTypes.string,
  spacing: PropTypes.string,
  children: PropTypes.node,
  sizing: PropTypes.string,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
  inverse: PropTypes.bool,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  fontSize: PropTypes.string,
  responsiveSize: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func
}

export default ButtonPrimary
