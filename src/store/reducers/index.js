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
  paramsGlobal
}

const rootReducer = combineReducers({
  router: connectRouter(history),
  ...reducers
})

export default rootReducer
