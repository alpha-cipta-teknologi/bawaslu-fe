import { authConfig } from 'configs'

const storageTokenKeyName = authConfig.storageTokenKeyName
const storageRefreshTokenKeyName = authConfig.storageRefreshTokenKeyName

export const setItem = (key, value) => {
  return localStorage.setItem(`${ key }`, JSON.stringify(value))
}

export const getItem = (key) => {
  const jsonValue = localStorage.getItem(`${ key }`)

  return jsonValue !== null ? JSON.parse(jsonValue) : null
}

export const clearItem = (key) => {
  return localStorage.removeItem(`${ key }`)
}

export const clearStorage = () => {
  return localStorage.clear()
}

export const clearToken = () => {
  const keysToRemove = ['access_token', 'refresh_token']

  return keysToRemove.forEach(k => clearItem(k))
}

export const getToken = (tokenType) => {
  return getItem(tokenType)
}

export const setToken = (accessToken, refreshToken) => {
  const objToSet = [
    {
      key: storageTokenKeyName,
      value: accessToken
    }, {
      key: storageRefreshTokenKeyName,
      value: refreshToken
    }
  ]

  return objToSet.forEach(item => setItem(item.key, item.value))
}
