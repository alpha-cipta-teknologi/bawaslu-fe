// **  Initial State
const initialState = {
  userData: {},
  profile: {}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userData: action.data,
        [action.config.storageTokenKeyName]: action[action.config.storageTokenKeyName],
        [action.config.storageRefreshTokenKeyName]: action[action.config.storageRefreshTokenKeyName]
      }
    case 'REFRESH_TOKEN':
      return {
        ...state,
        [action.config.storageTokenKeyName]: action[action.config.storageTokenKeyName],
        [action.config.storageRefreshTokenKeyName]: action[action.config.storageRefreshTokenKeyName]
      }
    case 'GET_PROFILE':
      return {
        ...state,
        profile: action.data
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export default authReducer
