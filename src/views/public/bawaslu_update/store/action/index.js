import { api } from 'utility'
import { endpoints } from 'constant'
import {
  lazyLoadStart,
  lazyLoadEnd,
  setProgressBar
} from 'store/actions/misc'

// ** Import action types
import {
  GET_DATA_BAWASLU_UPDATE,
  GET_BAWASLU_UPDATE_DETAIL
} from '../actionTypes'

/* eslint-disable no-unused-expressions */

// ** Get data on page or row change
export const getDataBawasluUpdate = (queryParams, callback = null) => {
  return api.request(
    endpoints.getDataBawasluUpdate,
    queryParams,
    (response, dispatch, success) => {
      if (success) {
        const { data: { values, total } } = response

        dispatch({
          type: GET_DATA_BAWASLU_UPDATE,
          data: {
            data: values && values.length ? values : [],
            total,
            page: queryParams.page || 1
          }
        })


        if (callback) callback(values)
      }
    },
    (response, dispatch) => {
      if (response.code === 404) {
        dispatch({
          type: GET_DATA_BAWASLU_UPDATE,
          data: {
            data: [],
            total: 0,
            page: queryParams.page || 1
          }
        })

        if (callback) callback([])
      }
    },
    dispatch => dispatch(lazyLoadStart('getDataBawasluUpdate')),
    dispatch => dispatch(lazyLoadEnd('getDataBawasluUpdate'))
  )
}

export const getBawasluUpdateDetail = (payload, callback = null) => {
  return api.request(
    payload.isUserLoggedIn ? endpoints.getBawasluUpdateDetailAuth(payload.slug) : endpoints.getBawasluUpdateDetail(payload.slug),
    null,
    (response, dispatch, success) => {
      if (success) {
        const { data } = response

        dispatch({
          type: GET_BAWASLU_UPDATE_DETAIL,
          data
        })

        dispatch(setProgressBar('end'))

        if (callback) callback(data)
      }
    },
    null,
    dispatch => {
      dispatch(setProgressBar('start'))
      dispatch(lazyLoadStart('getBawasluUpdateDetail'))
    },
    dispatch => {
      dispatch(setProgressBar('end'))
      dispatch(lazyLoadEnd('getBawasluUpdateDetail'))
    }
  )
}