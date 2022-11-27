import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import lodash from 'lodash'
import PropTypes from 'prop-types'

import { styleHelper } from 'utility'

import { setResponsiveTextSize } from '../Text'
import Spinner from '../Loader/Spinner'

import ButtonPrimary from './ButtonPrimary'
import ButtonSecondary from './ButtonSecondary'

import './style.css'

const BasicButton = ({
  type,
  text,
  children,
  sizing = 'w-auto',
  borderRadius = 'rounded-lg',
  border = 'border-primary',
  background = 'bg-white',
  spacing = 'py-3 px-6',
  className,
  href,
  disabled,
  fontColor = 'text-primary',
  fontSize = 'text-sm',
  fontWeight = 'font-bold',
  shadow = 'shadow-sm',
  loading,
  responsiveSize = true,
  onClick
}) => {
  const [isRippling, setIsRippling] = useState(false)
  const [coords, setCoords] = useState({
    x: -1,
    y: -1
  })

  // ** Check for coords and set ripple
  useEffect(() => {
    let timeRippling = null

    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true)
      timeRippling = setTimeout(() => setIsRippling(false), 500)
    } else {
      setIsRippling(false)
    }

    return () => {
      clearTimeout(timeRippling)
    }
  }, [coords])

  // ** Reset Coords on ripple end
  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 })
  }, [isRippling])

  const classStr = styleHelper.classNames(
    'waves-effect',
    'flex items-center justify-center',
    'border text-center font-primary',
    responsiveSize
      ? setResponsiveTextSize(fontSize)
      : fontSize,
    fontColor,
    fontWeight,
    border,
    borderRadius,
    background,
    shadow,
    spacing,
    sizing,
    disabled
      ? 'bg-opacity-80'
      : 'hover:opacity-90',
    className
  )

  const debouncedOnClick = lodash.debounce(
    e => onClick && onClick(e),
    1000,
    {
      leading: true,
      trailing: false
    }
  )

  const renderButton = () => {
    return (
      <button
        className={classStr}
        onClick={e => {
          const rect = e.currentTarget.getBoundingClientRect()
          setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          })

          setTimeout(() => {
            debouncedOnClick(e)
          }, 500)
        }}
        disabled={disabled}
        type={type}
      >
        {loading ? (
          <div className='flex items-center gap-x-3 whitespace-nowrap'>
            <Spinner color={fontColor || 'text-primary'} sizing='w-5 h-5' />
            {text || children}
          </div>
        ) : (
          <>
            {text || children}
          </>
        )}

        {isRippling ? (
          <span
            className='waves-ripple bg-white bg-opacity-20'
            style={{
              left: coords.x,
              top: coords.y
            }}
          />
        ) : null}
      </button>
    )
  }

  if (href) {
    return (
      <Link to={href}>
        {renderButton()}
      </Link>
    )
  }

  return renderButton()
}

BasicButton.propTypes = {
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  text: PropTypes.string,
  spacing: PropTypes.string,
  children: PropTypes.node,
  sizing: PropTypes.string,
  borderRadius: PropTypes.string,
  border: PropTypes.string,
  background: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  fontSize: PropTypes.string,
  fontColor: PropTypes.string,
  fontWeight: PropTypes.string,
  shadow: PropTypes.string,
  responsiveSize: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func
}

export default {
  BasicButton,
  ButtonPrimary,
  ButtonSecondary
}