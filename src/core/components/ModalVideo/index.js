import React from 'react'

import Modal from '../Modal'
import Spinner from '../Loader/Spinner'

const ModalVideo = ({
  open,
  setOpen,
  loading,
  setLoading,
  url,
  title
}) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={title}
    >
      <div className='aspect-w-16 aspect-h-9'>
        {loading
          ? <Spinner />
          : null}

        <iframe
          src={url}
          onLoad={() => setLoading(false)}
          className='rounded-lg'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </div>
    </Modal>
  )
}

export default ModalVideo
