// ** Import action types
import {
    GET_DATA_BAWASLU_UPDATE,
    GET_BAWASLU_UPDATE_DETAIL
  } from '../actionTypes'
  
  // ** Initial State
  const initialState = {
    bawasluList: {
      data: [],
      total: 0
    },
    bawasluDetail: {
      id: 3,
      category_name: '',
      title: '',
      slug: '',
      description: '',
      path_thumbnail: '',
      path_image: '',
      status: 0,
      counter_view: 0,
      counter_share: 0,
      counter_like: 0,
      counter_comment: 0,
      created_by: 0,
      created_date: '',
      modified_by: '',
      modified_date: '',
      author: {
        username: '',
        full_name: '',
        image_foto: ''
      },
      like: false
    }  
  }
  
  const reducers = (state = initialState, action) => {
    switch (action.type) {
      case GET_DATA_BAWASLU_UPDATE:
        return {
          ...state,
          bawasluList: action.data
        }
      case GET_BAWASLU_UPDATE_DETAIL:
        return {
          ...state,
          bawasluDetail: action.data
        }
  
      default:
        return state
    }
  }
  
  export default reducers
  