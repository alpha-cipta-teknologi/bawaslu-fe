// ** Import action types
import {
  GET_DATA_COMMENT_FORUM_ARTICLE,
  GET_DATA_TRENDING_FORUM_ARTICLE,
  GET_DATA_FORUM_ARTICLE,
  GET_DATA_FORUM_ARTICLE_DETAIL,
  UPDATE_COUNTER
} from '../actionTypes'

const handleCounter = (action, d) => {
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

// ** Initial State
const initialState = {
  forumList: {
    data: [],
    total: 0
  },
  trendingForumList: [],
  forumDetail: {
    id: 0,
    category_name: '',
    title: '',
    slug: '',
    description: '',
    path_thumbnail: null,
    path_image: null,
    status: 0,
    counter_view: 0,
    counter_share: 0,
    counter_like: 0,
    counter_comment: 0,
    created_by: 0,
    created_date: '',
    modified_by: null,
    modified_date: null,
    author: {
      username: '',
      full_name: '',
      image_foto: ''
    },
    like: false,
    comment: {
      values: [],
      total: 0
    }
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
                comment: action.data.page === 1
                  ? {
                    values: action.data.values,
                    total: action.data.total
                  }
                  : {
                    values: [...state.forumDetail.comment?.values, ...action.data.values],
                    total: action.data.total
                  }
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
        },
        forumDetail: action.data.id === state.forumDetail.id
          ? {
            ...state.forumDetail,
            comment: action.data.page === 1
              ? {
                values: action.data.values,
                total: action.data.total
              }
              : {
                values: [...state.forumDetail.comment?.values, ...action.data.values],
                total: action.data.total
              }
          }
          : state.forumDetail
      }

    case GET_DATA_TRENDING_FORUM_ARTICLE:
      return {
        ...state,
        trendingForumList: action.data
      }

    case GET_DATA_FORUM_ARTICLE_DETAIL:
      return {
        ...state,
        forumDetail: action.data
      }

    case UPDATE_COUNTER:
      return {
        ...state,
        forumList: {
          ...state.forumList,
          data: state.forumList.data.map(d => {
            if (action.data.reducer === 'forums' && d.id === action.data.id) {
              return handleCounter(action, d)
            }

            return d
          })
        },
        forumDetail: action.data.id === state.forumDetail.id
          ? handleCounter(action, state.forumDetail)
          : state.forumDetail
      }

    default:
      return state
  }
}

export default reducers
