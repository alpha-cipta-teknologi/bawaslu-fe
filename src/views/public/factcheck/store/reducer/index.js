import { GET_DATA_FACT_CHECK } from '../actionTypes'

// ** Initial State
const initialState = {
  data: [],
  total: 0
}

const factCheckReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_FACT_CHECK:
      return {
        ...state,
        data: action.data.data || [], // Memastikan struktur yang benar
        total: action.data.total || 0
      }
    default:
      return state
  }
}

export default factCheckReducer

