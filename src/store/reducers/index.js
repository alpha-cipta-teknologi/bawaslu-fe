// ** Redux Imports
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// ** Reducers Imports
import layout from './layout'
import navigations from 'navigation/store/reducer'
import misc from './misc'
import areas from './area'

// ** Auth
import auth from './auth'
import profile from 'views/private/profile/store/reducer'

// ** Global FE
import forums from 'views/public/forum/store/reducer'
import bawasluupdates from 'views/public/bawaslu_update/store/reducer'
import gallerys from 'views/public/gallery/store/reducer'
import home from 'views/public/home/store/reducer'

import { history } from '../../history'

const reducers = {
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

const rootReducer = combineReducers({
  router: connectRouter(history),
  ...reducers
})

export default rootReducer
