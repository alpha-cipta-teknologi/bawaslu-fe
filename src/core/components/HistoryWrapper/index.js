import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const HistoryWrapper = ({ history, children }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })

    return () => {
      unlisten()
    }
  }, [])

  return <>{children}</>
}

export default withRouter(HistoryWrapper)