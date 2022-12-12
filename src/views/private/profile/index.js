import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import _truncate from 'lodash/truncate'

import { Card, Tabs, Text, CustomIcon, ForumArticleList } from 'core/components'
import { hooks, styleHelper, utils } from 'utility'
import { actions } from 'store'

import { FormChangePassword, FormUpdateProfile } from './components'

const profileMenus = [
  {
    id: 'profile',
    name: 'Profile',
    iconName: 'user'
  },
  {
    id: 'forum_article',
    name: 'Postingan',
    iconName: 'document'
  },
  {
    id: 'change_password',
    name: 'Kata Sandi',
    iconName: 'lock'
  },
  {
    id: 'logout',
    name: 'Keluar',
    iconName: 'logout_2'
  }
]

const ProfilePage = () => {
  const history = useHistory()

  const handleLogout = hooks.useCustomDispatch(actions.auth.handleLogout)

  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : { userdata: null }

  const [selectedMenuId, setSelectedMenuId] = useState(profileMenus[0].id)
  const [pageForum, setPageForum] = useState(1)
  const [formPassword, setFormPassword] = useState({
    old_password: '',
    password: '',
    confirm_password: ''
  })
  const [showErrorInput, setShowErrorInput] = useState(false)

  const onLogout = () => {
    handleLogout()

    history.replace('/login')
  }

  const onClickMenuProfile = id => {
    setSelectedMenuId(id)

    if (id === 'profile' || id === 'change_password') setShowErrorInput(false)
    if (id === 'logout') onLogout()
    if (id === 'forum_article') setPageForum(1)
    if (id === 'change_password') {
      setFormPassword({
        old_password: '',
        password: '',
        confirm_password: ''
      })
    }
  }

  const renderContent = () => {
    switch (selectedMenuId) {
      case 'forum_article':
        return (
          <ForumArticleList
            fulfilledCondition={selectedMenuId === 'forum_article'}
            emptyStateTitle='Tidak ada postingan'
            page={pageForum}
            setPage={setPageForum}
            withActionCard
          />
        )
      case 'profile':
        return (
          <FormUpdateProfile
            selectedMenuId={selectedMenuId}
            showErrorInput={showErrorInput}
            setShowErrorInput={setShowErrorInput}
            userdata={userdata}
          />
        )
      case 'change_password':
        return (
          <FormChangePassword
            selectedMenuId={selectedMenuId}
            showErrorInput={showErrorInput}
            setShowErrorInput={setShowErrorInput}
            userdata={userdata}
            formPassword={formPassword}
            setFormPassword={setFormPassword}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className='py-6 md:py-10'>
      <div className='flex flex-col md:gap-9 md:flex-row'>
        <div className='md:w-1/4'>
          <div className='hidden md:flex flex-col space-y-2 w-full md:sticky md:top-[120px]'>
            <Text size='text-2.5xl' weight='font-bold' className='mb-7'>Profil</Text>

            <Card paddingHorizontal='px-3' paddingVertical='py-3'>
              {profileMenus.map(menu => {
                const isSelected = selectedMenuId === menu.id

                return (
                  <div
                    key={menu.id}
                    className={styleHelper.classNames(
                      'flex items-center gap-x-3 px-4 py-3.5 cursor-pointer rounded',
                      isSelected ? 'bg-primary bg-opacity-[0.12]' : 'bg-white'
                    )}
                    onClick={() => onClickMenuProfile(menu.id)}
                  >
                    <CustomIcon iconName={menu.iconName} className={isSelected ? 'stroke-primary' : 'stroke-grey-light-8'} />

                    <Text
                      weight={isSelected ? 'font-semibold' : 'font-medium'}
                      color={isSelected ? 'text-primary' : 'text-grey-light-8'}
                      cursor='cursor-pointer'
                    >{menu.name}</Text>
                  </div>
                )
              })}
            </Card>
          </div>

          <div className='md:hidden'>
            <Tabs
              tabs={profileMenus}
              selectedTab={selectedMenuId}
              setSelectedTab={setSelectedMenuId}
              keyName='id'
              wrapperClassName='space-x-8 justify-start overflow-x-auto no-scrollbar'
              onClick={tab => onClickMenuProfile(tab.id || '')}
            />
          </div>
        </div>

        <div className='w-full mt-7.5 md:mt-16 md:w-3/4 min-h-[65vh]'>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage