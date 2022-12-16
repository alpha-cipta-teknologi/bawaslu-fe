import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Text, Button, Input } from 'core/components'
import { utils, validation } from 'utility'

import { CardPassword } from '../components'

const ForgotPasswordPage = () => {
  const history = useHistory()

  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const [formForgotPassword, setFormForgotPassword] = useState('')
  const [errorInput, setErrorInput] = useState('')

  const onSubmitForgotPassword = async event => {
    event.preventDefault()

    const isValidInput = validation.email(formForgotPassword) || validation.phone(formForgotPassword)

    if (isValidInput) {
      setErrorInput('')

      // hit api & callback:
      history.push(`/otp-verification?send=${formForgotPassword}`)
    } else {
      setErrorInput('Email atau nomor telepon tidak valid')
    }
  }

  const onChangeFormForgotPassword = useCallback(e => {
    setFormForgotPassword(e.target.value)
  }, [])

  const renderFormForgotPassword = () => {
    const disabled = !formForgotPassword
    const loading = utils.isLazyLoading(lazyLoad, 'forgotPassword')

    return (
      <form className='grid gap-y-8' onSubmit={onSubmitForgotPassword}>
        <Input
          id='forgot-password'
          label='Email atau Nomor Telepon'
          value={formForgotPassword}
          onChange={onChangeFormForgotPassword}
          labelClassName='flex'
          errorText={errorInput}
        />

        <Button.ButtonPrimary
          sizing='w-full'
          disabled={disabled}
          loading={loading}
        >Lanjutkan</Button.ButtonPrimary>
      </form>
    )
  }

  return (
    <CardPassword title='Lupa Kata Sandi'>
      {renderFormForgotPassword()}
    </CardPassword>
  )
}

export default ForgotPasswordPage