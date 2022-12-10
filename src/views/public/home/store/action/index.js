import { api } from 'utility'
import { endpoints } from 'constant'
import { lazyLoadStart, lazyLoadEnd } from 'store/actions/misc'

import { GET_DATA_CONTENT_HOME } from '../actionTypes'

// ** Get data on home page
export const getDataContentHome = () => {
  return api.request(
    endpoints.getDataContentHome,
    null,
    (response, dispatch, success) => {
      if (success) {
        dispatch({
          type: GET_DATA_CONTENT_HOME,
          data: response.data
        })
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('getDataContentHome')),
    dispatch => dispatch(lazyLoadEnd('getDataContentHome'))
  )
}