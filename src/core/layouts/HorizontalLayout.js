import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as HeroIcon from '@heroicons/react/24/outline'

import { utils } from 'utility'

import { ScrollUp } from '../components'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

const HorizontalLayout = ({ children, routerProps }) => {
  const navStore = useSelector(state => state.navigations)

  const [navigations, setNavigations] = useState([])

  const convertNavigationData = r => {
    const ParentIcon = HeroIcon[r.menu_icon] ? HeroIcon[r.menu_icon] : HeroIcon.Bars3Icon

    if (r.childrens?.length > 0) {
      return {
        id: `${r.module_name}-${r.menu_id}`,
        title: r.menu_name,
        icon: ParentIcon,
        action: 'read',
        navLink: `/${r.module_name}`,
        resource: r.module_name,
        children: r.childrens.map(rs => {
          const ChildrenIcon1 = HeroIcon[rs.menu_icon] ? HeroIcon[rs.menu_icon] : ParentIcon

          if (rs.childrens?.length > 0) {
            return {
              id: `${rs.module_name}-${rs.menu_id}`,
              title: rs.menu_name,
              icon: ChildrenIcon1,
              action: 'read',
              navLink: `/${rs.module_name}`,
              resource: rs.module_name,
              children: rs.childrens.map(res => {
                const ChildrenIcon2 = HeroIcon[res.menu_icon] ? HeroIcon[res.menu_icon] : ChildrenIcon1

                return {
                  id: `${res.module_name}-${res.menu_id}`,
                  title: res.menu_name,
                  icon: ChildrenIcon2,
                  action: 'read',
                  navLink: `/${res.module_name}`,
                  resource: res.module_name
                }
              })
            }
          } else {
            return {
              id: `${rs.module_name}-${rs.menu_id}`,
              title: rs.menu_name,
              icon: ChildrenIcon1,
              action: 'read',
              navLink: `/${rs.module_name}`,
              resource: rs.module_name
            }
          }
        })
      }
    } else {
      return {
        id: `${r.module_name}-${r.menu_id}`,
        title: r.menu_name,
        icon: ParentIcon,
        action: 'read',
        navLink: `/${r.module_name}`,
        resource: r.module_name
      }
    }
  }

  useEffect(() => {
    if (navStore.allData) {
      const menus = navStore.allData.reduce((acc, r) => {
        if (utils.isUserLoggedIn()) {
          acc.push(convertNavigationData(r))
        } else {
          if (!r.auth) {
            acc.push(convertNavigationData(r))
          }
        }

        return acc
      }, [])

      setNavigations([...menus])
    }
  }, [navStore.allData, utils.isUserLoggedIn()])

  return (
    <div className='min-h-screen'>
      <Navbar navigations={navigations} routerProps={routerProps} />

      {children}

      <Footer />

      <ScrollUp />
    </div>
  )
}

export default HorizontalLayout
