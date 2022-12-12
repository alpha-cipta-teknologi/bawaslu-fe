import axios from 'axios'
import axiosInstance from './axios'

export const convertToFormData = (requestBody) => {
  const formData = new FormData()

  Object.keys(requestBody).forEach(key => {
    formData.append(key, requestBody[key])
  })

  return formData
}

export const axiosRequest = async (endpoint, body) => {
  const url = endpoint.path
  const method = endpoint.method
  const isFormData = endpoint.type === 'form-data'
  const contentType = isFormData ? 'multipart/form-data' : 'application/json; charset=utf-8'
  const headers = {
    Accept: 'application/json',
    'Content-Type': contentType
  }
  const requestBody = isFormData ? convertToFormData(body) : body

  try {
    const response = await axiosInstance.request({
      url,
      method,
      headers,
      data: (method !== 'GET' && requestBody) || undefined,
      params: (method === 'GET' && requestBody)
    })

    const result = await response.data

    // console.log('==== RESULT ====', result)

    const data = await {
      code: response.status,
      stat_code: result?.stat_code || response.status,
      stat_msg: result?.stat_msg || '',
      data: result?.data || [],
      pagination: result?.pagination || {}
    }

    return data
  } catch (error) {
    // Axios has a property isAxiosError that is used to detect types
    if (axios.isAxiosError(error)) {
      // Access to config, request, and response
      if (error.response) {
        // Request made and server responded
        const result = await error.response?.data

        console.log('==== ERR ====', result)

        const dataError = {
          code: error.response.status,
          stat_code: result?.stat_code,
          stat_msg: result?.stat_msg,
          data: result?.data || [],
          pagination: result?.pagination
        }

        return dataError
      } else {
        /**
         * The request was made but no response was received
         * OR
         * Something happened in setting up the request that triggered an Error
         */
        throw error
      }
    } else {
      // Just a stock error
      throw error
    }
  }
}

export const requestDownloadFile = async (endpoint, body, name = '') => {
  const url = endpoint.path
  const method = endpoint.method

  try {
    const response = await axiosInstance.request({
      url,
      method,
      data: (method !== 'GET' && body) || null,
      params: (method === 'GET' && body),
      responseType: 'blob' // important
    })

    const blob = await new Blob([response.data], { type: response.data.type })
    const objectUrl = await window.URL.createObjectURL(blob)

    const link = await document.createElement('a')
    link.href = await objectUrl

    const fileName = `${name ? name : Date.now()}.xlsx`

    await link.setAttribute('download', fileName)
    await document.body.appendChild(link)
    await link.click()

    link.remove()
    window.URL.revokeObjectURL(url)

    return response
  } catch (error) {
    console.log(error)

    throw error
  }
}