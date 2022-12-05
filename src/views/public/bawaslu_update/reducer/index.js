// ** Import action types
import {
    GET_DATA_BAWASLU_UPDATE
  } from '../actionTypes'
  
  // ** Initial State
  const initialState = {
    bawasluList: {
      data: [],
      total: 0
    }
  }
  
  const reducers = (state = initialState, action) => {
    switch (action.type) {
      case GET_DATA_BAWASLU_UPDATE:
        return {
          ...state,
          bawasluList: action.data
        }
  
      default:
        return state
    }
  }
  
  export default reducers
  