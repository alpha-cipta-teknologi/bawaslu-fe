import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Text, Button, Input } from 'core/components'
import { utils } from 'utility'

import { CardAuth } from '../components'

const formRegisterInputProps = [
  {
    label: 'Nama Lengkap',
    name: 'name',
    type: 'text'
  },
  {
    label: 'Tanggal Lahir',
    name: 'date_birth',
    type: 'date'
  },
  {
    label: 'Kota Tempat Lahir',
    name: 'place_birth',
    type: 'text'
  },
  {
    label: 'Provinsi',
    name: 'province_id',
    type: 'text'
  },
  {
    label: 'Kabupaten/Kota',
    name: 'district_id',
    type: 'text'
  },
  {
    label: 'Email',
    name: 'email',
    type: 'text'
  },
  {
    label: 'Nomor Telepon',
    name: 'phone',
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
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const [formRegister, setFormRegister] = useState({
    name: '',
    date_birth: '',
    place_birth: '',
    province_id: '',
    district_id: '',
    email: '',
    phone: '',
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

      // handle login dispatch
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
    const loading = utils.isLazyLoading(lazyLoad, 'login')

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