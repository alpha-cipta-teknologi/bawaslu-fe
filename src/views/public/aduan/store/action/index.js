import { endpoints } from 'constant'
import { api } from 'utility'
import { lazyLoadEnd, lazyLoadStart } from 'store/actions/misc'

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