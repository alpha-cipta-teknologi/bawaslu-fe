import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { ModalLoader } from 'core/components'
import { toastify, hooks } from 'utility'
import { actions } from 'store'

const AccountVerificationPage = () => {
  const history = useHistory()

  const accountVerification = hooks.useCustomDispatch(actions.auth.accountVerification)

  const [openModalLoader] = useState(true)

  const query = hooks.useQuery()
  const confirmHash = query?.get('confirm_hash')

  const redirect = isSuccess => {
    if (isSuccess) {
      history.replace('/login')
      toastify.success('Verifikasi akun berhasil. Silakan login')
    } else {
      history.replace('/verification/error')
    }
  }

  useEffect(() => {
    if (confirmHash) {
      accountVerification(confirmHash, isSuccess => {
        setTimeout(() => {
          redirect(isSuccess)
        }, 3000)
      }
      )
    }
  }, [confirmHash])

  return (
    <div className='flex items-center justify-center h-screen'>
      <ModalLoader open={openModalLoader} />
    </div>
  )
}

export default AccountVerificationPage
