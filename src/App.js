import React, { useEffect } from 'react'
import OneSignal from 'react-onesignal'
import { utils } from './utility'
import Router from 'router'

import { history } from './history'

import 'react-toastify/dist/ReactToastify.css'
import './index.css'

const App = () => {

  useEffect(() => {
    OneSignal.init({
      appId: process.env.REACT_APP_ONESIGNAL_APPID
    }).then(() => {
      utils.defineOneSignal(OneSignal)
    })
  })

  return <Router history={history} />
}

export default App
