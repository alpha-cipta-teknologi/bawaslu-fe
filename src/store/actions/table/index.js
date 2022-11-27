export const handleSetColumns = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_COLUMNS',
      data: {
        fieldName: payload.fieldName,
        columns: payload.columns
      }
    })
  }
}

export const onUpdateSortColumn = (payload) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_SORT_COLUMN',
      data: {
        fieldName: payload.fieldName,
        selector: payload.selector,
        sortDirection: payload.sortDirection
      }
    })
  }
}
