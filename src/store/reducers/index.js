// ** Redux Imports
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// ** Reducers Imports
import layout from './layout'
import navigations from 'navigation/store/reducer'
import misc from './misc'
import tables from './table'
import auth from './auth'
// ** Param Global
import paramsGlobal from './params'

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
  // ** Misc & Component
  misc,
  tables,
  // ** Auth
  auth,
  // ** Param Global
  paramsGlobal,
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
