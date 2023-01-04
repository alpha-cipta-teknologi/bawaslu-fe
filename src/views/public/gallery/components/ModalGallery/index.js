import React from 'react'

import { Text, ModalImage } from 'core/components'

const ModalGallery = ({
  src,
  alt,
  content,
  open,
  setOpen,
  onClickArrow
}) => {
  return (
    <ModalImage
      src={src}
      alt={alt}
      open={open}
      setOpen={setOpen}
      onClickArrow={onClickArrow}
      content={(
        <div className='p-4'>
          <Text>
            {content}
          </Text>
        </div>
      )}
      isMulti
    />
  )
}

export default ModalGallery
