import React from 'react'

import Router from 'router'

import { history } from './history'

import 'react-toastify/dist/ReactToastify.css'
import './index.css'

const App = () => {
  return <Router history={history} />
}

export default App
