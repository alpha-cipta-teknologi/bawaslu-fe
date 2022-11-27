import React from 'react'
import PropTypes from 'prop-types'

import { styleHelper } from 'utility'

import Button from '../index'

const ButtonSecondary = ({
  className,
  sizing = 'w-auto',
  borderRadius = 'rounded-lg',
  spacing = 'py-3 px-6',
  fontSize = 'text-sm',
  disabled,
  inverse = true,
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
        className={ classStr }
        spacing={ spacing }
        sizing={ sizing }
        borderRadius={ borderRadius }
        disabled={ disabled }
        border={
          styleHelper.classNames(
            inverse
              ? disabled
                ? 'border-transparent'
                : 'border-gray-300'
              : 'border-transparent'
          )
        }
        background={
          styleHelper.classNames(
            disabled
              ? 'bg-drcGrey-soft bg-opacity-50'
              : inverse
                ? 'bg-white hover:bg-gray-50'
                : 'bg-drcBlack-2'
          )
        }
        fontColor={
          styleHelper.classNames(
            disabled
              ? 'text-drcGrey-base'
              : inverse
                ? 'text-gray-700'
                : 'text-white'
          )
        }
        shadow='shadow-sm'
        fontWeight='font-bold'
        { ...props }
      />
    )
  }

  return renderButton()
}

ButtonSecondary.propTypes = {
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

export default ButtonSecondary
