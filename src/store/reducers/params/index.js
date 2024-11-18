const initState = {
  complaintCategories: [],
  reportArticleCategories: [],
  pengajuanKe: []  // Tambahkan properti baru untuk menyimpan data pengajuan
}

const paramsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_COMPLAINT_CATEGORIES':
      return {
        ...state,
        complaintCategories: action.data
      }

    case 'GET_REPORT_ARTICLE_CATEGORIES':
      return {
        ...state,
        reportArticleCategories: action.data
      }

    case 'GET_PENGAJUAN_KE':
      // Memproses data agar dipisahkan berdasarkan "|"
      const pengajuanKeData = action.data.param_value.split('|').map((value, index) => {
        return {
          id: value,  // id dari param_value
          name: action.data.param_desc.split('|')[index] // name dari param_desc
        }
      })

      return {
        ...state,
        pengajuanKe: pengajuanKeData  // Menyimpan data yang sudah diproses ke dalam state
      }

    case 'LOGOUT':
      return initState

    default:
      return state
  }
}

export default paramsReducer
