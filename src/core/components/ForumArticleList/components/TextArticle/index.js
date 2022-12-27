import React from 'react'
import { convertNodeToElement } from 'react-html-parser'
import _truncate from 'lodash/truncate'

import Text from '../../../Text'
import TextHTML from '../../../TextHTML'

const TextArticle = ({
  text,
  length = 300,
  isTruncate,
  onClickShowMore
}) => {
  const transformArticle = (node, nodeIdx) => {
    if (node.type === 'tag' && (['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.name))) {
      if (node.attribs?.style) {
        node.attribs.style = `${node.attribs?.style || ''}; font-family: "Montserrat" !important;`
      }
    }

    if (node.type === 'tag' && node.name === 'p' && nodeIdx === 0) {
      return (
        <Text
          key={nodeIdx}
          type='span'
          size='text-sm'
        >
          {node.children.map((child, childIdx) => {
            if (child.attribs?.style) {
              child.attribs.style = `${child.attribs?.style || ''}; font-family: "Montserrat" !important;`
            }

            return convertNodeToElement(child, childIdx, transformArticle)
          })}
        </Text>
      )
    }
  }

  return (
    <span>
      <TextHTML
        htmlString={isTruncate ? _truncate(text || '', { length }) : text}
        size='text-sm'
        options={{ transform: transformArticle }}
      />{' '}

      {isTruncate && (
        <Text
          type='span'
          size='text-sm'
          color='text-primary'
          underlineOnHover
          onClick={onClickShowMore}
        >(lanjut)</Text>
      )}
    </span>
  )
}

export default TextArticle