import { authConfig } from 'configs'
import { endpoints } from 'constant'
import { api, localStorageHelper } from 'utility'

import { lazyLoadEnd, lazyLoadStart } from '../misc'

/* eslint-disable no-unused-expressions */

export const handleLogin = (formLogin, callback = null) => {
  return api.request(
    endpoints.login,
    formLogin,
    (response, dispatch, success) => {
      if (success) {
        const data = response.data
        const menus = data.roles?.map(r => {
          return {
            action: 'read',
            subject: r.menu_name.toLowerCase(),
            resource: r.module_name
          }
        })

        const abilitys = { ability: menus }

        Object.assign(data, abilitys)

        dispatch({
          type: 'LOGIN',
          data,
          config: authConfig,
          [authConfig.storageTokenKeyName]: data[authConfig.storageTokenKeyName],
          [authConfig.storageRefreshTokenKeyName]: data[authConfig.storageRefreshTokenKeyName]
        })

        // // ** Add to user, accessToken & refreshToken to localStorage
        localStorageHelper.setToken(data.access_token, data.refresh_token)
        localStorageHelper.setItem('userData', data)

        if (callback) callback(data)
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('login')),
    dispatch => dispatch(lazyLoadEnd('login'))
  )
}

export const handleRegister = (formRegister, callback = null) => {
  return api.request(
    endpoints.register,
    formRegister,
    (response, dispatch, success) => {
      if (success) {
        const data = response.data

        if (callback) callback(data)
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('register')),
    dispatch => dispatch(lazyLoadEnd('register'))
  )
}

// ** Handle User Logout
export const handleLogout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      [authConfig.storageTokenKeyName]: null,
      [authConfig.storageRefreshTokenKeyName]: null
    })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorageHelper.clearItem('userData')
    localStorageHelper.clearToken()
  }
}

export const changePassword = (formChangePassword, callback = null) => {
  return api.request(
    endpoints.changePassword,
    formChangePassword,
    (response, dispatch, success) => {
      if (success) {
        dispatch(handleLogout())

        callback ? callback() : null
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('changePassword')),
    dispatch => dispatch(lazyLoadEnd('changePassword'))
  )
}

// ** Get Data Profile
export const getDataProfile = () => {
  return api.request(
    endpoints.getDataProfile,
    null,
    (response, dispatch, success) => {
      if (success) {
        const { data } = response

        dispatch({
          type: 'GET_PROFILE',
          data
        })
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('getDataProfile')),
    dispatch => dispatch(lazyLoadEnd('getDataProfile'))
  )
}