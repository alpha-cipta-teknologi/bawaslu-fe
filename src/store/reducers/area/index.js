const initState = {
  allProvinces: [],
  allRegencies: [],
  dataRegencies: {
    total: 0,
    values: []
  }
}

const areaReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_DATA_PROVINCES':
      return {
        ...state,
        dataProvinces: action.data
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
