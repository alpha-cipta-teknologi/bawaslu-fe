import { endpoints } from 'constant'
import { api } from 'utility'

import { lazyLoadEnd, lazyLoadStart } from '../misc'

export const getDataProvinces = (callback = null) => {
  return api.request(
    endpoints.getDataProvinces,
    null,
    (response, dispatch, success) => {
      if (success) {
        const data = response.data?.map((province) => ({
          label: province.name,
          value: `${province.id}`
        }))

        dispatch({
          type: 'GET_DATA_PROVINCES',
          data
        })

        if (callback) callback(data)
      }
    },
    (response, dispatch) => {
      dispatch({
        type: 'GET_DATA_PROVINCES',
        data: []
      })

      if (callback) callback([])
    },
    dispatch => dispatch(lazyLoadStart('getDataProvinces')),
    dispatch => dispatch(lazyLoadEnd('getDataProvinces'))
  )
}

export const getDataRegencies = (queryParams, callback = null) => {
  return api.request(
    endpoints.getDataRegencies,
    queryParams,
    (response, dispatch, success) => {
      if (success) {
        const data = response?.data?.values?.map(regency => ({
          label: regency.name,
          value: `${regency.id}`
        })) || []

        dispatch({
          type: 'GET_DATA_REGENCIES',
          data
        })

        if (callback) callback(data)
      }
    },
    (response, dispatch) => {
      dispatch({
        type: 'GET_DATA_REGENCIES',
        data: []
      })

      if (callback) callback([])
    },
    dispatch => dispatch(lazyLoadStart('getDataRegencies')),
    dispatch => dispatch(lazyLoadEnd('getDataRegencies'))
  )
}

export const getDataRegenciesByProvince = (provinceId, callback = null) => {
  return api.request(
    endpoints.getDataRegenciesByProvince(provinceId),
    null,
    (response, dispatch, success) => {
      if (success) {
        const data = response.data?.map((regency) => ({
          label: regency.name,
          value: `${regency.id}`
        }))

        dispatch({
          type: 'GET_DATA_REGENCIES_BY_PROVINCE',
          data
        })

        if (callback) callback(data)
      }
    },
    (response, dispatch) => {
      dispatch({
        type: 'GET_DATA_REGENCIES_BY_PROVINCE',
        data: []
      })

      if (callback) callback([])
    },
    dispatch => dispatch(lazyLoadStart('getDataRegenciesByProvince')),
    dispatch => dispatch(lazyLoadEnd('getDataRegenciesByProvince'))
  )
}