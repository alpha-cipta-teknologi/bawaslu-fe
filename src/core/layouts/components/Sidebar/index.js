import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowLeftOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import { hooks, styleHelper } from 'utility'
import { actions } from 'store'

import SidebarMenu from '../SidebarMenu'

import { Logo, Text } from '../../../components'

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  navigation,
  routerProps
}) => {
  const history = useHistory()

  const handleLogout = hooks.useCustomDispatch(actions.auth.handleLogout)

  const onCLickLogout = () => {
    handleLogout()

    history.push('/login')
  }

  const renderBottomSidebar = () => {
    return (
      <div className='flex-shrink-0 flex p-3'>
        <div className='flex-shrink-0 group block'>
          <div className='flex items-center gap-x-3 mt-5 group cursor-pointer' onClick={onCLickLogout}>
            <ArrowLeftOnRectangleIcon className='w-6 h-6 text-white group-hover:text-opacity-80 cursor-pointer' />

            <Text
              color='text-white'
              weight='font-medium'
              cursor='cursor-pointer'
              className='group-hover:text-opacity-80'
            >Logout</Text>
          </div>
        </div>
      </div>
    )
  }

  const renderSidebarMenu = (collapsed = false) => {
    return (
      <SidebarMenu
        collapsed={collapsed}
        navigation={navigation}
        routerProps={routerProps}
      />
    )
  }

  const renderMobileSidebar = () => {
    return (
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 flex z-[60] md:hidden'
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex-1 flex flex-col max-w-xs w-full pt-10 bg-drcGreen'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button
                    type='button'
                    className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XMarkIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-shrink-0 flex items-center px-3 mb-10'>
                <Logo />
              </div>
              <div className='flex-1 h-0 overflow-y-auto no-scrollbar'>
                <nav className='grid gap-y-3'>
                  {renderSidebarMenu()}
                </nav>
              </div>

              {renderBottomSidebar()}
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
    )
  }

  return renderMobileSidebar()
}

Sidebar.propTypes = {
  navigation: PropTypes.array,
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
  menuHover: PropTypes.bool.isRequired,
  setMenuHover: PropTypes.func.isRequired,
  routerProps: PropTypes.any
}

export default Sidebar