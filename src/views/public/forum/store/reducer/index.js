// ** Import action types
import {
  GET_DATA_FORUM_ARTICLE
} from '../actionTypes'

// ** Initial State
const initialState = {
  forumList: {
    data: [],
    total: 0
  }
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_FORUM_ARTICLE:
      return {
        ...state,
        forumList: action.data.page === 1
          ? {
            data: action.data.data,
            total: action.data.total
          }
          : {
            data: [...state.forumList.data, ...action.data.data],
            total: action.data.total
          }
      }

    default:
      return state
  }
}

export default reducers
