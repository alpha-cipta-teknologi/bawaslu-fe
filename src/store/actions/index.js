import * as layout from './layout'
import * as auth from './auth'
import * as misc from './misc'
import * as tables from './table'
import * as navigations from 'navigation/store/action'

// ** Global FE
import * as forums from 'views/public/forum/store/action'
import * as bawasluupdates from 'views/public/bawaslu_update/store/action'
import * as gallerys from 'views/public/gallery/store/action'

const actions = {
  // ** Layout & Nav
  layout,
  navigations,
  // ** Misc & Component
  misc,
  tables,
  // ** Auth
  auth,
  // ** Global FE
  forums,
  bawasluupdates,
  gallerys
}

export default actions
