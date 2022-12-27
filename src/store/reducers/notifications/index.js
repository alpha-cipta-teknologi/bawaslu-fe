const initState = {
  dataNotifications: {
    total: 0,
    values: []
  }
}

const notifReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_DATA_NOTIFICATION':
      return {
        ...state,
        dataNotifications: action.data.page === 1
          ? {
            total: action.data.total || 0,
            values: action.data.values || []
          }
          : {
            total: action.data.total || 0,
            values: [...state.dataNotifications.values, ...(action.data.values || [])]
          }
      }

    case 'LOGOUT':
      return initState

    default:
      return state
  }
}

export default notifReducer
