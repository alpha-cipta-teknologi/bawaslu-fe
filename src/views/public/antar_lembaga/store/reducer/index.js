// ** Import action types
import {
    GET_BENTUK_KERJASAMA
  } from '../actionTypes'
  
  // ** Initial State
  const initialState = {
    listKerjasama: {
      data: [],
      total: 0
    }
  }
  
  const reducers = (state = initialState, action) => {
    switch (action.type) {
      case GET_BENTUK_KERJASAMA:
        return {
          ...state,
          listKerjasama: action.data
        }
  
      default:
        return state
    }
  }
  
  export default reducers
  