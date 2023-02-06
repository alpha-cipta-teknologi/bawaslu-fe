import { endpoints } from 'constant'
import { api } from 'utility'
import { lazyLoadEnd, lazyLoadStart } from 'store/actions/misc'

import { GET_HISTORY_REPORT_COMPLAINT } from '../actionTypes'

// ** Report complaint (pengaduan)
export const reportComplaint = (data, callback = null) => {
  return api.request(
    endpoints.reportComplaint,
    data,
    (response, dispatch, success) => {
      if (callback) callback(success)
    },
    () => {
      if (callback) callback(false)
    },
    dispatch => dispatch(lazyLoadStart('reportComplaint')),
    dispatch => dispatch(lazyLoadEnd('reportComplaint'))
  )
}

// ** Get data on page or row change
export const getHistoryReportComplaint = (queryParams, callback = null) => {
  return api.request(
    endpoints.getHistoryReportComplaint,
    queryParams,
    (response, dispatch, success) => {
      if (success) {
        const { data: { values, total } } = response

        dispatch({
          type: GET_HISTORY_REPORT_COMPLAINT,
          data: {
            page: queryParams.page,
            data: values && values.length ? values : [],
            total
          }
        })

        if (callback) callback(values)
      }
    },
    (response, dispatch) => {
      if (response.code === 404) {
        dispatch({
          type: GET_HISTORY_REPORT_COMPLAINT,
          data: {
            data: [],
            total: 0,
            page: queryParams.page || 1
          }
        })
      }

      if (callback) callback([])
    },
    dispatch => dispatch(lazyLoadStart('getHistoryReportComplaint')),
    dispatch => dispatch(lazyLoadEnd('getHistoryReportComplaint'))
  )
}