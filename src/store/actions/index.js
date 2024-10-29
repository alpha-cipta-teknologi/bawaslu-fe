import * as layout from './layout'
import * as auth from './auth'
import * as misc from './misc'
import * as areas from './area'
import * as notifications from './notifications'
import * as communities from './communities'
import * as topics from './topics'
import * as params from './params'

import * as navigations from 'navigation/store/action'

// ** Global FE
import * as forums from 'views/public/forum/store/action'
import * as bawasluupdates from 'views/public/bawaslu_update/store/action'
import * as gallerys from 'views/public/gallery/store/action'
import * as home from 'views/public/home/store/action'
import * as complaint from 'views/public/aduan/store/action'
import * as factcheck from 'views/public/factcheck/store/action'

import * as profile from 'views/private/profile/store/action'
import * as antarlembaga from 'views/public/antar_lembaga/store/action'

const actions = {
  // ** Layout & Nav
  layout,
  navigations,
  // ** Misc
  misc,
  areas,
  notifications,
  communities,
  topics,
  params,
  // ** Auth
  auth,
  profile,
  // ** Global FE
  forums,
  bawasluupdates,
  gallerys,
  home,
  complaint,
  factcheck,
  antarlembaga
}

export default actions
