import React from 'react'
import { Disclosure } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

import { styleHelper, layoutHelper } from 'utility'

import { Text } from '../../../components'

const VerticalMenuGroup = ({
  item,
  currentActiveLink,
  routerProps,
  collapsed,
  depth
}) => {
  const isGroupActive = layoutHelper.isNavGroupActive(item.children, currentActiveLink, routerProps)

  const renderMenuText = menuItem => {
    return (
      <>
        <menuItem.icon className='mr-3 flex-shrink-0 h-6 w-6 text-white' aria-hidden='true' />

        <Text
          type='span'
          color='text-white'
          cursor='cursor-pointer'
          lineClamp='line-clamp-1'
          className='flex-1'
        >{menuItem.title}</Text>
      </>
    )
  }

  return (
    <Disclosure
      key={currentActiveLink}
      as='div'
      className='space-y-1'
      defaultOpen={isGroupActive && !collapsed}
    >
      {({ open }) => {
        return (
          <>
            <Disclosure.Button
              className={styleHelper.classNames(
                isGroupActive
                  ? 'bg-white bg-opacity-15'
                  : 'hover:bg-white hover:bg-opacity-15',
                'group w-full flex items-center px-3 py-3'
              )}
              style={{ paddingLeft: depth > 0 ? depth * 44 : 12 }}
            >
              {renderMenuText(item)}

              <ChevronRightIcon
                className={styleHelper.classNames(
                  open ? 'text-white rotate-90' : '',
                  'ml-3 flex-shrink-0 h-7 w-7 transform text-white group-hover:text-white transition-colors ease-in-out duration-150'
                )}
              />
            </Disclosure.Button>

            <Disclosure.Panel className='space-y-1'>
              {item.children.map((subItem, index) => {
                const isLinkActive = layoutHelper.isNavLinkActive(subItem.navLink, currentActiveLink, routerProps)

                if (subItem.children && subItem.children.length) {
                  // ** Recursive menu
                  return (
                    <VerticalMenuGroup
                      key={subItem.title}
                      item={subItem}
                      currentActiveLink={currentActiveLink}
                      routerProps={routerProps}
                      collapsed={collapsed}
                      depth={1}
                    />
                  )
                }

                return (
                  <Disclosure.Button
                    key={subItem.title}
                    as={Link}
                    to={subItem.navLink}
                    className={styleHelper.classNames(
                      'group w-full flex items-center pr-3 py-3',
                      isLinkActive
                        ? 'bg-white bg-opacity-15'
                        : 'hover:bg-white hover:bg-opacity-15'
                    )}
                    style={{ paddingLeft: depth > 0 ? (depth + 1) * 40 : 44 }}
                  >
                    {renderMenuText(subItem)}
                  </Disclosure.Button>
                )
              })}
            </Disclosure.Panel>
          </>
        )
      }}
    </Disclosure>
  )
}

export default VerticalMenuGroup