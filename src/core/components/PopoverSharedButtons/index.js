import React from 'react'
import { Popover } from '@headlessui/react'

import { styleHelper } from 'utility'

import SharedButton from '../SharedButton'
import CustomIcon from '../CustomIcon'

const buttonSharedContent = [
  {
    buttonName: 'Facebook',
    iconName: 'facebook',
    titleProps: 'quote'
  },
  {
    buttonName: 'Linkedin',
    iconName: 'linkedin'
  },
  {
    buttonName: 'Twitter',
    iconName: 'twitter',
    titleProps: 'title'
  },
  {
    buttonName: 'Telegram',
    iconName: 'telegram',
    titleProps: 'title'
  },
  {
    buttonName: 'Whatsapp',
    iconName: 'whatsapp',
    titleProps: 'title'
  }
]

const PopoverSharedButtons = ({
  onShareWindowClose,
  title,
  url,
  children
}) => {
  const renderSharedButton = (buttonProps) => {
    const ButtonSocial = SharedButton[`${buttonProps.buttonName}`]
    const props = buttonProps.titleProps
      ? { [`${buttonProps.titleProps}`]: title }
      : null

    return (
      <ButtonSocial
        key={buttonProps.iconName}
        url={url}
        onShareWindowClose={onShareWindowClose}
        {...props}
      >
        <CustomIcon
          iconName={buttonProps.iconName}
          className={styleHelper.classNames(
            'absolute-center fill-secondary w-auto',
            buttonProps.iconName === 'twitter' || buttonProps.iconName === 'telegram'
              ? 'h-4.5 sm:h-6' : 'h-3.5 sm:h-5'
          )}
          wrapperClassName='bg-secondary bg-opacity-5 rounded-full w-7.5 h-[32px] sm:w-11 sm:h-[46px] relative'
        />
      </ButtonSocial>
    )
  }

  const renderSharedButtons = () => {
    return (
      <div className='flex flex-col md:flex-row items-center justify-center gap-2.5'>

        {buttonSharedContent.map(buttonProps => renderSharedButton(buttonProps, url || window.location.href))}
      </div>
    )
  }

  const renderPopoverShare = () => {
    return (
      <Popover className='relative'>
        <Popover.Button className='focus:ring-0 focus:outline-none flex items-center'>
          {children}
        </Popover.Button>

        <Popover.Panel className='absolute z-40 bg-white shadow-lg p-2 rounded-md'>
          {renderSharedButtons()}
        </Popover.Panel>
      </Popover>
    )
  }

  return renderPopoverShare()
}

export default PopoverSharedButtons