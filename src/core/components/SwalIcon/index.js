import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

const SwalIcon = ({ type = 'success' }) => {
  switch (type) {
    case 'warning':
      return (
        <div className='sa'>
          <div className='sa-warning'>
            <div className='sa-warning-body' />
            <div className='sa-warning-dot' />
          </div>
        </div>
      )
    case 'error':
      return (
        <div className='sa'>
          <div className='sa-error'>
            <div className='sa-error-x'>
              <div className='sa-error-left' />
              <div className='sa-error-right' />
            </div>
            <div className='sa-error-placeholder' />
            <div className='sa-error-fix' />
          </div>
        </div>
      )
    case 'success':
    default:
      return (
        <div className='sa'>
          <div className='sa-success'>
            <div className='sa-success-tip' />
            <div className='sa-success-long' />
            <div className='sa-success-placeholder' />
            <div className='sa-success-fix' />
          </div>
        </div>
      )
  }
}

SwalIcon.propTypes = {
  type: PropTypes.oneOf([
    'success',
    'error',
    'warning'
  ])
}

export default SwalIcon
