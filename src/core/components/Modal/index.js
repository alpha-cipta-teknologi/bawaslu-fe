import React, { Fragment, useRef } from 'react'
import propTypes from 'prop-types'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { styleHelper } from 'utility'

/* eslint-disable no-unused-expressions */

const Modal = ({
  open = false,
  setOpen,
  padding = 'p-2 sm:p-4',
  title,
  width = 'max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl w-full',
  className,
  withSlideOvers,
  backgroundOverlay = true,
  footer,
  closeButton = true,
  onCloseModal,
  children,
  closeButtonType = 'inside' // opsi: inside/outside
}) => {
  const completeButtonRef = useRef(null)

  const renderCloseIconOutside = () => {
    if (closeButton && closeButtonType === 'outside') {
      return (
        <div className='fixed top-5 sm:top-12.5 right-5 sm:right-15 flex z-[102]'>
          <button
            type='button'
            className='text-white focus:outline-none ring-[3px] ring-white rounded-full cursor-pointer'
            onClick={() => setOpen && setOpen(false)}
          >
            <span className='sr-only'>Close panel</span>
            <XMarkIcon className='h-7 sm:h-8 w-7 sm:w-8 cursor-pointer' aria-hidden='true' />
          </button>
        </div>
      )
    }

    return null
  }

  const onCloseModalDefault = (open) => {
    setOpen && setOpen(open)
    if (onCloseModal) onCloseModal(open)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        initialFocus={completeButtonRef}
        className='fixed z-[999] inset-0 overflow-y-auto'
        onClose={onCloseModalDefault}
      >
        <div className={styleHelper.classNames('flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0', withSlideOvers ? 'pl-[70px]' : '')}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className={styleHelper.classNames('fixed inset-0', backgroundOverlay ? ' bg-gray-900 bg-opacity-60 transition-opacity' : 'bg-transparent')} />
          </Transition.Child>

          { /* This element is to trick the browser into centering the modal contents. */}
          <span ref={completeButtonRef} className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>

          {renderCloseIconOutside()}

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className={styleHelper.classNames(
              'inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle',
              width,
              className
            )}>
              {closeButton && closeButtonType === 'inside' ? (
                <div className='block absolute top-0 right-0 z-30 p-4'>
                  <button
                    type='button'
                    className='bg-transparent cursor-pointer rounded-md text-gray-400 hover:text-hydeGreen-primary outline-none'
                    onClick={() => {
                      onCloseModalDefault(false)
                    }}
                  >
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
              ) : null}
              {title
                ? (
                  <div className={styleHelper.classNames('flex items-start w-2/3 pb-0', padding)}>
                    <Dialog.Title as='div'>
                      {title}
                    </Dialog.Title>
                  </div>
                )
                : null}

              <div className={padding}>
                {children}
              </div>

              {footer
                ? (
                  <div className={padding}>
                    {footer}
                  </div>
                )
                : null}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

Modal.propTypes = {
  open: propTypes.bool.isRequired,
  setOpen: propTypes.func,
  padding: propTypes.string,
  title: propTypes.node,
  footer: propTypes.node,
  width: propTypes.string,
  className: propTypes.string,
  withSlideOvers: propTypes.bool,
  backgroundOverlay: propTypes.bool,
  closeButton: propTypes.bool,
  onCloseModal: propTypes.func,
  children: propTypes.node
}

export default Modal
