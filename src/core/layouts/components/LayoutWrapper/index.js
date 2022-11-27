// ** React Imports
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

import { styleHelper } from 'utility'

import { TopLoaderBar } from '../../../components'

import 'animate.css'

const LayoutWrapper = ({
  layout,
  children,
  appLayout,
  transition,
  wrapperClass
}) => {
  const progress = useSelector(state => state.misc).progress

  //** Vars
  const Tag = layout === 'HorizontalLayout' && !appLayout ? 'div' : Fragment

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

        <TopLoaderBar progress={progress} />
      </div>
    </div>
  )
}

export default LayoutWrapper
