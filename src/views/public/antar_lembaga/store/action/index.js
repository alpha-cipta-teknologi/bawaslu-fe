import { endpoints } from 'constant'
import { api } from 'utility'
import { lazyLoadEnd, lazyLoadStart } from 'store/actions/misc'
import { GET_BENTUK_KERJASAMA } from '../actionTypes'

export const formCollaboration = (data, callback = null) => {
    return api.request(
        endpoints.formCollaboration,
        data, // Langsung kirim data FormData tanpa JSON.stringify
        (response, dispatch, success) => {
            if (callback) callback(success)
        },
        () => {
            if (callback) callback(false)
        },
        dispatch => dispatch(lazyLoadStart('formCollaboration')),
        dispatch => dispatch(lazyLoadEnd('formCollaboration'))
    )
}

export const formAudience = (data, callback = null) => {
    return api.request(
        endpoints.formAudience,
        data,
        (response, dispatch, success) => {
            if (callback) callback(success)
        },
        () => {
            if (callback) callback(false)
        },
        dispatch => dispatch(lazyLoadStart('formAudience')),
        dispatch => dispatch(lazyLoadEnd('formAudience'))
    )
}

export const lacakPengajuan = (data, callback = null) => {
    return api.request(
        endpoints.lacakPengajuan,
        data,
        (response, dispatch, success) => {
            if (callback) callback(success, response)  // Tambahkan response ke callback
        },
        () => {
            if (callback) callback(false, null)  // Tambahkan nilai null untuk response ketika gagal
        },
        dispatch => dispatch(lazyLoadStart('lacakPengajuan')),
        dispatch => dispatch(lazyLoadEnd('lacakPengajuan'))
    )
}

export const getBentukKerjasama = (queryParams, callback = null) => {
    return api.request(
        endpoints.getBentukKerjasama,
        queryParams,
        (response, dispatch, success) => {
            console.log('Response dari getBentukKerjasama:', response)
            if (success) {
                const { data, pagination } = response
                const total = data.length

                dispatch({
                    type: GET_BENTUK_KERJASAMA,
                    data: {
                        data, // Shorthand
                        total // Shorthand
                    }
                })

                if (callback) callback(data)
            }
        },
        null,
        dispatch => dispatch(lazyLoadStart('getBentukKerjasama')),
        dispatch => dispatch(lazyLoadEnd('getBentukKerjasama'))
    )
}

