import { endpoints } from 'constant'
import { api, localStorageHelper, utils } from 'utility'
import { lazyLoadEnd, lazyLoadStart } from 'store/actions/misc'

import { GET_DATA_PROFILE } from '../actionTypes'

export const updateProfile = (payload, callback = null) => {
  const formUpdateProfile = utils.removeProperties(payload, 'id')

  return api.request(
    endpoints.updateProfile(payload.id),
    formUpdateProfile,
    (response, dispatch, success) => {
      if (success) {
        if (callback) callback()
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('updateProfile')),
    dispatch => dispatch(lazyLoadEnd('updateProfile'))
  )
}

// ** Get Data Profile
export const getDataProfile = (id, callback = null) => {
  return api.request(
    endpoints.getDataProfile(id),
    null,
    (response, dispatch, success) => {
      if (success) {
        const { data } = response

        dispatch({
          type: GET_DATA_PROFILE,
          data
        })

        const userdata = { userdata: data }

        localStorageHelper.setItem('userData', userdata)

        if (callback) callback(data)
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('getDataProfile')),
    dispatch => dispatch(lazyLoadEnd('getDataProfile'))
  )
}