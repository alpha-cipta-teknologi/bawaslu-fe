import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { styleHelper } from 'utility'

import { Card, Text } from 'core/components'

const tabs = [
  { name: 'Masuk', href: '/login' },
  { name: 'Buat Akun', href: '/register' }
]

const CardAuth = ({ children }) => {
  const history = useHistory()

  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    if (history?.location?.pathname) {
      setCurrentUrl(history?.location?.pathname)
    }
  }, [history?.location?.pathname])

  return (
    <div className='py-10 md:py-20 max-w-2xl mx-auto'>
      <Card paddingHorizontal='px-6' paddingVertical='py-6'>
        <div className='block pb-6'>
          <nav className='grid grid-cols-2' aria-label='Tabs'>
            {tabs.map(tab => {
              const isActive = currentUrl?.includes(tab.href)

              return (
                <div
                  key={tab.name}
                  className={styleHelper.classNames(
                    isActive
                      ? 'border-black-primary'
                      : 'border-grey-light-5 hover:border-grey-base',
                    'w-full pb-3 px-1 border-b-2 group',
                    !isActive ? 'cursor-pointer' : ''
                  )}
                  onClick={() => history.replace(tab.href)}
                >
                  <Text
                    weight={isActive ? 'font-bold' : 'font-medium'}
                    color={isActive ? 'text-black-primary' : 'text-grey-light-5 group-hover:text-grey-base'}
                    align='text-center'
                    cursor={!isActive ? 'cursor-pointer' : ''}
                  >{tab.name}</Text>
                </div>
              )
            })}
          </nav>
        </div>

        {children}
      </Card>
    </div>
  )
}

export default CardAuth
