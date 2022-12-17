// ** Import action types
import {
  GET_DATA_COMMENT_FORUM_ARTICLE,
  GET_DATA_TRENDING_FORUM_ARTICLE,
  GET_DATA_FORUM_ARTICLE,
  UPDATE_COUNTER
} from '../actionTypes'

// ** Initial State
const initialState = {
  forumList: {
    data: [],
    total: 0
  },
  trendingForumList: []
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

    case GET_DATA_TRENDING_FORUM_ARTICLE:
      return {
        ...state,
        trendingForumList: action.data
      }

    case UPDATE_COUNTER:
      return {
        ...state,
        forumList: {
          ...state.forumList,
          data: state.forumList.data.map(d => {
            if (action.data.reducer === 'forums' && d.id === action.data.id) {
              if (action.data.type === 'like') {
                return {
                  ...d,
                  like: !d.like,
                  counter_like: !!d.like ? d.counter_like - 1 : d.counter_like + 1
                }
              } else if (action.data.type === 'comment') {
                return {
                  ...d,
                  counter_comment: action.data.actionType === 'remove'
                    ? d.counter_comment - 1
                    : d.counter_comment + 1
                }
              } else if (action.data.type === 'view') {
                return {
                  ...d,
                  counter_view: d.counter_view + 1
                }
              } else if (action.data.type === 'share') {
                return {
                  ...d,
                  counter_share: d.counter_share + 1
                }
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
