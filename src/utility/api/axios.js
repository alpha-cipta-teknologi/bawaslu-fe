import axios from 'axios'

import { store } from 'store'
import { apiConfig as config, authConfig } from 'configs'
import { handleLogout } from 'store/actions/auth'

import { endpoints } from 'constant'
import * as toastify from '../toast'

import { axiosRequest } from './helpers'
import { setToken, getToken } from '../storage/local'

import { history } from '../../history'

const storageTokenKeyName = authConfig.storageTokenKeyName
const storageRefreshTokenKeyName = authConfig.storageRefreshTokenKeyName

const axiosInstance = axios.create({ baseURL: config.baseUrl })

const refreshAccessToken = async () => {
  try {
    const refreshToken = getToken(storageRefreshTokenKeyName)
    const result = await axiosRequest(endpoints.refreshToken, { refresh_token: refreshToken })

    return result
  } catch (error) {
    throw error
  }
}

// // ** Request Interceptor
axiosInstance.interceptors.request.use(
  config => {
    // ** Get token from localStorage
    const accessToken = getToken(storageTokenKeyName)
    const refreshToken = getToken(storageRefreshTokenKeyName)

    // ** If token is present add it to request's Authorization Header
    if (refreshToken && config.url === endpoints.refreshToken.path) {
      // ** eslint-disable-next-line no-param-reassign
      const authorization = `${authConfig.tokenType} ${refreshToken}`

      config.headers = {
        ...config.headers,
        Authorization: authorization
      }
    } else if (accessToken && config.url !== endpoints.refreshToken.path) {
      // ** eslint-disable-next-line no-param-reassign
      const authorization = `${authConfig.tokenType} ${accessToken}`

      config.headers = {
        ...config.headers,
        Authorization: authorization
      }
    }

    return config
  },
  error => Promise.reject(error)
)

const forceLogout = () => {
  store.dispatch(handleLogout())

  store.dispatch({
    type: 'SET_PROGRESS',
    data: -1
  })

  history.push('/login')

  toastify.error('Token tidak valid. Silakan login kembali')
}

// ** Add request/response interceptor
axiosInstance.interceptors.response.use(response => {
  return response
}, async function (error) {
  const originalRequest = error.config

  if (!error.response) {
    // network error
    return Promise.reject(error)
  } else {
    const status = error.response.status
    const respData = error.response.data
    const reqUrl = error?.response?.config?.url || ''

    if (status === 401 || status === 403) {
      if (reqUrl?.includes(endpoints.refreshToken.path)) {
        forceLogout()

        return new Promise(() => { })
      }

      if (!originalRequest._retry) {
        originalRequest._retry = true

        try {
          const { code, data } = await refreshAccessToken()

          if (code === 200) {
            axios.defaults.headers.common['Authorization'] = await `${authConfig.tokenType} ${data.access_token}`

            await setToken(data.access_token, data.refresh_token)

            store.dispatch({
              type: 'REFRESH_TOKEN',
              config: authConfig,
              [storageTokenKeyName]: data[storageTokenKeyName],
              [storageRefreshTokenKeyName]: data[storageRefreshTokenKeyName]
            })

            return axiosInstance(originalRequest)
          } else {
            forceLogout()

            return new Promise(() => { })
          }
        } catch (error) {
          forceLogout()

          return new Promise(() => { })
        }
      }
    } else {
      // todo: request ke BE perbaiki api /forum/article/:slug
      if (status !== 404 && !reqUrl.includes('/forum/article')) {
        toastify.error(respData.message)
      }

      return Promise.reject(error)
    }
  }
})

export default axiosInstance
