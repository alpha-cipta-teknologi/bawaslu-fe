// ** Redux, Thunk & Root Reducer Imports
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { routerMiddleware } from 'connected-react-router'

import rootReducer from './reducers'
import actions from './actions'

import { history } from '../history'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['bawasluupdates', 'forums']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// ** Create store
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))))

const persistor = persistStore(store)

export {
  store,
  history,
  persistor,
  actions
}
