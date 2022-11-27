import {
  useState,
  useCallback,
  useEffect,
  useRef
} from 'react'

const useStateCallback = (initialState) => {
  const [state, setState] = useState(initialState)
  const cbRef = useRef(null)

  const setStateCallback = useCallback((state, cb) => {
    cbRef.current = cb // store passed callback to ref
    setState(state)
  }, [])

  useEffect(() => {
    // cb.current is `null` on initial render, so only execute cb on state *updates*
    if (cbRef.current) {
      cbRef.current(state)
      cbRef.current = null
    }
  }, [state])

  return [state, setStateCallback]
}

export default useStateCallback
