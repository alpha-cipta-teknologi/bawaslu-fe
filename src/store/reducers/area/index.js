const initState = {
  allProvinces: [],
  allRegencies: [],
  dataRegencies: []
}

const areaReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_DATA_PROVINCES':
      return {
        ...state,
        allProvinces: action.data
      }

    case 'GET_DATA_REGENCIES':
      return {
        ...state,
        allRegencies: action.data
      }

    case 'GET_DATA_REGENCIES_BY_PROVINCE':
      return {
        ...state,
        dataRegencies: action.data
      }

    case 'LOGOUT':
      return initState

    default:
      return state
  }
}

export default areaReducer
