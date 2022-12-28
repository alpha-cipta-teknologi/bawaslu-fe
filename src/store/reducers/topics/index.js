const initState = {
  allTopics: []
}

const communityReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_TOPIC':
      return {
        ...state,
        allTopics: action.data
      }

    case 'LOGOUT':
      return initState

    default:
      return state
  }
}

export default communityReducer
