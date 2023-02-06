import { axiosRequest } from './helpers'
import * as toastify from '../toast'

export default {
  request: (
    endpoint,
    body,
    successFunction,
    errorFunction = null,
    preFunction = null,
    postFunction = null
  ) => {
    // ======== Return Function ========
    // dispatch and getState are the return of redux-thunk
    return (dispatch, getState) => {
      const makeRequest = async () => {
        try {
          // ======== Prefunction ========
          if (typeof preFunction === 'function') {
            await preFunction(dispatch)
          }

          const result = await axiosRequest(endpoint, body)

          // ======== Success or Error Handler ========
          if (result.code === 200) {
            // ======== Execute Success dispatch ========
            await successFunction(result, dispatch, result.code === 200, getState)
          } else {
            // ======== Execute THROW_ERROR dispatch ========
            if (typeof errorFunction === 'function') {
              await errorFunction(result, dispatch)
            }

            dispatch({
              type: 'SET_PROGRESS',
              data: -1
            })
          }

          // ======== Postfunction ========
          if (typeof postFunction === 'function') {
            await postFunction(dispatch)
          }

          return true

        } catch (error) {
          if (typeof postFunction === 'function') {
            await postFunction(dispatch)
          }

          toastify.error('Maaf, terjadi kesalahan. Silakan muat ulang halaman beberapa saat lagi')

          dispatch({
            type: 'SET_PROGRESS',
            data: -1
          })

          return false
        }
      }

      return makeRequest()
    }
  }
}
