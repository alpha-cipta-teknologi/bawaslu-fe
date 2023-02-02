import { GET_HISTORY_REPORT_COMPLAINT } from '../actionTypes'

// ** Initial State
const initialState = {
  historyComplaintList: {
    data: [],
    total: 0
  }
}

const complaintReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HISTORY_REPORT_COMPLAINT:
      return {
        ...state,
        historyComplaintList: action.data.page === 1
          ? {
            data: action.data.data,
            total: action.data.total
          }
          : {
            data: [...state.historyComplaintList.data, ...action.data.data],
            total: action.data.total
          }
      }
    default:
      return state
  }
}

export default complaintReducer
