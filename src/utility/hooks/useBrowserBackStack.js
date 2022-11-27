import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const useBrowserBackStack = () => {
  const history = useHistory()

  const [backStack, setBackStack] = useState([])

  useEffect(() => {
    history.listen((location, action) => {
      const getBackStackArr = () => {
        switch (action) {
          // case 'POP':
          //   return backStack.slice(0, backStack.length - 1)
          case 'PUSH':
            return [...backStack, location]
          case 'REPLACE':
            return [...backStack.slice(0, backStack.length - 1), location]
          default:
            return backStack
        }
      }

      setBackStack(getBackStackArr())
    })
  }, [setBackStack, history])

  return backStack
}

export default useBrowserBackStack