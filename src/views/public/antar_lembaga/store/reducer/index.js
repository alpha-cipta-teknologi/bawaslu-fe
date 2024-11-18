// ** Import action types
import {
  GET_BENTUK_KERJASAMA, GET_DOC_MOU
} from '../actionTypes'

// ** Initial State
const initialState = {
  listKerjasama: {
    data: [],
    total: 0
  },
  data: [],
  total: 0
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_BENTUK_KERJASAMA:
      return {
        ...state,
        listKerjasama: action.data
      }

    case GET_DOC_MOU:
      return {
        ...state,
        data: action.data.data,  // Menyimpan data
        total: action.data.total // Menyimpan total
      }

    default:
      return state
  }
}

export default reducers
