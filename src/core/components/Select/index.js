import React from 'react'
import { Listbox } from '@headlessui/react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { ArrowDownIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

import { styleHelper } from 'utility'

import PortalSelect from '../PortalSelect'
import Text from '../Text'
import CustomIcon from '../CustomIcon'

const Select = ({
  label,
  placeholder,
  list,
  value,
  onChange,
  isMulti,
  sizing = 'w-full',
  spacing = 'mt-1.5',
  padding = 'p-3 pr-0',
  shadow = 'shadow-none',
  bgColor = 'bg-white',
  textSize = 'text-sm',
  textProps,
  iconType = 'chevron', // 'arrow', 'chevron'
  labelSize = 'text-sm',
  labelClassName,
  borderRadius = 'rounded-lg',
  wrapperClassName
}) => {
  const selectClassNames = open => styleHelper.classNames(
    'relative cursor-pointer border focus:outline-none',
    open ? 'bg-white' : bgColor,
    open
      ? 'ring-0 border-drcGreen focus:ring-0 focus:border-drcGreen'
      : 'border-drcGrey-soft focus:ring-0 focus:border-drcGrey-soft',
    borderRadius,
    sizing,
    spacing,
    padding,
    shadow,
    wrapperClassName
  )

  const labelClassNames = open => styleHelper.classNames(
    'block font-primary whitespace-nowrap',
    labelSize,
    open
      ? 'text-drcGreen font-medium'
      : 'text-drcBlack-2',
    labelClassName
  )

  const isSelected = (option, selectedDefault) => {
    if (isMulti) return value.find((el) => `${el.value}` === `${option.value}`)

    return selectedDefault
  }

  const handleDeselect = option => {
    const selectedUpdated = value.filter(el => `${el.value}` !== `${option.value}`)

    if (onChange) onChange(selectedUpdated)
  }

  const handleSelect = option => {
    if (!isSelected(option)) {
      const selectedUpdated = [
        ...value,
        list.find(el => `${el.value}` === `${option.value}`)
      ]

      if (onChange) onChange(selectedUpdated)
    } else {
      handleDeselect(option)
    }
  }

  const renderIconSelect = open => {
    if (iconType === 'chevron') {
      const ChevronIcon = open ? ChevronUpIcon : ChevronDownIcon

      return (
        <ChevronIcon
          className={styleHelper.classNames(
            'h-5 w-5',
            open
              ? 'text-drcGreen'
              : 'text-black'
          )}
          aria-hidden='true'
        />
      )
    }

    return (
      <ArrowDownIcon className={styleHelper.classNames(
        open
          ? 'rotate-180 fill-drcGreen'
          : 'rotate-0 fill-drcBlack-1'
      )} />
    )
  }

  const renderSelectContainer = open => {
    const selectedTextProps = {
      size: textSize,
      color: !value?.value ? 'text-gray-500' : 'text-gray-900',
      weight: 'font-normal',
      cursor: 'cursor-pointer',
      className: 'truncate',
      ...textProps
    }
    const selectedText =
      !value || (!isMulti && !value?.value) || (isMulti && !value.length)
        ? placeholder
        : value.label

    return (
      <Listbox.Button className={selectClassNames(open)}>
        <span className='flex items-start'>
          {(isMulti && Array.isArray(value) && !value.length) || !isMulti
            ? <Text {...selectedTextProps}>{selectedText}</Text>
            : null}

          {isMulti && (
            <div className='flex flex-wrap gap-2'>
              {value?.map((option, index) => {
                return (
                  <span key={index} className='inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-drcGreen bg-opacity-10 text-drcGreen text-opacity-70'>
                    {option.label}
                    <span
                      className='flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-drcGreen text-opacity-40 hover:bg-drcGreen hover:bg-opacity-20 hover:text-drcGreen hover:text-opacity-50 focus:outline-none'
                      onClick={() => handleSelect(el)}
                    >
                      <span className='sr-only'>Remove option</span>
                      <XMarkIcon className='w-3 h-3 text-drcGreen' />
                    </span>
                  </span>
                )
              })}
            </div>
          )}
        </span>
        <span className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
          {renderIconSelect(open)}
        </span>
      </Listbox.Button>
    )
  }

  const renderOptions = () => {
    if (!list || !list?.length) {
      return (
        <div className='cursor-default select-none relative py-2 pl-3'>
          <Text size='text-sm'>Nothing found.</Text>
        </div>
      )
    }

    return list?.map((option, index) => (
      <Listbox.Option
        key={index}
        className={({ active }) => styleHelper.classNames(
          active ? 'text-white bg-drcGreen' : '',
          'cursor-pointer select-none relative py-2 pl-3 pr-9'
        )}
        value={option}
      >
        {({ selected, active }) => {
          return (
            <>
              <Text
                type='span'
                weight={selected ? 'font-semibold' : 'font-normal'}
                color={active ? 'text-white' : 'text-gray-900'}
                className='truncate'
                size='text-sm'
                {...textProps}
              >
                {option.label}
              </Text>

              {selected && (
                <span className='absolute inset-y-0 right-0 flex items-center pr-4'>
                  <CheckIcon
                    className={styleHelper.classNames(
                      active ? 'text-white' : 'text-drcGreen',
                      'w-5 h-5'
                    )}
                    aria-hidden='true'
                  />
                </span>
              )}
            </>
          )
        }}
      </Listbox.Option>
    ))
  }

  return (
    <Listbox
      as='div'
      value={value}
      onChange={onChange}
      multiple={isMulti}
    >
      {({ open }) => {
        return (
          <>
            <Listbox.Label className={labelClassNames(open)}>
              {label}
            </Listbox.Label>

            <PortalSelect
              open={open}
              renderTargetElement={() => renderSelectContainer(open)}
            >
              <Listbox.Options
                static
                className={styleHelper.classNames(
                  'absolute mt-1 max-h-60 w-full overflow-auto custom-scrollbar bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                  borderRadius
                )}
              >
                {renderOptions()}
              </Listbox.Options>
            </PortalSelect>
          </>
        )
      }}
    </Listbox>
  )
}

export default Select
