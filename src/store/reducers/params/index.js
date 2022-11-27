// **  Initial State
const initialState = {
  restrictLevel: []
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RESTRICT_LEVEL':
      return {
        ...state,
        restrictLevel: action.data
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export default authReducer
