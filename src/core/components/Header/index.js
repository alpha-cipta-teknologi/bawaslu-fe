import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../Logo'

const Header = () => {
  return (
    <nav className='bg-white shadow sticky top-0 z-[60]'>
      <div className='width-container'>
        <div className='relative flex h-20 justify-between'>
          <div className='flex flex-1 items-center justify-center'>
            <div className='flex flex-shrink-0 items-center'>
              <Link to='/home'>
                <Logo
                  sizing='h-12.5 w-auto'
                  direction='vertical'
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
