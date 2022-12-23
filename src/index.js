import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

// ** Redux Imports
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from 'store'

// ** Utility
import {
  IntlProviderWrapper,
  AbilityContext,
  styleHelper
} from 'utility'
// ** Spinner (Splash Screen)
import { SplashScreen } from 'core/layouts'

import ability from './configs/acl/ability'

// ** Service Worker
//import * as serviceWorker from './serviceWorker'

import App from './App'

const contextClassBg = {
  success: 'bg-green-50 text-green-800',
  error: 'bg-red-50 text-red-800',
  info: 'bg-blue-50 text-blue-700',
  warning: 'bg-yellow-50 text-yellow-800',
  default: 'bg-white text-drcBlack-1',
  dark: 'bg-white-600 text-gray-300'
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<></>}>
        <AbilityContext.Provider value={ability}>
          <IntlProviderWrapper>
            <App />

            <ToastContainer
              toastClassName={({ type }) => styleHelper.classNames(contextClassBg[type || 'default'], 'relative flex p-2 min-h-[60px] mb-5 justify-between overflow-hidden rounded-lg shadow-md')}
              autoClose={4000}
              newestOnTop
            />
          </IntlProviderWrapper>
        </AbilityContext.Provider>
      </Suspense>
    </PersistGate>
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister()
