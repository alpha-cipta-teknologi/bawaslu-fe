// ** Redux Imports
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// ** Reducers Imports
import layout from './layout'
import navigations from 'navigation/store/reducer'
import misc from './misc'
import areas from './area'
import notifications from './notifications'
import communities from './communities'
import topics from './topics'

// ** Auth
import auth from './auth'
import profile from 'views/private/profile/store/reducer'

// ** Global FE
import forumsReducer from 'views/public/forum/store/reducer'
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
  notifications,
  communities,
  topics,
  // ** Auth
  auth,
  profile,
  // ** Global FE
  // forums,
  bawasluupdates,
  gallerys,
  home
}

const forumsPersistConfig = {
  key: 'forums',
  storage,
  blacklist: ['forumList', 'trendingForumList']
}

const rootReducer = combineReducers({
  router: connectRouter(history),
  forums: persistReducer(forumsPersistConfig, forumsReducer),
  ...reducers
})

export default rootReducer
