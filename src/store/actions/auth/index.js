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

export const forgotPassword = (formForgot, callback = null) => {
  return api.request(
    endpoints.forgotPassword,
    formForgot,
    (response, dispatch, success) => {
      if (success) {
        if (callback) callback(success)
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('forgotPassword')),
    dispatch => dispatch(lazyLoadEnd('forgotPassword'))
  )
}

export const resetPassword = (payload, callback = null) => {
  const formReset = { password: payload.password }

  return api.request(
    endpoints.resetPassword(payload.confirm_hash),
    formReset,
    (response, dispatch, success) => {
      if (success) {
        if (callback) callback(success)
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('resetPassword')),
    dispatch => dispatch(lazyLoadEnd('resetPassword'))
  )
}

export const accountVerification = (confirmHash, callback = null) => {
  return api.request(
    endpoints.accountVerification,
    { confirm_hash: confirmHash },
    (response, dispatch, success) => {
      if (success) {
        if (callback) callback(success)
      }
    },
    () => {
      if (callback) callback(false)
    },
    dispatch => dispatch(lazyLoadStart('accountVerification')),
    dispatch => dispatch(lazyLoadEnd('accountVerification'))
  )
}

export const handleLoginSSO = (formLogin, callback = null) => {
  return api.request(
    endpoints.loginSSO,
    formLogin,
    (response, dispatch, success) => {
      if (success) {
        const data = response.data

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
    dispatch => dispatch(lazyLoadStart('loginSSO')),
    dispatch => dispatch(lazyLoadEnd('loginSSO'))
  )
}

export const getOTP = (formOTP, callback = null) => {
  return api.request(
    endpoints.getOTP,
    formOTP,
    (response, dispatch, success) => {
      if (success) {
        const { status, message } = response // Extracting status and message

        if (status) {
          if (callback) callback({ status: true, message }) // Call callback with success
        } else {
          if (callback) callback({ status: false, message: message || "Gagal mengirim OTP" }) // Use provided message if exists
        }
      } else {
        if (callback) callback({ status: false, message: "Gagal mengirim OTP" }) // General failure message
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('getOTP')),
    dispatch => dispatch(lazyLoadEnd('getOTP'))
  )
}

export const verificationOTP = (formOTP, callback = null) => {
  return api.request(
    endpoints.verifyOTP,
    formOTP,
    (response, dispatch, success) => {
      if (success) {
        const { status, message } = response // Extracting status and message

        if (status) {
          if (callback) callback({ status: true, message }) // Call callback with success
        } else {
          if (callback) callback({ status: false, message: message || "Gagal Verifikasi OTP" }) // Use provided message if exists
        }
      } else {
        if (callback) callback({ status: false, message: "Gagal Verifikasi OTP" }) // General failure message
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('getOTP')),
    dispatch => dispatch(lazyLoadEnd('getOTP'))
  )
}
