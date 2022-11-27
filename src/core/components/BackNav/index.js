import React from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { useHistory } from 'react-router-dom'

import Text from '../Text'

const BackNav = () => {
  const history = useHistory()

  return (
    <div className='flex items-center gap-x-3.5 mb-7.5'>
      <ChevronLeftIcon className='w-5 h-5 text-gray-400 cursor-pointer' onClick={() => history.goBack()} />
      <Text onClick={() => history.goBack()}>Back</Text>
    </div>
  )
}

export default BackNav