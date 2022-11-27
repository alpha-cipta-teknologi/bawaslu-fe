import { useLocation } from 'react-router-dom'

import { layoutHelper } from 'utility'

import VerticalMenuLink from './VerticalMenuLink'
import VerticalMenuGroup from './VerticalMenuGroup'

const {
  resolveVerticalNavMenuItemComponent: resolveNavItemComponent,
  canViewMenuGroup,
  canViewMenuItem
} = layoutHelper

const VerticalMenuNav = props => {
  // ** URL Vars
  const location = useLocation()
  const currentURL = location.pathname
  const Components = {
    VerticalMenuGroup,
    VerticalMenuLink
  }

  // ** Render Nav Menu Items
  return props.navigation.map((item) => {
    const TagName = Components[resolveNavItemComponent(item)]

    const renderVerticalMenu = () => {
      return (
        <TagName
          key={ item.id }
          item={ item }
          currentActiveLink={ currentURL || '' }
          { ...props }
        />
      )
    }

    if (item.children) {
      return canViewMenuGroup(item) && renderVerticalMenu()
    }

    return canViewMenuItem(item) && renderVerticalMenu()
  })
}

export {
  VerticalMenuGroup,
  VerticalMenuLink,
  VerticalMenuNav
}