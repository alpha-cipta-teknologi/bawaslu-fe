// ** Import action types
import {
    GET_DATA_GALLERY
  } from '../actionTypes'
  
  // ** Initial State
  const initialState = {
    galleryList: {
      data: [],
      total: 0
    }
  }
  
  const reducers = (state = initialState, action) => {
    switch (action.type) {
      case GET_DATA_GALLERY:
        return {
          ...state,
          galleryList: action.data
        }
  
      default:
        return state
    }
  }
  
  export default reducers
  