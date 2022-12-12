import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Button, Input } from 'core/components'
import { utils, hooks, toastify } from 'utility'
import { actions } from 'store'

import { CardAuth } from '../components'

const formRegisterInputProps = [
  {
    label: 'Nama Lengkap',
    name: 'full_name',
    type: 'text'
  },
  {
    label: 'Tanggal Lahir',
    name: 'date_of_birth',
    type: 'date'
  },
  {
    label: 'Kota Tempat Lahir',
    name: 'place_of_birth',
    type: 'text'
  },
  // {
  //   label: 'Provinsi',
  //   name: 'province_id',
  //   type: 'text'
  // },
  // {
  //   label: 'Kabupaten/Kota',
  //   name: 'regency_id',
  //   type: 'text'
  // },
  {
    label: 'Email',
    name: 'email',
    type: 'text'
  },
  {
    label: 'Nomor Telepon',
    name: 'telepon',
    type: 'text'
  },
  {
    label: 'Kata Sandi',
    name: 'password',
    type: 'password'
  },
  {
    label: 'Konfirmasi Kata Sandi',
    name: 'confirm_password',
    type: 'password'
  }
]

const RegisterPage = () => {
  const history = useHistory()

  const lazyLoad = useSelector(state => state.misc).lazyLoad
  const handleRegister = hooks.useCustomDispatch(actions.auth.handleRegister)

  const [formRegister, setFormRegister] = useState({
    full_name: '',
    date_of_birth: '',
    place_of_birth: '',
    // province_id: '',
    // regency_id: '',
    email: '',
    telepon: '',
    password: '',
    confirm_password: ''
  })
  const [showErrorInput, setShowErrorInput] = useState(false)

  const onSubmitRegister = event => {
    event.preventDefault()

    const isFormRegisterError = utils.isFormError(formRegisterInputProps, formRegister)

    if (isFormRegisterError) {
      setShowErrorInput(true)
    } else {
      setShowErrorInput(false)

      // handle register dispatch
      handleRegister(formRegister, async () => {
        try {
          history.push('/')

          toastify.success('You have successfully register, check your email')

        } catch (error) {
          toastify.error('Maaf, terjadi kesalahan. Silakan muat ulang halaman beberapa saat lagi')
        }
      })
    }
  }

  const onChangeForm = useCallback(e => {
    setFormRegister(prevForm => ({
      ...prevForm,
      [e.target.name]: e.target.value
    }))
  }, [])

  const renderInput = (inputProps) => {
    return (
      <Input
        key={inputProps.name}
        id={inputProps.name}
        value={formRegister[inputProps.name || '']}
        onChange={onChangeForm}
        labelClassName='flex'
        showError={showErrorInput}
        setShowError={setShowErrorInput}
        {...inputProps}
      />
    )
  }

  const renderFormRegister = () => {
    const disabled = utils.isEmptyForm(formRegister)
    const loading = utils.isLazyLoading(lazyLoad, 'register')

    return (
      <form className='grid gap-y-6' onSubmit={onSubmitRegister}>
        {formRegisterInputProps.map(form => renderInput(form))}

        <Button.ButtonPrimary
          sizing='w-full'
          disabled={disabled}
          loading={loading}
        >Buat Akun</Button.ButtonPrimary>
      </form>
    )
  }

  return (
    <CardAuth>
      {renderFormRegister()}
    </CardAuth>
  )
}

export default RegisterPage