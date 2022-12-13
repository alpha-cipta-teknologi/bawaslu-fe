// ** Import action types
import { UPDATE_COUNTER } from 'views/public/forum/store/actionTypes'
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
        bawasluList: action.data.page === 1
          ? {
            data: action.data.data,
            total: action.data.total
          }
          : {
            data: [...state.bawasluList.data, ...action.data.data],
            total: action.data.total
          }
      }

    case GET_BAWASLU_UPDATE_DETAIL:
      return {
        ...state,
        bawasluDetail: action.data
      }

    case UPDATE_COUNTER:
      const isUpdateCounter = state.bawasluDetail.id === action.data.id && action.data.reducer === 'bawasluupdates'
      const isUpdateLike = action.data.type === 'like' && isUpdateCounter

      return {
        ...state,
        bawasluDetail: {
          ...state.bawasluDetail,
          like: isUpdateLike
            ? !state.bawasluDetail.like
            : state.bawasluDetail.like,
          counter_like: isUpdateLike
            ? !!state.bawasluDetail.like ? state.bawasluDetail.counter_like - 1 : state.bawasluDetail.counter_like + 1
            : state.bawasluDetail.counter_like,
          counter_comment: action.data.type === 'comment' && isUpdateCounter
            ? state.bawasluDetail.counter_comment + 1
            : state.bawasluDetail.counter_comment
        }
      }

    default:
      return state
  }
}

export default reducers
