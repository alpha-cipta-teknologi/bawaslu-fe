const initState = {
  allCommunities: []
}

const communityReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_COMMUNITY':
      return {
        ...state,
        allCommunities: action.data
      }

    case 'LOGOUT':
      return initState

    default:
      return state
  }
}

export default communityReducer
