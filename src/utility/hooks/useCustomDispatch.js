import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

const useCustomDispatch = (action, callback = null) => {
  const dispatch = useDispatch()

  return useCallback((param, optParam = null) => dispatch(action(param, optParam, callback)), [dispatch, action, callback])
}

export default useCustomDispatch