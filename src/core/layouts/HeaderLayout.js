import React from 'react'

import { Header } from 'core/components'

const HeaderLayout = ({ children }) => {
  return (
    <>
      <Header />

      {children}
    </>
  )
}

export default HeaderLayout
