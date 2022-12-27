import { api } from 'utility'
import { endpoints } from 'constant'
import { lazyLoadStart, lazyLoadEnd } from 'store/actions/misc'

// ** Import action types
import {
  GET_DATA_GALLERY
} from '../actionTypes'

/* eslint-disable no-unused-expressions */

// ** Get data on page or row change
export const getDataGallery = (queryParams, callback = null) => {
    return api.request(
      endpoints.getDataGallery,
      queryParams,
      (response, dispatch, success) => {
        if (success) {
          const { data: {values, total} } = response

          dispatch({
            type: GET_DATA_GALLERY,
            data: {
              data: values && values.length ? values : [],
              total
            }
          })

          if (callback) callback(values)
        }
      },
      null,
      dispatch => dispatch(lazyLoadStart('getDataGallery')),
      dispatch => dispatch(lazyLoadEnd('getDataGallery'))
    )
}