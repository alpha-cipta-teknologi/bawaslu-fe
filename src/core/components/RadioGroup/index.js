import React from 'react'
import propTypes from 'prop-types'

import { utils, styleHelper } from 'utility'

import Skeleton from '../Skeleton'
import Text from '../Text'

const RadioGroup = ({
  direction = 'vertical',
  label,
  labelClassName,
  labelSize = 'text-base',
  textSize = 'text-base',
  radioSize = 'w-4 h-4 sm:w-5 sm:h-5',
  spacing = 'mt-2.5',
  options,
  loading = false,
  value,
  onChange,
  containerClassName,
  border = 'focus:ring-hydeGreen-primary focus:ring-opacity-70 focus:ring-1 border-hydeGreen-primary',
  accentColor = 'text-hydeGreen-primary',
  radioClassName,
  titleClassName,
  disabled,
  inverse
}) => {
  const renderLabel = () => {
    if (label) {
      return (
        <Text
          type='label'
          weight='font-bold'
          size={labelSize}
          className={labelClassName}
        >
          {label}
        </Text>
      )
    }

    return null
  }

  const renderOptionTitle = (option) => {
    return (
      <Skeleton
        loading={loading}
        paragraph={{
          rows: 1,
          flipTruncate: true
        }}
        className='ml-3 w-[100px]'
      >
        <Text
          type='label'
          id={option.id}
          size={textSize}
          spacing='ml-3'
          className={styleHelper.classNames(
            'block',
            titleClassName && titleClassName(value === option.id)
          )}
        >
          {option.title}
        </Text>
      </Skeleton>
    )
  }

  const renderOptions = () => {
    const dummyOptions = utils.createDummyArray(2, {
      id: '',
      title: ''
    })
    const radioOptions = loading
      ? dummyOptions
      : options

    return radioOptions?.map((option, index) => (
      <div key={index} className='flex items-center'>
        <Skeleton
          loading={loading}
          avatar={{
            sizing: radioSize,
            shape: 'circle'
          }}
        >
          <input
            id={option.id}
            type='radio'
            name={option.name}
            value={value}
            checked={value === option.id}
            onChange={onChange}
            className={styleHelper.classNames(
              'cursor-pointer',
              border,
              accentColor,
              radioSize,
              inverse ? 'radio-reverse-primary' : '',
              radioClassName
            )}
            disabled={disabled}
          />
        </Skeleton>

        {renderOptionTitle(option)}
      </div>
    ))
  }

  return (
    <div>
      {renderLabel()}

      <fieldset className={spacing}>
        <legend className='sr-only'>Radio Group</legend>

        <div className={styleHelper.classNames(
          containerClassName,
          direction === 'horizontal'
            ? 'xxs:flex xxs:items-center gap-y-2.5 xxs:gap-y-0 xxs:gap-x-6 md:gap-x-12.5'
            : 'flex flex-col gap-y-4'
        )}>
          {renderOptions()}
        </div>
      </fieldset>
    </div>
  )
}

RadioGroup.propTypes = {
  direction: propTypes.oneOf(['vertical', 'horizontal']),
  label: propTypes.string,
  labelClassName: propTypes.string,
  labelSize: propTypes.string,
  textSize: propTypes.string,
  radioSize: propTypes.string,
  spacing: propTypes.string,
  options: propTypes.array,
  loading: propTypes.bool,
  value: propTypes.string,
  onChange: propTypes.func,
  containerClassName: propTypes.string,
  border: propTypes.string,
  accentColor: propTypes.string,
  radioClassName: propTypes.string,
  titleClassName: propTypes.func,
  disabled: propTypes.bool,
  inverse: propTypes.bool
}

export default RadioGroup