import React from 'react'
import PropTypes from 'prop-types'
import { CircleStackIcon } from '@heroicons/react/24/outline'

import { styleHelper } from 'utility'

import Text from '../Text'

const EmptyState = ({
  image,
  title = 'No Data',
  text,
  className = 'mt-10'
}) => {
  return (
    <div className={styleHelper.classNames('flex-col center-content', className)}>
      {image
        ? image
        : <CircleStackIcon className='mx-auto h-12 w-12 text-gray-300' />}
      <div className='mt-5 gap-y-2 flex-col center-content'>
        <Text
          size='text-sm sm:text-base md:text-lg'
          align='text-center'
          weight='font-semibold'
          color='text-gray-900'
        >{title}</Text>
        <Text
          size='text-sm'
          align='text-center'
          color='text-gray-500'
        >{text}</Text>
      </div>
    </div>
  )
}

EmptyState.propTypes = {
  image: PropTypes.node,
  title: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string
}

export default EmptyState