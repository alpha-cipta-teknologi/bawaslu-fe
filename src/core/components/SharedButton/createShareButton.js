import React, { forwardRef } from 'react'

import SocialShareButton from './SocialShareButton'

const createShareButton = (
  networkName,
  link,
  optsMap,
  defaultProps
) => {
  const CreatedButton = (props, ref) => {
    const opts = optsMap(props)
    const passedProps = { ...props }

    const optsKeys = Object.keys(opts)
    optsKeys.forEach((key) => {
      delete passedProps[key]
    })

    return (
      <SocialShareButton
        {...defaultProps}
        {...passedProps}
        forwardedRef={ref}
        networkName={networkName}
        networkLink={link}
        opts={optsMap(props)}
      />
    )
  }

  CreatedButton.displayName = `ShareButton-${networkName}`

  return forwardRef(CreatedButton)
}

export default createShareButton