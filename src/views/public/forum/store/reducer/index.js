// ** Import action types
import {
  GET_DATA_COMMENT_FORUM_ARTICLE,
  GET_DATA_FORUM_ARTICLE,
  UPDATE_COUNTER
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

    case GET_DATA_COMMENT_FORUM_ARTICLE:
      return {
        ...state,
        forumList: {
          ...state.forumList,
          data: state.forumList.data.map(d => {
            if (d.id === action.data.id) {
              return {
                ...d,
                comment: action.data.data
              }
            }

            return {
              ...d,
              comment: {
                total: 0,
                values: []
              }
            }
          })
        }
      }

    case UPDATE_COUNTER:
      return {
        ...state,
        forumList: {
          ...state.forumList,
          data: state.forumList.data.map(d => {
            if (action.data.type === 'like') {
              if (d.id === action.data.id) {
                return {
                  ...d,
                  like: !d.like,
                  counter_like: !!d.like ? d.counter_like - 1 : d.counter_like + 1
                }
                // if (d.like) {
                //   d.like = false
                //   d.counter_like = d.counter_like - 1
                // } else {
                //   d.like = true
                //   d.counter_like = d.counter_like + 1
                // }

              }
            } else if (action.data.type === 'comment') {
              if (d.id === action.data.id) {
                return {
                  ...d,
                  counter_comment: d.counter_comment + 1
                }
                // d.counter_comment = d.counter_comment + 1
              }
            }

            return d
          })
        }
      }

    default:
      return state
  }
}

export default reducers
