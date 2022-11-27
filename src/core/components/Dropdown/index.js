import React, { Fragment } from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

import { styleHelper } from 'utility'

import PortalSelect from '../PortalSelect'
import Text from '../Text'
import ButtonSecondary from '../Button/ButtonSecondary'

const Dropdown = ({
  items,
  onClickItem,
  className,
  disabled,
  buttonText,
  buttonClassName,
  origin = 'origin-top-left left-0',
  width = 'w-48',
  shadow = 'shadow-sm',
  borderRadius = 'rounded-lg'
}) => {
  const renderDropdownButton = open => {
    const ChevronIcon = open ? ChevronUpIcon : ChevronDownIcon

    return (
      <Menu.Button
        as='div'
        className={disabled ? 'cursor-default' : 'cursor-pointer'}
        disabled={disabled}
      >
        <ButtonSecondary
          borderRadius={borderRadius}
          className={buttonClassName}
          disabled={disabled}
        >
          <span className='mr-4 -ml-1'>
            {buttonText}
          </span>

          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <ChevronIcon
              className={styleHelper.classNames(
                'h-5 w-5',
                disabled ? 'text-drcGrey-base' : 'text-drcGreen'
              )}
              aria-hidden='true'
            />
          </div>
        </ButtonSecondary>
      </Menu.Button>
    )
  }

  return (
    <Menu as='div' className={styleHelper.classNames('relative', className)}>
      {({ open }) => (
        <PortalSelect
          open={open}
          renderTargetElement={() => renderDropdownButton(open)}
        >
          <Menu.Items className={styleHelper.classNames(
            'absolute mt-1 py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none',
            borderRadius,
            shadow,
            origin,
            width
          )}>
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <span
                    className={styleHelper.classNames(
                      active ? 'bg-gray-100' : '',
                      'flex items-center w-full px-4 py-2.5 cursor-pointer'
                    )}
                    onClick={onClickItem
                      ? () => onClickItem(item)
                      : undefined}
                  >
                    {item.icon && (
                      <span>
                        <item.icon className={styleHelper.classNames('w-4 h-4 mr-3', item.iconClassName)} aria-hidden='true' />
                      </span>
                    )}

                    <Text size='text-sm' cursor='cursor-pointer'>
                      {item.name}
                    </Text>
                  </span>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </PortalSelect>
      )}
    </Menu>
  )
}

export default Dropdown