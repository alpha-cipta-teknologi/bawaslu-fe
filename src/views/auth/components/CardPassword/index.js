import React from 'react'
import { ChevronLeftIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Link, useHistory } from 'react-router-dom'

import { Card, Text } from 'core/components'

const CardPassword = ({
  title,
  alignTitle,
  children
}) => {
  const history = useHistory()

  const goBack = () => history.goBack()

  return (
    <div className='py-10 md:py-20 max-w-2xl mx-auto'>
      <Card paddingHorizontal='px-6' paddingVertical='py-8'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <ChevronLeftIcon className='w-6.5 h-6.5 text-blue-navy' onClick={goBack} />
            <Text size='text-sm' weight='font-semibold' color='text-blue-navy' onClick={goBack}>Kembali</Text>
          </div>

          <Link to='/login'>
            <XMarkIcon className='text-blue-navy w-6.5 h-6.5' />
          </Link>
        </div>

        <div className='mt-10 flex flex-col gap-y-8'>
          {title && (
            <Text
              size='text-2xl'
              weight='font-bold'
              align={alignTitle}
            >{title}</Text>
          )}

          {children}
        </div>
      </Card>
    </div>
  )
}

export default CardPassword
