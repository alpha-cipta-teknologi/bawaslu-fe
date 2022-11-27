const initState = {
  allColumn: {}
}

const tableReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_COLUMNS':
      return {
        ...state,
        allColumn: {
          ...state.allColumn,
          [action.data.fieldName]: action.data.columns?.map(column => {
            return column?.sortable
              ? { ...column, sortDirection: '' }
              : column
          })
        }
      }
    case 'UPDATE_SORT_COLUMN':
      return {
        ...state,
        allColumn: {
          ...state.allColumn,
          [action.data.fieldName]: state.allColumn[action.data.fieldName]?.map(column => {
            return column.selector === action.data.selector
              ? { ...column, sortDirection: action.data.sortDirection }
              : { ...column, sortDirection: '' }
          })
        }
      }

    case 'LOGOUT':
      return initState

    default:
      return state
  }
}

export default tableReducer
