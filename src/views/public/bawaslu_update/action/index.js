// ** Get data on page or row change
export const getDataBawasluUpdate = (queryParams, callback = null) => {
    return api.request(
      endpoints.getDataBawasluUpdate,
      queryParams,
      (response, dispatch, success) => {
        if (success) {
          const { data: {values, total} } = response

          dispatch({
            type: GET_DATA_BAWASLU_UPDATE,
            data: {
              data: values && values.length ? values : [],
              total
            }
          })

          callback ? callback(values) : null
        }
      },
      null,
      dispatch => dispatch(lazyLoadStart('getDataBawasluUpdate')),
      dispatch => dispatch(lazyLoadEnd('getDataBawasluUpdate'))
    )
}