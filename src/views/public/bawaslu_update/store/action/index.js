import { api } from 'utility'
import { endpoints } from 'constant'
import {
  lazyLoadStart,
  lazyLoadEnd,
  setProgress
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
          const { data: {values, total} } = response

          dispatch({
            type: GET_DATA_BAWASLU_UPDATE,
            data: {
              data: values && values.length ? values : [],
              total
            }
          })

          callback ? callback(values) : null
        }
      },
      null,
      dispatch => dispatch(lazyLoadStart('getDataBawasluUpdate')),
      dispatch => dispatch(lazyLoadEnd('getDataBawasluUpdate'))
    )
}

export const getBawasluUpdateDetail = (slug, callback = null) => {

  return api.request(
    endpoints.getBawasluUpdateDetail(slug),
    null,
    (response, dispatch, success) => {
      if (success) {
        const { data } = response

        dispatch({
          type: GET_BAWASLU_UPDATE_DETAIL,
          data
        })

        dispatch(setProgress('end'))

        callback ? callback(data) : null // eslint-disable-line no-unused-expressions
      }
    },
    null,
    dispatch => {
      dispatch(setProgress('start'))
      dispatch(lazyLoadStart('getBawasluUpdateDetail'))
    },
    dispatch => {
      dispatch(setProgress('reset'))
      dispatch(lazyLoadEnd('getBawasluUpdateDetail'))
    }
  )
}

