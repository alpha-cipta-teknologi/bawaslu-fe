import { endpoints } from 'constant'
import { api } from 'utility'

import { lazyLoadEnd, lazyLoadStart } from '../misc'

export const getAllDataTopic = (callback = null) => {
  return api.request(
    endpoints.getAllDataTopic,
    null,
    (response, dispatch, success) => {
      if (success) {
        const data = response?.data?.map(topic => ({
          label: topic?.tema_name,
          value: `${topic.id}`
        })) || []

        dispatch({
          type: 'GET_ALL_DATA_TOPIC',
          data
        })

        if (callback) callback(data)
      } else {
        dispatch({
          type: 'GET_ALL_DATA_TOPIC',
          data: []
        })

        if (callback) callback([])
      }
    },
    (response, dispatch) => {
      dispatch({
        type: 'GET_ALL_DATA_TOPIC',
        data: []
      })

      if (callback) callback([])
    },
    dispatch => dispatch(lazyLoadStart('getAllDataTopic')),
    dispatch => dispatch(lazyLoadEnd('getAllDataTopic'))
  )
}