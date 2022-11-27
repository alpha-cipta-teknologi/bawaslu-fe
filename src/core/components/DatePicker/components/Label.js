import React from 'react'

import Text from '../../Text'

const Label = ({
  focus,
  label,
  labelSize
}) => {
  return (
    <Text
      size={ labelSize }
      color={ focus ? 'text-drcGreen' : 'text-drcBlack-2' }
      weight={ focus ? 'font-medium' : 'font-normal' }
    >{ label }</Text>
  )
}

export default Label