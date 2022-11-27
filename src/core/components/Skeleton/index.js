import React from 'react'
import PropTypes from 'prop-types'

import { styleHelper } from 'utility'

const Skeleton = ({
  children,
  loading,
  avatar,
  paragraph,
  className,
  style
}) => {
  if (loading) {
    if (avatar) {
      return (
        <div className='flex w-auto h-auto' style={ style }>
          <div className={ styleHelper.classNames(
            'skeleton-box',
            avatar.shape === 'circle' ? 'rounded-full' : avatar.shape,
            avatar.sizing,
            className
          ) } />
        </div>
      )
    }

    if (paragraph) {
      return (
        <>
          <div className={ styleHelper.classNames('flex flex-col w-full gap-y-2', className) } style={ style }>
            { Array.from(Array(paragraph.rows).keys()).map(i => (
              <div key={ i }>
                { i === (paragraph?.rows || 0) - 1 ? (
                  <div className={ styleHelper.classNames(
                    'skeleton-box rounded',
                    paragraph?.height ? paragraph.height : 'h-3',
                    paragraph?.flipTruncate ? 'w-full' : 'w-1/2'
                  ) } />
                ) : (
                  <div className={ styleHelper.classNames(
                    'skeleton-box rounded',
                    paragraph?.height ? paragraph.height : 'h-3',
                    paragraph?.flipTruncate ? 'w-1/2' : 'w-full'
                  ) } />
                ) }
              </div>
            )) }
          </div>
        </>
      )
    }

    return <div className={ styleHelper.classNames('skeleton-box', className) } style={ style } />
  }

  return (
    <>
      { children }
    </>
  )
}

Skeleton.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  avatar: PropTypes.shape({
    shape: PropTypes.string, // circle, square, etc
    sizing: PropTypes.string
  }),
  paragraph: PropTypes.shape({
    rows: PropTypes.number,
    height: PropTypes.string,
    flipTruncate: PropTypes.bool
  }),
  className: PropTypes.string,
  style: PropTypes.object
}

export default Skeleton
