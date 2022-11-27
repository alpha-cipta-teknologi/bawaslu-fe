import React, { useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { actions } from 'store'
import { hooks } from 'utility'

const HistoryWrapper = ({ history, children }) => {
  const setBrowserBackStack = hooks.useCustomDispatch(actions.navigations.setBrowserBackStack)

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      setBrowserBackStack({ action, location })

      window.scrollTo(0, 0)
    })

    return () => {
      unlisten()
    }
  }, [])

  return <Fragment>{ children }</Fragment>
}

export default withRouter(HistoryWrapper)