import { endpoints } from 'constant'
import { api } from 'utility'

import { lazyLoadEnd, lazyLoadStart } from '../misc'

export const getAllDataCommunity = (callback = null) => {
  return api.request(
    endpoints.getAllDataCommunity,
    null,
    (response, dispatch, success) => {
      if (success) {
        const data = response?.data?.map(community => ({
          label: community.komunitas_name,
          value: `${community.id}`,
          ...community
        })) || []

        dispatch({
          type: 'GET_ALL_DATA_COMMUNITY',
          data
        })

        if (callback) callback(data)
      } else {
        dispatch({
          type: 'GET_ALL_DATA_COMMUNITY',
          data: []
        })

        if (callback) callback([])
      }
    },
    (response, dispatch) => {
      dispatch({
        type: 'GET_ALL_DATA_COMMUNITY',
        data: []
      })

      if (callback) callback([])
    },
    dispatch => dispatch(lazyLoadStart('getAllDataCommunity')),
    dispatch => dispatch(lazyLoadEnd('getAllDataCommunity'))
  )
}