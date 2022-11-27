import { api, sessionStorageHelper } from 'utility'
import { endpoints } from 'constant'
import { lazyLoadStart, lazyLoadEnd } from 'store/actions/misc'

import { GET_ALL_DATA_NAVIGATION, SET_BROWSER_BACKSTACK } from '../actionTypes'

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

// ** Get all Data
export const getAllDataNavigation = (callback = null) => {
  return api.request(
    endpoints.getAllNavigation,
    null,
    (response, dispatch, success) => {
      if (success) {
        const { data } = response
        const seqData = data
          .sort((a, b) => a.seq_number - b.seq_number)
          .map(list => {
            if (list.childrens && list.childrens.length) {
              return {
                ...list,
                childrens: list.childrens
                  .sort((a, b) => a.seq_number - b.seq_number)
                  .map(list2 => {
                    if (list2.childrens && list2.childrens.length) {
                      return {
                        ...list2,
                        childrens: list2.childrens.sort((a, b) => a.seq_number - b.seq_number)
                      }
                    }

                    return list2
                  })
              }
            }

            return list
          })

        dispatch({
          type: GET_ALL_DATA_NAVIGATION,
          data: seqData
        })

        callback ? callback() : null
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('login')),
    dispatch => dispatch(lazyLoadEnd('login'))
  )
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