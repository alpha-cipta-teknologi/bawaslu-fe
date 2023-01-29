import React from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'

import { styleHelper } from 'utility'

export const setResponsiveTextSize = (size) => {
  switch (size) {
    case 'text-5.5xl':
      return 'text-2xl sm:text-3xl md:text-5.5xl'
    case 'text-4.5xl':
      return 'text-2xl sm:text-3xl md:text-4.5xl'
    case 'text-3.5xl':
      return 'text-xl md:text-3.5xl'
    case 'text-3xl':
      return 'text-xl sm:text-2xl md:text-3xl'
    case 'text-2.5xl':
      return 'text-lg sm:text-2.5xl'
    case 'text-2xl':
      return 'text-lg sm:text-2xl'
    case 'text-xl':
      return 'text-base sm:text-xl'
    case 'text-base':
      return 'text-sm sm:text-base'
    case 'text-lg':
      return 'text-base sm:text-lg'
    case 'text-sm':
      return 'text-xs sm:text-sm'
    case 'text-xs':
      return 'text-xxs sm:text-xs'
    default:
      return size
  }
}

const Text = ({
  children,
  text,
  style,
  className,
  size = 'text-base',
  weight = 'font-normal',
  align = 'text-left',
  opacity = 'opacity-100',
  spacing,
  color = 'text-black-primary',
  decoration = 'decoration-blue-500',
  lineHeight,
  lineClamp = 'line-clamp-none',
  whiteSpace,
  type = 'p',
  cursor = 'cursor-default',
  href,
  underlineOnHover,
  onClick,
  responsiveSize = true,
  id,
  theme = 'font-primary',
  ...restProps
}) => {
  const fontStyle = [
    responsiveSize ? setResponsiveTextSize(size) : size,
    lineHeight,
    weight,
    color,
    align,
    opacity
  ]

  const cursorStyle = href || underlineOnHover || !!onClick ? 'cursor-pointer' : cursor

  const textClassName = styleHelper.classNames(
    theme,
    ...fontStyle,
    spacing,
    className,
    lineClamp,
    align,
    whiteSpace,
    cursorStyle,
    underlineOnHover ? `hover:underline hover:${decoration}` : ''
  )

  const h1 = (
    <h1
      id={id}
      style={style}
      className={textClassName}
      onClick={onClick}
      {...restProps}
    >{children || text}</h1>
  )
  const h2 = (
    <h2
      id={id}
      style={style}
      className={textClassName}
      onClick={onClick}
      {...restProps}
    >{children || text}</h2>
  )
  const h3 = (
    <h3
      id={id}
      style={style}
      className={textClassName}
      onClick={onClick}
      {...restProps}
    >{children || text}</h3>
  )
  const p = (
    <p
      id={id}
      style={style}
      className={textClassName}
      onClick={onClick}
      {...restProps}
    >{children || text}</p>
  )
  const span = (
    <span
      id={id}
      style={style}
      className={textClassName}
      onClick={onClick}
      {...restProps}
    >{children || text}</span>
  )
  const label = (
    <label
      id={id}
      style={style}
      className={textClassName}
      onClick={onClick}
      {...restProps}
    >{children || text}</label>
  )

  const render = () => {
    switch (type) {
      case 'h1': return h1
      case 'h2': return h2
      case 'h3': return h3
      case 'span': return span
      case 'label': return label
      default: return p
    }
  }

  return (
    <>
      {href ? (
        <Link to={href}>
          {render()}
        </Link>
      ) : render()}
    </>
  )
}

export default Text

Text.propTypes = {
  children: propTypes.node,
  text: propTypes.string,
  style: propTypes.object,
  className: propTypes.string,
  size: propTypes.string,
  weight: propTypes.string,
  spacing: propTypes.string,
  color: propTypes.string,
  decoration: propTypes.string,
  lineHeight: propTypes.string,
  lineClamp: propTypes.oneOf([
    'line-clamp-1',
    'line-clamp-2',
    'line-clamp-3',
    'line-clamp-4',
    'line-clamp-5',
    'line-clamp-6',
    'line-clamp-none'
  ]),
  whiteSpace: propTypes.oneOf([
    'whitespace-normal',
    'whitespace-nowrap',
    'whitespace-pre',
    'whitespace-pre-line',
    'whitespace-pre-wrap'
  ]),
  align: propTypes.string,
  opacity: propTypes.oneOf([
    'opacity-0',
    'opacity-5',
    'opacity-10',
    'opacity-20',
    'opacity-25',
    'opacity-30',
    'opacity-40',
    'opacity-50',
    'opacity-60',
    'opacity-70',
    'opacity-75',
    'opacity-80',
    'opacity-90',
    'opacity-95',
    'opacity-100'
  ]),
  type: propTypes.oneOf(['h1', 'h2', 'h3', 'p', 'span', 'label']),
  underlineOnHover: propTypes.bool,
  cursor: propTypes.string,
  href: propTypes.string,
  responsiveSize: propTypes.bool,
  onClick: propTypes.func,
  id: propTypes.string,
  theme: propTypes.string
}