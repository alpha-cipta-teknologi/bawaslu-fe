import React from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import * as HeroIcon from '@heroicons/react/24/outline'

import { hooks, styleHelper, utils } from 'utility'
import { actions } from 'store'

import { Button, Logo, Text } from '../../../components'

import MenuProfile from '../MenuProfile'
import MenuNotification from '../MenuNotification'

const Navbar = ({ navigations }) => {
  const history = useHistory()
  const location = useLocation()
  const currentURL = location.pathname

  const getAllDataCommunity = hooks.useCustomDispatch(actions.communities.getAllDataCommunity)

  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : { userdata: null }

  const onClickNavigation = nav => {
    if (nav.title === 'Forum') {
      if (userdata?.komunitas_id) {
        history.push(`/forum/channel/${userdata?.komunitas_id}`)

        return
      }

      getAllDataCommunity(data => {
        if (data && data?.length) {
          history.push(`/forum/channel/${data[0]?.value || 1}`)
        }
      })
    } else {
      history.push(nav.navLink)
    }
  }

  const renderAuthMenu = () => {
    if (utils.isUserLoggedIn()) {
      return (
        <>
          <MenuNotification />
          <MenuProfile />
        </>
      )
    }

    return (
      <Button.ButtonPrimary
        href='/login'
        spacing='py-2.5 px-5'
        fontSize='text-base'
      >Masuk</Button.ButtonPrimary>
    )
  }

  return (
    <Disclosure as='nav' className={styleHelper.classNames('sticky top-0 z-[60]', currentURL === '/home' ? 'bg-[#fcf8f3]' : 'bg-white border-b border-grey-lighter-2')}>
      {({ open }) => (
        <>
          <div className='width-container'>
            <div className='relative flex h-20 justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center lg:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <HeroIcon.XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <HeroIcon.Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center lg:items-stretch lg:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <Logo
                    imageClassName='block lg:hidden'
                    sizing='h-10 sm:h-11 w-auto'
                    direction='vertical'
                  />
                  <Logo imageClassName='hidden lg:block' />

                  <div className='3lg:flex 3lg:ml-3 flex-col hidden'>
                    <Text
                      theme='font-secondary'
                      weight='font-bold'
                      size='text-sm'
                    >Komunitas Digital Pengawasan Partisipatif
                    </Text>
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center lg:static lg:inset-auto lg:pl-6 lg:pr-0'>
                <div className='hidden lg:mr-6 lg:flex lg:items-center lg:gap-x-3 2xl:gap-x-7 h-full'>
                  {navigations.map((nav, index) => {
                    const isLinkActive = currentURL?.includes(nav.navLink)

                    return (
                      <Text
                        key={index}
                        type='span'
                        color={isLinkActive ? 'text-primary' : 'text-black-primary'}
                        weight={isLinkActive ? 'font-bold' : 'font-normal'}
                        cursor='cursor-pointer'
                        onClick={() => onClickNavigation(nav)}
                      >{nav.title}</Text>
                    )
                  })}
                </div>

                {renderAuthMenu()}
              </div>
            </div>
          </div>

          <Disclosure.Panel className='lg:hidden'>
            <div className='space-y-1 pt-2 pb-4'>
              {navigations.map((nav, index) => {
                const isLinkActive = currentURL.includes(nav.navLink)

                return (
                  <Disclosure.Button
                    as='div'
                    key={index}
                    className={styleHelper.classNames(
                      isLinkActive ? 'border-primary bg-primary bg-opacity-10' : 'border-transparent hover:border-gray-300 hover:bg-gray-50',
                      'block border-l-4 py-2 pl-3 pr-4'
                    )}
                    onClick={() => onClickNavigation(nav)}
                  >
                    <Text
                      color={isLinkActive ? 'text-primary' : 'text-black-primary'}
                      weight={isLinkActive ? 'font-bold' : 'font-normal'}
                      cursor='cursor-pointer'
                    >{nav.title}</Text>
                  </Disclosure.Button>
                )
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

Navbar.propTypes = {
  navigations: PropTypes.array,
  routerProps: PropTypes.any
}

export default Navbar