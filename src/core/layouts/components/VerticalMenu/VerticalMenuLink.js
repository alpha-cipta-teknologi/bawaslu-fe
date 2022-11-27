import React from 'react'
import { Link } from 'react-router-dom'

import { layoutHelper, styleHelper } from 'utility'

import { Text } from '../../../components'

const VerticalMenuLink = ({
  item,
  collapsed,
  currentActiveLink,
  routerProps
}) => {
  const isLinkActive = layoutHelper.isNavLinkActive(item.navLink, currentActiveLink, routerProps)

  return (
    <Link
      key={ item.title }
      to={ item.navLink }
      className={ styleHelper.classNames(
        isLinkActive ? 'bg-white bg-opacity-15' : 'hover:bg-white hover:bg-opacity-15',
        'group flex items-center px-3 py-3 cursor-pointer'
      ) }
    >
      <item.icon
        className={ styleHelper.classNames(
          collapsed ? '' : 'mr-3',
          'flex-shrink-0 h-6 w-6 text-white'
        ) }
        aria-hidden='true'
      />

      <Text
        color='text-white'
        weight={ item.current ? 'font-bold' : 'font-normal' }
        lineHeight='leading-6'
        lineClamp='line-clamp-1'
        cursor='cursor-pointer'
      >{ !collapsed && item.title }</Text>
    </Link>
  )
}

export default VerticalMenuLink