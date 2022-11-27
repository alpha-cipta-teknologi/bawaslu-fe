import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { CustomIcon, Text } from '../../../components'

// data notif dummy
const notifList = [
  {
    name: 'Yudi Wahyudi',
    type: 'like',
    message: 'Menyukai postingan Anda',
    datetime: '5 menit yang lalu',
    imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Albert Flores',
    type: 'comment',
    message: 'Mengomentari postingan Anda',
    datetime: '5 menit yang lalu',
    imageUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Jane Cooper',
    type: 'comment',
    message: 'Mengomentari postingan Anda',
    datetime: '5 menit yang lalu',
    imageUrl: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Kristin Watson',
    type: 'comment',
    message: 'Mengomentari postingan Anda',
    datetime: '5 menit yang lalu',
    imageUrl: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Yudi Wahyudi',
    type: 'like',
    message: 'Menyukai postingan Anda',
    datetime: '5 menit yang lalu',
    imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Albert Flores',
    type: 'comment',
    message: 'Mengomentari postingan Anda',
    datetime: '5 menit yang lalu',
    imageUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Jane Cooper',
    type: 'comment',
    message: 'Mengomentari postingan Anda',
    datetime: '5 menit yang lalu',
    imageUrl: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Kristin Watson',
    type: 'comment',
    message: 'Mengomentari postingan Anda',
    datetime: '5 menit yang lalu',
    imageUrl: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
]

const MenuNotification = () => {
  return (
    <Menu as='div' className='relative'>
      <div>
        <Menu.Button className='relative focus:outline-none focus:ring-0'>
          <CustomIcon iconName='bell' className='h-6 w-6' aria-hidden='true' />

          <span className='absolute top-0.5 right-0 bg-red-light-1 w-2 h-2 rounded-full' />
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
        <Menu.Items className='absolute right-0 divide-y divide-grey-light-6 divide-opacity-50 z-10 mt-2 w-48 sm:w-[272px] max-h-[248px] overflow-y-auto custom-scrollbar origin-top-right rounded bg-white shadow-2md focus:outline-none'>
          {notifList.map((notif, index) => (
            <Menu.Item key={index}>
              <span className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'>
                <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
                  <img
                    className='h-8 w-8 rounded-full'
                    src={notif.imageUrl}
                    alt={notif.name || 'profile'}
                  />
                </div>
                <div className='flex-1'>
                  <Text
                    size='text-xs'
                    weight='font-bold'
                    lineClamp='line-clamp-1'
                    cursor='cursor-pointer'
                  >{notif.name}</Text>
                  <Text size='text-xs' lineClamp='line-clamp-3' cursor='cursor-pointer'>{notif.message}</Text>
                  <Text
                    size='text-xxs'
                    color='text-grey-base'
                    lineClamp='line-clamp-1'
                    cursor='cursor-pointer'
                  >{notif.datetime}</Text>
                </div>
              </span>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default MenuNotification
