import { toastify } from 'utility'
import { requestDownloadFile } from 'utility/api/helpers'

export const loadingStart = (loadingMsg) => {
  return {
    type: 'LOADING',
    data: {
      isLoading: true,
      loadingMsg
    }
  }
}

export const loadingEnd = (loadingMsg) => {
  return {
    type: 'LOADING',
    data: {
      isLoading: false,
      loadingMsg
    }
  }
}

export const setProgress = (type) => {
  let data = -1
  switch (type) {
    case 'start':
      data = 0
      break
    case 'end':
      data = 100
      break
    case 'reset':
    default:
      data = -1
  }

  return {
    type: 'SET_PROGRESS',
    data
  }
}

export const lazyLoadStart = (fieldName) => {
  return {
    type: 'LAZY_LOAD',
    data: {
      fieldName,
      isLoading: true
    }
  }
}

export const lazyLoadEnd = (fieldName) => {
  return {
    type: 'LAZY_LOAD',
    data: {
      fieldName,
      isLoading: false
    }
  }
}

export const startLoading = (loadingMsg) => {
  return dispatch => {
    dispatch(loadingStart(loadingMsg))
  }
}

export const stopLoading = (loadingMsg) => {
  return dispatch => {
    dispatch(loadingEnd(loadingMsg))
  }
}

export const startLazyLoading = (fieldName) => {
  return dispatch => {
    dispatch(lazyLoadStart(fieldName))
  }
}

export const stopLazyLoading = (fieldName) => {
  return dispatch => {
    dispatch(lazyLoadEnd(fieldName))
  }
}

export const setProgressBar = (type) => {
  return dispatch => {
    dispatch(setProgress(type))
  }
}

export const downloadExcelFile = ({
  endpoint,
  body,
  fileName,
  key
}) => {
  return (dispatch) => {
    const makeRequestDownloadExcel = async () => {
      dispatch(lazyLoadStart(`downloadExcelFile_${ key }`))

      try {
        const response = await requestDownloadFile(endpoint, body, fileName)

        if (response && response.status === 200) {
          toastify.success('Unduh file berhasil')
        } else {
          toastify.error('Terjadi kesalahan dalam mengunduh file')
        }
      } catch (error) {
        toastify.error('Terjadi kesalahan dalam mengunduh file')
      } finally {
        dispatch(lazyLoadEnd(`downloadExcelFile_${ key }`))
      }
    }

    return makeRequestDownloadExcel()
  }
}