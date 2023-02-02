import { useEffect, useState } from 'react'

const useIsTruncated = (element) => {
  const determineIsTruncated = () => {
    if (!element.current) return false

    return element.current.scrollHeight > element.current.clientHeight
  }

  const [isTruncated, setIsTruncated] = useState(determineIsTruncated())

  const resizeListener = () => setIsTruncated(determineIsTruncated())

  useEffect(() => {
    if (element?.current) {
      resizeListener()
    }
  }, [element?.current])

  useEffect(() => {
    window.addEventListener('resize', resizeListener)

    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return isTruncated
}

export default useIsTruncated