import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { styleHelper } from 'utility'

import Text from '../Text'

// example of data menuItems
// const menuItems = [
//   {
//     id: 'logout',
//     name: 'Keluar',
//     icon: () => <CustomIcon iconName='logout' />
//   }
// ]

const CustomMenu = ({ menuItems, renderButton, onClickMenuItem }) => {
  return (
    <Menu as='div' className='relative ml-2 sm:ml-3'>
      <div>
        <Menu.Button className='flex rounded-full bg-white text-sm focus:outline-none focus:ring-0'>
          {renderButton && renderButton()}
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
          {menuItems.map((data, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <span className={styleHelper.classNames(
                  active ? 'bg-gray-100' : '',
                  'px-4 py-2 cursor-pointer flex items-center gap-2.5'
                )} onClick={() => onClickMenuItem && onClickMenuItem(data)}>
                  {data.icon()}
                  <Text
                    size='text-xs'
                    weight='font-bold'
                    cursor='cursor-pointer'
                    responsiveSize={false}
                  >
                    {data.name}
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

export default CustomMenu