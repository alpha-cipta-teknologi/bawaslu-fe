import React from 'react'
import PropTypes from 'prop-types'

import { VerticalMenuNav } from '../VerticalMenu'

const SidebarMenu = ({
  collapsed,
  navigation,
  routerProps
}) => {
  if (navigation && navigation.length) {
    return (
      <VerticalMenuNav
        navigation={navigation}
        collapsed={collapsed}
        routerProps={routerProps}
        depth={0}
      />
    )
  }

  return null
}

SidebarMenu.propTypes = {
  collapsed: PropTypes.bool,
  navigation: PropTypes.array,
  routerProps: PropTypes.any
}

export default SidebarMenu
