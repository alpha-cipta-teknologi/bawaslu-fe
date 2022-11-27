import React from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import * as HeroIcon from '@heroicons/react/24/outline'

import { layoutHelper, styleHelper, utils } from 'utility'

import { Button, Logo, Text } from '../../../components'

import MenuProfile from '../MenuProfile'
import MenuNotification from '../MenuNotification'

const { isUserLoggedIn } = utils

const Navbar = ({ navigations, routerProps }) => {
  const history = useHistory()
  const location = useLocation()
  const currentURL = location.pathname

  const onClickNavigation = (navLink) => {
    history.push(navLink)
  }

  const renderAuthMenu = () => {
    if (isUserLoggedIn()) {
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
    <Disclosure as='nav' className='bg-white shadow sticky top-0 z-[60]'>
      {({ open }) => (
        <>
          <div className='width-container'>
            <div className='relative flex h-20 justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
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
              <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
                <div className='flex flex-shrink-0 items-center lg:space-x-4'>
                  <Logo
                    imageClassName='block md:hidden'
                    sizing='h-12 w-auto'
                    direction='vertical'
                  />
                  <Logo imageClassName='hidden md:block' />

                  <div className='2lg:flex flex-col hidden'>
                    <Text
                      theme='font-secondary'
                      weight='font-bold'
                      type='span'
                      size='text-sm'
                    >Komunitas Digital Pengawasan Partisipatif
                    </Text>
                    <Text
                      theme='font-secondary'
                      type='span'
                      size='text-sm'
                      className='-mt-1'
                    >“Jarimu Awasi Pemilu”</Text>
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center md:static md:inset-auto md:ml-6 md:pr-0'>
                <div className='hidden md:mr-[26px] md:flex md:items-center md:space-x-3 lg:space-x-5 2xl:space-x-7 h-full'>
                  {navigations.map((nav, index) => {
                    const isLinkActive = layoutHelper.isNavLinkActive(nav.navLink, currentURL, routerProps)

                    return (
                      <Text
                        key={index}
                        type='span'
                        color={isLinkActive ? 'text-primary' : 'text-black-primary'}
                        weight={isLinkActive ? 'font-bold' : 'font-normal'}
                        cursor='cursor-pointer'
                        onClick={() => onClickNavigation(nav.navLink)}
                      >{nav.title}</Text>
                    )
                  })}
                </div>

                {renderAuthMenu()}
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden'>
            <div className='space-y-1 pt-2 pb-4'>
              {navigations.map((nav, index) => {
                const isLinkActive = layoutHelper.isNavLinkActive(nav.navLink, currentURL, routerProps)

                return (
                  <Disclosure.Button
                    as='div'
                    key={index}
                    className={styleHelper.classNames(
                      isLinkActive ? 'border-primary bg-primary bg-opacity-10' : 'border-transparent hover:border-gray-300 hover:bg-gray-50',
                      'block border-l-4 py-2 pl-3 pr-4'
                    )}
                    onClick={() => onClickNavigation(nav.navLink)}
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