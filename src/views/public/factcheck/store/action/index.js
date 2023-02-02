import { endpoints } from 'constant'
import { api } from 'utility'
import { lazyLoadEnd, lazyLoadStart } from 'store/actions/misc'

import { GET_DATA_FACT_CHECK } from '../actionTypes'

// ** Get data on page or row change
export const getDataFactCheck = (queryParams, callback = null) => {
  return api.request(
    endpoints.getDataFactCheck,
    queryParams,
    (response, dispatch, success) => {
      if (success) {
        const { data: { values, total } } = response

        dispatch({
          type: GET_DATA_FACT_CHECK,
          data: {
            page: queryParams.page,
            data: values && values.length ? values : [],
            total
          }
        })

        if (callback) callback(values)
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('getDataFactCheck')),
    dispatch => dispatch(lazyLoadEnd('getDataFactCheck'))
  )
}