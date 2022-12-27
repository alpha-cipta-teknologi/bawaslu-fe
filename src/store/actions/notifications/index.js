import { endpoints } from 'constant'
import { api } from 'utility'

import { lazyLoadEnd, lazyLoadStart } from '../misc'

export const getDataNotification = (queryParams, callback = null) => {
  return api.request(
    endpoints.getDataNotification,
    queryParams,
    (response, dispatch, success) => {
      const data = response?.data

      if (success) {
        dispatch({
          type: 'GET_DATA_NOTIFICATION',
          data: {
            values: data?.values || [],
            total: data?.total || 0,
            page: queryParams?.page || 1
          }
        })
      }

      if (callback) callback(success, data)
    },
    (response, dispatch) => {
      dispatch({
        type: 'GET_DATA_NOTIFICATION',
        data: {
          values: [],
          total: 0,
          page: queryParams?.page || 1
        }
      })

      if (callback) {
        callback(false, {
          values: [],
          total: 0
        })
      }
    },
    dispatch => dispatch(lazyLoadStart('getDataNotification')),
    dispatch => dispatch(lazyLoadEnd('getDataNotification'))
  )
}

export const readNotification = (notifId, callback = null) => {
  return api.request(
    endpoints.readNotification(notifId),
    null,
    (response, dispatch, success) => {
      if (callback) callback(success)
    },
    (response, dispatch) => {
      if (callback) callback(false)
    },
    dispatch => dispatch(lazyLoadStart('readNotification')),
    dispatch => dispatch(lazyLoadEnd('readNotification'))
  )
}