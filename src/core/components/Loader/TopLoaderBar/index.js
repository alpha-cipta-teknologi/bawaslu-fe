import React, { useEffect, useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'
import PropTypes from 'prop-types'

const TopLoaderBar = ({
  progress,
  onLoaderFinished
}) => {
  const refLoadingBar = useRef(null)

  useEffect(() => {
    if (progress === 0) {
      if (refLoadingBar.current) {
        refLoadingBar.current.continuousStart(0, 1000)
      }
    } else if (progress === 100) {
      if (refLoadingBar.current) {
        refLoadingBar.current.complete()
      }
    }
  }, [progress])

  return (
    <LoadingBar
      ref={refLoadingBar}
      color='#365F8C'
      height={3}
      onLoaderFinished={onLoaderFinished}
    />
  )
}

TopLoaderBar.propTypes = {
  progress: PropTypes.number,
  onLoaderFinished: PropTypes.func
}

export default TopLoaderBar