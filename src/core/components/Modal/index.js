import React, { Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
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
  onCloseButton,
  children
}) => {
  const completeButtonRef = useRef(null)

  const onCloseModal = (open) => {
    setOpen && setOpen(open)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        initialFocus={completeButtonRef}
        className='fixed z-[999] inset-0 overflow-y-auto'
        onClose={onCloseModal}
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
              {closeButton ? (
                <div className='block absolute top-0 right-0 z-30 p-4'>
                  <button
                    type='button'
                    className='bg-transparent cursor-pointer rounded-md text-gray-400 hover:text-hydeGreen-primary outline-none'
                    onClick={() => {
                      onCloseModal(false)
                      onCloseButton ? onCloseButton() : null
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
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func,
  padding: PropTypes.string,
  title: PropTypes.node,
  footer: PropTypes.node,
  width: PropTypes.string,
  className: PropTypes.string,
  withSlideOvers: PropTypes.bool,
  backgroundOverlay: PropTypes.bool,
  closeButton: PropTypes.bool,
  onCloseButton: PropTypes.func,
  children: PropTypes.node
}

export default Modal
