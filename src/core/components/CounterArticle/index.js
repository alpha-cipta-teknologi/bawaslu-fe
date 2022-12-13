import React from 'react'

import Text from '../Text'

const CounterArticle = ({
  text,
  renderIcon,
  onClick
}) => {
  return (
    <div className='flex flex-row items-center gap-x-1.5' onClick={onClick}>
      {renderIcon()}
      <Text size='text-xs' weight='font-medium' cursor={onClick ? 'cursor-pointer' : ''}>{text}</Text>
    </div>
  )
}

export default CounterArticle