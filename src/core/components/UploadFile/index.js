import React from 'react'
import PropTypes from 'prop-types'
import { DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline'

import Text from '../Text'

const UploadFile = ({
  label,
  url,
  fileName,
  onRemove,
  type = 'image'
}) => {
  const renderThumbnail = () => {
    if (type === 'document') {
      return (
        <div className='flex items-center justify-center rounded-2lg bg-[#FAFAFA] p-3'>
          <DocumentTextIcon className='w-6 h-6 text-black-primary' />
        </div>
      )
    }

    if (type === 'image') {
      return (
        <a
          target='_blank'
          rel='noreferrer'
          href={url}
        >
          <img
            alt=''
            src={url}
            className='w-15 h-15 sm:w-20 sm:h-20 object-cover rounded cursor-pointer'
          />
        </a>
      )
    }
  }

  return (
    <>
      {label
        ? <Text>{label}</Text>
        : null}

      <div className='grid md:flex-row flex-col md:items-center md:grid-cols-12'>
        <div className='flex items-center gap-x-3.5 md:col-span-9'>
          {renderThumbnail()}

          <a
            target='_blank'
            rel='noreferrer'
            href={url}
            className='w-full'
          >
            <Text
              size='text-sm'
              decoration='decoration-black-primary'
              weight='font-bold'
              lineClamp='line-clamp-2'
              underlineOnHover
            >{fileName || label || ''}</Text>
          </a>
        </div>

        <div className='flex items-center gap-x-3 mt-4 md:mt-0 md:col-span-3 md:ml-auto'>
          <Text
            size='text-sm'
            color='text-green-400'
            weight='font-bold'
          >Completed</Text>
          <XMarkIcon className='w-4 h-4 text-grey-base cursor-pointer' onClick={onRemove} />
        </div>
      </div>
    </>
  )
}

UploadFile.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string.isRequired,
  fileName: PropTypes.string,
  onRemove: PropTypes.func,
  type: PropTypes.string
}

export default UploadFile