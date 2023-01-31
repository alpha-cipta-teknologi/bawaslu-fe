const initState = {
  complaintCategories: [],
  reportArticleCategories: []
}

const paramsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_COMPLAINT_CATEGORIES':
      return {
        ...state,
        complaintCategories: action.data
      }

    case 'GET_REPORT_ARTICLE_CATEGORIES':
      return {
        ...state,
        reportArticleCategories: action.data
      }

    case 'LOGOUT':
      return initState

    default:
      return state
  }
}

export default paramsReducer
