import { GET_DATA_FACT_CHECK } from '../actionTypes'

// ** Initial State
const initialState = {
  factCheckList: {
    data: [],
    total: 0
  }
}

const factCheckReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_FACT_CHECK:
      return {
        ...state,
        factCheckList: action.data.page === 1
          ? {
            data: action.data.data,
            total: action.data.total
          }
          : {
            data: [...state.factCheckList.data, ...action.data.data],
            total: action.data.total
          }
      }
    default:
      return state
  }
}

export default factCheckReducer
