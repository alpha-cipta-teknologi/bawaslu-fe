import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

import { images } from 'constant'
import { hooks, styleHelper } from 'utility'
import { actions } from 'store'

import { CustomIcon, Text } from '../../../components'

const userNavigation = [
  {
    name: 'Keluar',
    icon: () => <CustomIcon iconName='logout' />
  }
]

const MenuProfile = () => {
  const history = useHistory()

  const profile = useSelector(state => state.auth).profile

  const handleLogout = hooks.useCustomDispatch(actions.auth.handleLogout)

  const onCLickLogout = () => {
    handleLogout()

    history.push('/login')
  }

  const onClickMenuItem = (menuName) => {
    if (menuName === 'Keluar') {
      onCLickLogout()
    }
  }

  return (
    <Menu as='div' className='relative ml-2 sm:ml-3'>
      <div>
        <Menu.Button className='flex rounded-full bg-white text-sm focus:outline-none focus:ring-0'>
          <span className='sr-only'>Open user menu</span>
          <span className='flex items-center gap-x-4'>
            <img
              className='h-10 w-10 rounded-full'
              src={images.empty_state.profile}
              alt='profile'
            />

            <ChevronDownIcon className='w-6 h-6 text-blue-navy hidden sm:block' />
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-auto origin-top-right rounded bg-white py-1 shadow-2md focus:outline-none'>
          {userNavigation.map((nav, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <span className={styleHelper.classNames(
                  active ? 'bg-gray-100' : '',
                  'px-4 py-2 cursor-pointer flex items-center gap-2.5'
                )} onClick={() => onClickMenuItem(nav.name)}>
                  {nav.icon()}
                  <Text
                    size='text-xs'
                    weight='font-bold'
                    cursor='cursor-pointer'
                  >
                    {nav.name}
                  </Text>
                </span>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default MenuProfile