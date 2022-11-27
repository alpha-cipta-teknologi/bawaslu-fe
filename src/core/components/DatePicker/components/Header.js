import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import { momentHelper, styleHelper } from 'utility'

import Text from '../../Text'

const HeaderDatePicker = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}) => (
  <div className='flex items-center justify-between px-2 py-2'>
    <Text size='text-lg'>
      {momentHelper.dateConverted(new Date(date), 'MMMM YYYY')}
    </Text>

    <div className='space-x-2'>
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        type='button'
        className={styleHelper.classNames(
          prevMonthButtonDisabled ? 'cursor-not-allowed opacity-50' : '',
          'inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-drcGreen focus:ring-opacity-80'
        )}
      >
        <ChevronLeftIcon className='w-5 h-5 text-gray-600' />
      </button>

      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        type='button'
        className={styleHelper.classNames(
          nextMonthButtonDisabled ? 'cursor-not-allowed opacity-50' : '',
          'inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-drcGreen'
        )}
      >
        <ChevronRightIcon className='w-5 h-5 text-gray-600' />
      </button>
    </div>
  </div>
)

export default HeaderDatePicker