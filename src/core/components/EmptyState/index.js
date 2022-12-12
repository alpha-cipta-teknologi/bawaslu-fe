import React from 'react'

import Text from '../Text'
import CustomIcon from '../CustomIcon'

const EmptyState = ({
  title,
  subtitle,
  children
}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-10 mb-20'>
      <CustomIcon iconName='empty_data' className='w-[100px] h-[100px]' />

      {title && (
        <div className='mt-5 mb-3.5'>
          <Text weight='font-extrabold' align='text-center'>{title}</Text>
        </div>
      )}

      {subtitle && (
        <Text
          size='text-sm'
          align='text-center'
          color='text-grey-base'
        >{subtitle}</Text>
      )}

      {children}
    </div>
  )
}

export default EmptyState
