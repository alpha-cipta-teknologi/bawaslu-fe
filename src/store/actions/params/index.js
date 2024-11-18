import { endpoints } from 'constant'
import { api } from 'utility'

import { lazyLoadEnd, lazyLoadStart } from '../misc'

const updateCategoriesById = data => {
  return data?.sort((a, b) => a.id - b.id)?.map(param => ({
    label: param.param_value,
    value: param.id
  }))
}

export const getComplaintCategories = (callback = null) => {
  const queryParams = { param_key: 'CAT_ADUAN' }

  return api.request(
    endpoints.getParamGlobalDetail,
    queryParams,
    (response, dispatch, success) => {
      if (success) {
        const data = updateCategoriesById(response?.data || [])

        dispatch({
          type: 'GET_COMPLAINT_CATEGORIES',
          data
        })

        if (callback) callback(data)
      } else {
        dispatch({
          type: 'GET_COMPLAINT_CATEGORIES',
          data: []
        })

        if (callback) callback([])
      }
    },
    (response, dispatch) => {
      dispatch({
        type: 'GET_COMPLAINT_CATEGORIES',
        data: []
      })

      if (callback) callback([])
    },
    dispatch => dispatch(lazyLoadStart('getComplaintCategories')),
    dispatch => dispatch(lazyLoadEnd('getComplaintCategories'))
  )
}

export const getReportArticleCategories = (callback = null) => {
  const queryParams = { param_key: 'CAT_LAPORKAN' }

  return api.request(
    endpoints.getParamGlobalDetail,
    queryParams,
    (response, dispatch, success) => {
      if (success) {
        const data = updateCategoriesById(response?.data || [])

        dispatch({
          type: 'GET_REPORT_ARTICLE_CATEGORIES',
          data
        })

        if (callback) callback(data)
      } else {
        dispatch({
          type: 'GET_REPORT_ARTICLE_CATEGORIES',
          data: []
        })

        if (callback) callback([])
      }
    },
    (response, dispatch) => {
      dispatch({
        type: 'GET_REPORT_ARTICLE_CATEGORIES',
        data: []
      })

      if (callback) callback([])
    },
    dispatch => dispatch(lazyLoadStart('getReportArticleCategories')),
    dispatch => dispatch(lazyLoadEnd('getReportArticleCategories'))
  )
}

export const getPengajuanKe = (callback = null) => {
  const queryParams = { key: 'FORM_APPROVAL' }  // Mengganti param_key dengan key yang sesuai

  return api.request(
    endpoints.getPengajuanKe,
    queryParams,
    (response, dispatch, success) => {
      if (success) {
        dispatch({
          type: 'GET_PENGAJUAN_KE',
          data: response.data  // pastikan response data yang digunakan
        })

        if (callback) callback(response.data)
      } else {
        dispatch({
          type: 'GET_PENGAJUAN_KE',
          data: []
        })

        if (callback) callback([])
      }
    },
    (response, dispatch) => {
      dispatch({
        type: 'GET_PENGAJUAN_KE',
        data: []
      })

      if (callback) callback([])
    },
    dispatch => dispatch(lazyLoadStart('getPengajuanKe')),
    dispatch => dispatch(lazyLoadEnd('getPengajuanKe'))
  )
} 