import * as layout from './layout'
import * as auth from './auth'
import * as misc from './misc'
import * as tables from './table'
import * as navigations from 'navigation/store/action'

const actions = {
  // ** Layout & Nav
  layout,
  navigations,
  // ** Misc & Component
  misc,
  tables,
  // ** Auth
  auth
}

export default actions
