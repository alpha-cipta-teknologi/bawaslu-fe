import React from 'react'
import PropTypes from 'prop-types'
import { DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { images } from 'constant'

import Text from '../Text'

const UploadDocument = ({
  label,
  url,
  fileName,
  onRemoveDocument
}) => {
  return (
    <>
      {label
        ? <Text color='text-drcBlack-2'>{label}</Text>
        : null}

      <div className='grid md:flex-row flex-col md:items-center md:grid-cols-12'>
        <div className='flex items-center gap-x-3.5 md:col-span-6'>
          <div className='flex items-center justify-center rounded-2lg bg-[#FAFAFA] p-3'>
            <img alt='' src={images.icons.document} />
            <DocumentTextIcon className='w-4 h-4 text-drcBlack-2' />
          </div>

          <a
            target='_blank'
            rel='noreferrer'
            href={url}
          >
            <Text
              size='text-sm'
              decoration='decoration-drcBlack-2'
              weight='font-bold'
              underlineOnHover
            >{fileName || label || ''}</Text>
          </a>
        </div>

        <div className='flex items-center gap-x-3 mt-4 md:mt-0 md:col-span-6 md:ml-auto'>
          <Text
            size='text-sm'
            color='text-green-400'
            weight='font-bold'
          >Completed</Text>
          <XMarkIcon className='w-3 h-3 text-hydeGrey cursor-pointer' onClick={onRemoveDocument} />
        </div>
      </div>
    </>
  )
}

UploadDocument.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string.isRequired,
  fileName: PropTypes.string,
  onRemoveDocument: PropTypes.func
}

export default UploadDocument