import { endpoints } from 'constant'
import { api, toastify } from 'utility'
import { lazyLoadEnd, lazyLoadStart } from 'store/actions/misc'
import axios from 'axios'
import { GET_BENTUK_KERJASAMA, GET_DOC_MOU } from '../actionTypes'

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

export const getDocMou = (queryParams, callback = null) => {
    return api.request(
        endpoints.getDocMou,
        queryParams,
        (response, dispatch, success) => {
            console.log('Response dari getDocMou:', response)
            if (success && response?.data) {
                // Akses data.values yang ada di dalam response.data
                const { values, pagination } = response.data
                const total = response.data.total || values.length  // Mengambil total langsung dari response.data.total

                dispatch({
                    type: GET_DOC_MOU,
                    data: {
                        data: values,  // Menyimpan values sebagai data hasil
                        total          // Menyimpan total data
                    }
                })
                console.log(total)

                // Panggil callback dengan values dan total
                if (callback) callback(values, total)
            } else {
                // Tangani kondisi ketika response gagal atau data kosong
                dispatch({
                    type: GET_DOC_MOU,
                    data: {
                        data: [],
                        total: 0
                    }
                })

                // Panggil callback dengan data kosong dan total 0
                if (callback) callback([], 0)
            }
        },
        (error) => {
            // Penanganan error jika request gagal
            console.error('Error saat mengambil data MOU:', error)
            dispatch({
                type: GET_DOC_MOU,
                data: {
                    data: [],
                    total: 0
                }
            })
            toast.error('Terjadi kesalahan saat mengambil data. Coba lagi nanti.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true
            })

            // Panggil callback dengan data kosong dan total 0 jika error
            if (callback) callback([], 0)
        },
        dispatch => dispatch(lazyLoadStart('getDocMou')), // Menandakan loading dimulai
        dispatch => dispatch(lazyLoadEnd('getDocMou')) // Menandakan loading selesai
    )
}

export const getProvince = (cb = null) => {
    return (dispatch, getState) => {

        axios
            .get(`${process.env.REACT_APP_BASE_URL}/area/province`)
            .then(response => {

                const { data } = response

                if (cb) {
                    cb(data)
                }
            })
    }
}

// ** Add get regency
export const getRegency = (provinceid, cb = null) => {
    return (dispatch, getState) => {

        axios
            .get(`${process.env.REACT_APP_BASE_URL}/area/regency/${provinceid}`)
            .then(response => {

                const { data } = response

                if (cb) {
                    cb(data)
                }
            })
    }
}
