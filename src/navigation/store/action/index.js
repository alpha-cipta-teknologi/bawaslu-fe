import { sessionStorageHelper } from 'utility'

import { SET_BROWSER_BACKSTACK } from '../actionTypes'

/* eslint-disable no-unused-expressions */

export const setBackStack = (action, location) => {
  const backStack = sessionStorageHelper.getItem('backStack')

  if (backStack && Array.isArray(backStack)) {
    switch (action) {
      // case 'POP':
      //   return backStack.slice(0, backStack.length - 1)
      case 'PUSH':
        return [...backStack, location]
      case 'REPLACE':
        return [...backStack.slice(0, backStack.length - 1), location]
      default:
        return backStack
    }
  }

  return [location]
}

export const setBrowserBackStack = (props) => {
  const { action, location } = props

  return dispatch => {
    const newBackStack = setBackStack(action, location)
    sessionStorageHelper.setItem('backStack', newBackStack)

    dispatch({
      type: SET_BROWSER_BACKSTACK,
      data: newBackStack
    })
  }
}