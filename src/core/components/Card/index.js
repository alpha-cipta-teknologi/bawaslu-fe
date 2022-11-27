import React from 'react'
import PropTypes from 'prop-types'

import { styleHelper } from 'utility'

const Card = ({
  id,
  header,
  footer,
  paddingVertical = 'py-6',
  paddingHorizontal = 'px-4 sm:px-6',
  animationCard = 'animation-none',
  shadow = 'shadow-none',
  border = 'border border-grey-light-2',
  borderRadius = 'rounded',
  cursor = 'cursor-default',
  cardClassName,
  contentClassName,
  background = 'bg-white',
  children,
  style,
  disabled,
  onClick
}) => {
  const cardClassnames = styleHelper.classNames(
    'relative flex flex-col',
    background,
    shadow,
    border,
    borderRadius,
    animationCard,
    cursor,
    cardClassName
  )
  const wrapperHeader = styleHelper.classNames(
    'border-b border-gray-200',
    `rounded-t-${borderRadius.split('-')[1]}`,
    background,
    paddingHorizontal,
    paddingVertical
  )
  const wrapperContent = styleHelper.classNames(
    'h-full',
    paddingHorizontal,
    paddingVertical,
    contentClassName
  )

  return (
    <div
      id={id}
      className={cardClassnames}
      style={style}
      onClick={!disabled ? onClick : undefined}
    >
      {header
        ? (
          <div className={wrapperHeader}>
            {header}
          </div>
        ) : null}

      <div className={wrapperContent}>
        {children}
      </div>

      {footer
        ? (
          <div className={styleHelper.classNames('flex gap-x-3 py-3 bg-gray-50 justify-end', paddingHorizontal)}>
            {footer}
          </div>
        )
        : null
      }
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node,
  paddingVertical: PropTypes.string,
  paddingHorizontal: PropTypes.string,
  children: PropTypes.node,
  animationCard: PropTypes.string,
  shadow: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  cursor: PropTypes.string,
  cardClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  background: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default Card
