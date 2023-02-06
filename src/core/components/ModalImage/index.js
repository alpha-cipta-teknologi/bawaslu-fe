import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/solid'

const ModalImage = ({
  src,
  alt,
  content,
  open,
  setOpen,
  onClickArrow,
  isMulti,
  placementContent = 'bottom' // top | bottom
}) => {
  const onCloseModalDefault = (open) => {
    if (setOpen) setOpen(open)
  }

  const renderCloseIcon = () => {
    return (
      <div className='fixed top-5 sm:top-12.5 right-5 sm:right-15 flex z-[102]'>
        <button
          type='button'
          className='text-white focus:outline-none ring-[3px] ring-white rounded-full cursor-pointer'
          onClick={() => onCloseModalDefault(false)}
        >
          <span className='sr-only'>Close panel</span>
          <XMarkIcon className='h-7 sm:h-8 w-7 sm:w-8 cursor-pointer' aria-hidden='true' />
        </button>
      </div>
    )
  }

  return (
    <Transition.Root show={open || false} as={Fragment}>
      <Dialog as='div' className='relative z-[100]' onClose={isMulti ? () => null : onCloseModalDefault}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        {renderCloseIcon()}

        {isMulti && (
          <>
            <div className='fixed top-1/2 -translate-y-1/2 left-0 sm:left-12.5 z-[102]'>
              <button
                type='button'
                className='text-white cursor-pointer'
                onClick={() => onClickArrow && onClickArrow('prev')}
              >
                <span className='sr-only'>Previous</span>
                <ChevronLeftIcon className='h-10 sm:h-12.5 w-10 sm:w-12.5' aria-hidden='true' />
              </button>
            </div>

            <div className='fixed top-1/2 -translate-y-1/2 right-0 sm:right-12.5 z-[102]'>
              <button
                type='button'
                className='text-white focus:outline-none cursor-pointer'
                onClick={() => onClickArrow && onClickArrow('next')}
              >
                <span className='sr-only'>Next</span>
                <ChevronRightIcon className='h-10 sm:h-12.5 w-10 sm:w-12.5' aria-hidden='true' />
              </button>
            </div>
          </>
        )}

        <div className='fixed inset-0 z-[101] overflow-y-auto'>
          <div className='flex min-h-full justify-center p-10 items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative pointer-events-auto'>
                <div className='transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-20 sm:w-full sm:max-w-sm lg:max-w-3xl'>
                  {content
                    && placementContent === 'top'
                    && (
                      <>
                        {content}
                      </>
                    )}

                  {src && (
                    <img
                      src={src}
                      alt={alt || ''}
                      className='w-full h-full object-cover select-none'
                    />
                  )}

                  {content
                    && placementContent === 'bottom'
                    && (
                      <>
                        {content}
                      </>
                    )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalImage
