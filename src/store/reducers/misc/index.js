const initState = {
  loading: {
    isLoading: false,
    loadingMsg: ''
  },
  lazyLoad: {},
  progress: -1
}

const miscReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: {
          isLoading: action.data.isLoading,
          loadingMsg: action.data.loadingMsg
        }
      }

    case 'LAZY_LOAD':
      return {
        ...state,
        lazyLoad: {
          ...state.lazyLoad,
          [action.data.fieldName]: action.data.isLoading
        }
      }

    case 'SET_PROGRESS':
      return {
        ...state,
        progress: action.data
      }

    case 'LOGOUT':
      return initState

    default:
      return state
  }
}

export default miscReducer
