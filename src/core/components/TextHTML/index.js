import React from 'react'
import ReactHtmlParser from 'react-html-parser'

import Text from '../Text'

const TextHTML = ({
  htmlString,
  options,
  revertList = true,
  ...props
}) => {
  return (
    <Text
      type='span'
      className={revertList ? 'html-str' : ''}
      {...props}
    >{ReactHtmlParser(htmlString, options)}</Text>
  )
}

export default TextHTML
