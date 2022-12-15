import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Button, Input } from 'core/components'
import { utils } from 'utility'

import { CardPassword } from '../components'

const formResetPasswordInputProps = [
  {
    label: 'Kata Sandi Baru',
    name: 'password',
    type: 'password'
  },
  {
    label: 'Konfirmasi Kata Sandi Baru',
    name: 'confirm_password',
    type: 'password'
  }
]

const ResetPasswordPage = () => {
  const history = useHistory()

  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const [formResetPassword, setFormResetPassword] = useState({
    password: '',
    confirm_password: ''
  })
  const [showErrorInput, setShowErrorInput] = useState(false)

  const onSubmitResetPassword = event => {
    event.preventDefault()

    const isFormResetPasswordError = utils.isFormError(formResetPasswordInputProps, formResetPassword)

    if (isFormResetPasswordError) {
      setShowErrorInput(true)
    } else {
      setShowErrorInput(false)

      // handle reset password dispatch
      history.push('/reset-password/success')
    }
  }

  const onChangeForm = useCallback(e => {
    setFormResetPassword(prevForm => ({
      ...prevForm,
      [e.target.name]: e.target.value
    }))
  }, [])

  const renderInput = (inputProps) => {
    return (
      <Input
        key={inputProps.name}
        id={inputProps.name}
        value={formResetPassword[inputProps.name || '']}
        onChange={onChangeForm}
        labelClassName='flex'
        showError={showErrorInput}
        setShowError={setShowErrorInput}
        {...inputProps}
      />
    )
  }

  const renderFormResetPassword = () => {
    const disabled = utils.isEmptyForm(formResetPassword)
    const loading = utils.isLazyLoading(lazyLoad, 'resetPassword')

    return (
      <form className='grid gap-y-8' onSubmit={onSubmitResetPassword}>
        {formResetPasswordInputProps.map(form => renderInput(form))}

        <Button.ButtonPrimary
          sizing='w-full'
          disabled={disabled}
          loading={loading}
        >Lanjutkan</Button.ButtonPrimary>
      </form>
    )
  }

  return (
    <CardPassword title='Buat Kata Sandi Baru'>
      {renderFormResetPassword()}
    </CardPassword>
  )
}

export default ResetPasswordPage
