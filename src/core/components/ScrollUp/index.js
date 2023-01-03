import React, { useEffect, useState } from 'react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

import { styleHelper } from 'utility'

const ScrollUp = ({ showUnder = 300 }) => {
  const [showGoTop, setShowGoTop] = useState(false)

  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > showUnder)
  }

  const handleScrollUp = () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton)

    return () => {
      window.removeEventListener('scroll', handleVisibleButton)
    }
  }, [])

  return (
    <div className={styleHelper.classNames(
      'z-[999]',
      showGoTop
        ? 'fixed bottom-[5%] right-10 bg-white w-9 h-9 cursor-pointer items-center justify-center flex rounded-full shadow-md border border-grey-light-2 hover:scale-110 transition ease-linear delay-[0s] duration-[0.2s]'
        : 'hidden'
    )} onClick={handleScrollUp}>
      <ChevronUpIcon className='text-primary w-5 h-5' />
    </div>
  )
}

export default ScrollUp