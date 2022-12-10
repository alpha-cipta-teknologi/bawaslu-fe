import { GET_DATA_CONTENT_HOME } from '../actionTypes'

// ** Initial State
const initialState = {
  content: {
    id: 0,
    header: '',
    title: '',
    seq: 0,
    path_thumbnail: null,
    path_image: null,
    path_video: null,
    link_url: '',
    status: 0,
    description: '',
    created_date: '',
    modified_by: 1,
    modified_date: ''
  }
}

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_CONTENT_HOME:
      return {
        ...state,
        content: action.data
      }
    default:
      return state
  }
}

export default homeReducer
