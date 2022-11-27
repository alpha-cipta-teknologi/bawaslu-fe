import React, { forwardRef } from 'react'
import { CalendarIcon, ClockIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { momentHelper, styleHelper } from 'utility'

import Text from '../../Text'

const InputDatePicker = forwardRef(({
  value,
  onClick,
  placeholder,
  padding,
  spacing,
  textSize,
  inputClassName,
  type = 'date'
}, ref) => {
  const inputClassNames = styleHelper.classNames(
    'block w-full border rounded-lg bg-white cursor-pointer',
    'focus:border-drcGreen border-drcGrey-soft focus:outline-none focus:ring-0',
    padding,
    spacing,
    inputClassName
  )

  const renderIcon = () => {
    const className = 'text-drcGrey-base w-[22px] h-[22px]'

    if (placeholder && placeholder?.toLowerCase()?.includes('period')) {
      return <MagnifyingGlassIcon className='text-gray-400' />
    }

    return type === 'time'
      ? <ClockIcon className={className} />
      : <CalendarIcon className={className} />
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      type='button'
      className={inputClassNames}
    >
      <div className='relative'>
        {value
          ? (
            <Text
              size={textSize}
              color='text-drcBlack-2'
              cursor='cursor-pointer'
            >
              {type === 'date'
                ? momentHelper.dateConverted(new Date(value), 'DD-MM-YYYY')
                : value}
            </Text>
          )
          : (
            <Text
              cursor='cursor-pointer'
              color='text-drcGrey-base'
              size={textSize}
            >{placeholder}</Text>)}

        <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
          {renderIcon()}
        </div>
      </div>
    </button>
  )
})

export default InputDatePicker