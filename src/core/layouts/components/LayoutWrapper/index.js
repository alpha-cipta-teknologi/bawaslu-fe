// ** React Imports
import React from 'react'

import { styleHelper } from 'utility'

import 'animate.css'

const LayoutWrapper = ({
  layout,
  children,
  appLayout,
  transition,
  wrapperClass
}) => {
  return (
    <div className={styleHelper.classNames(
      wrapperClass,
      'min-h-screen w-full',
      transition !== 'none' && transition.length
        ? `animate__animated animate__${transition}`
        : ''
    )}>
      <div className='width-container' style={{ minHeight: 'calc(100vh - 80px)' }}>
        {children}
      </div>
    </div>
  )
}

export default LayoutWrapper
