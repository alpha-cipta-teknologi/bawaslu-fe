import { endpoints } from 'constant'
import { api } from 'utility'

import { lazyLoadEnd, lazyLoadStart } from '../misc'

/* eslint-disable no-unused-expressions */

export const getParamGlobalDetail = (formParamGlobal, callback = null) => {
  const queryParams = {
    search_by: formParamGlobal?.search_by || 'key_param',
    keyword: formParamGlobal?.keyword
  }

  return api.request(
    endpoints.getParamGlobalDetail,
    queryParams,
    (response, dispatch, success) => {
      if (success) {
        if (formParamGlobal?.keyword === 'key_restrict_level') {
          dispatch({
            type: 'GET_RESTRICT_LEVEL',
            data: response.data || []
          })
        }

        callback ? callback(response, dispatch, success) : null // eslint-disable-line no-unused-expressions
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart(`${ formParamGlobal?.loadingName ? formParamGlobal?.loadingName : 'getParamGlobalDetail' }`)),
    dispatch => dispatch(lazyLoadEnd(`${ formParamGlobal?.loadingName ? formParamGlobal?.loadingName : 'getParamGlobalDetail' }`))
  )
}
