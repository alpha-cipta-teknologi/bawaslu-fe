import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

import { images } from 'constant'
import { hooks, utils } from 'utility'
import { actions } from 'store'

import { CustomIcon, Menu } from '../../../components'

const userNavigation = [
  {
    id: 'logout',
    name: 'Keluar',
    icon: () => <CustomIcon iconName='logout' />
  }
]

const MenuProfile = () => {
  const history = useHistory()

  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : { userdata: null }

  const handleLogout = hooks.useCustomDispatch(actions.auth.handleLogout)

  const onCLickLogout = () => {
    handleLogout()

    history.push('/login')
  }

  const onClickMenuItem = (nav) => {
    if (nav.id === 'logout') {
      onCLickLogout()
    }
  }

  useEffect(() => {
    if (userdata) {
      utils.connectOneSignal().setExternalUserId(userdata.username)
    }
  }, [])

  return (
    <Menu
      menuItems={userNavigation}
      onClickMenuItem={onClickMenuItem}
      wrapperClassName='ml-2 sm:ml-3'
      renderButton={() => (
        <>
          <span className='sr-only'>Open user menu</span>
          <span className='flex items-center gap-x-4'>
            <img
              className='h-10 w-10 rounded-full'
              src={userdata?.image_foto ? utils.getImageAPI(userdata?.image_foto) : images.empty_state.profile}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = images.empty_state.profile
              }}
              alt='profile'
            />

            <ChevronDownIcon className='w-6 h-6 text-blue-navy hidden sm:block' />
          </span>
        </>
      )}
    />
  )
}

export default MenuProfile