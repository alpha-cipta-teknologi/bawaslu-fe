import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import SyncLoader from '../Loader/SyncLoader'

const ModalLoader = ({ open }) => {
  return (
    <Modal
      open={ open || false }
      closeButton={ false }
      padding='py-8 px-2'
      width='w-auto'
      className='bg-drcGreen bg-opacity-70'
      backgroundOverlay={ false }
    >
      <div className='flex items-center justify-center'>
        <SyncLoader bgColor='bg-white' />
      </div>
    </Modal>
  )
}

ModalLoader.propTypes = {
  open: PropTypes.bool
}

export default ModalLoader