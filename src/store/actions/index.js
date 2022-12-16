import * as layout from './layout'
import * as auth from './auth'
import * as misc from './misc'
import * as areas from './area'
import * as navigations from 'navigation/store/action'

// ** Global FE
import * as forums from 'views/public/forum/store/action'
import * as bawasluupdates from 'views/public/bawaslu_update/store/action'
import * as gallerys from 'views/public/gallery/store/action'
import * as home from 'views/public/home/store/action'

import * as profile from 'views/private/profile/store/action'

const actions = {
  // ** Layout & Nav
  layout,
  navigations,
  // ** Misc
  misc,
  areas,
  // ** Auth
  auth,
  profile,
  // ** Global FE
  forums,
  bawasluupdates,
  gallerys,
  home
}

export default actions
