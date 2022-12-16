import React, { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { AsyncSelect, Button, Input } from 'core/components'
import { utils, hooks, toastify, validation } from 'utility'
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
    type: 'async-select'
  },
  {
    label: 'Provinsi',
    name: 'province_id',
    type: 'async-select'
  },
  {
    label: 'Kabupaten/Kota',
    name: 'regency_id',
    type: 'async-select'
  },
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

const initialSelect = {
  value: '',
  label: ''
}

const RegisterPage = () => {
  const history = useHistory()

  const lazyLoad = useSelector(state => state.misc).lazyLoad
  const allProvinces = useSelector(state => state.areas).allProvinces
  const allRegencies = useSelector(state => state.areas).allRegencies
  const dataRegencies = useSelector(state => state.areas).dataRegencies

  const handleRegister = hooks.useCustomDispatch(actions.auth.handleRegister)
  const getDataProvinces = hooks.useCustomDispatch(actions.areas.getDataProvinces)
  const getDataRegencies = hooks.useCustomDispatch(actions.areas.getDataRegencies)
  const getDataRegenciesByProvince = hooks.useCustomDispatch(actions.areas.getDataRegenciesByProvince)

  const [formRegister, setFormRegister] = useState({
    full_name: '',
    date_of_birth: '',
    place_of_birth: initialSelect,
    province_id: initialSelect,
    regency_id: initialSelect,
    email: '',
    telepon: '',
    password: '',
    confirm_password: ''
  })
  const [selectedSelect, setSelectedSelect] = useState({
    place_of_birth: initialSelect,
    province_id: initialSelect,
    regency_id: initialSelect
  })
  const [showErrorInput, setShowErrorInput] = useState(false)

  useEffect(() => {
    getDataProvinces()
  }, [])

  useEffect(() => {
    if (+selectedSelect.province_id.value > 0) {
      const province_id = +selectedSelect.province_id.value

      getDataRegenciesByProvince(province_id)
    }
  }, [selectedSelect.province_id.value])

  const onSubmitRegister = event => {
    event.preventDefault()

    const isFormRegisterError = utils.isFormError(formRegisterInputProps, formRegister)

    if (isFormRegisterError) {
      setShowErrorInput(true)
    } else {
      setShowErrorInput(false)

      const validationPassMatch = validation.passwordMatch(formRegister.password, formRegister.confirm_password)

      if (!validationPassMatch) {
        toastify.error('Password dan konfirmasi password tidak sesuai')

        return
      }

      const requestBody = {
        ...formRegister,
        place_of_birth: selectedSelect.place_of_birth.label,
        province_id: {
          ...selectedSelect.province_id,
          value: +selectedSelect.province_id.value
        },
        regency_id: {
          ...selectedSelect.regency_id,
          value: +selectedSelect.regency_id.value
        }
      }

      // handle register dispatch
      handleRegister(requestBody, async () => {
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

  const onChangeSelect = useCallback((option, keyName) => {
    if (keyName === 'province_id') {
      setSelectedSelect(prevSelect => ({
        ...prevSelect,
        [keyName]: option,
        regency_id: initialSelect
      }))
    } else {
      setSelectedSelect(prevSelect => ({
        ...prevSelect,
        [keyName]: option
      }))
    }
  }, [])

  const defaultOptions = (keyName) => {
    switch (keyName) {
      case 'place_of_birth':
        return allRegencies || []
      case 'province_id':
        return allProvinces || []
      case 'regency_id':
        return selectedSelect.province_id.value ? (dataRegencies || []) : []
      default:
        return []
    }
  }

  const loadingSelect = (keyName) => {
    switch (keyName) {
      case 'place_of_birth':
        return utils.isLazyLoading(lazyLoad, 'getDataRegencies')
      case 'province_id':
        return utils.isLazyLoading(lazyLoad, 'getDataProvinces')
      case 'regency_id':
        return utils.isLazyLoading(lazyLoad, 'getDataRegenciesByProvince')
    }
  }

  const promiseSelect = (inputValue, keyName) => {
    return new Promise((resolve) => {
      if (keyName === 'place_of_birth') {
        getDataRegencies({
          page: 1,
          perPage: 10,
          q: inputValue
        }, data => {
          resolve(data || [])
        })
      } else if (keyName === 'province_id' || keyName === 'regency_id') {
        resolve(utils.filterSelectData(inputValue, defaultOptions(keyName)))
      }
    })
  }

  const renderInput = (inputProps) => {
    const keyName = inputProps.name || ''

    if (inputProps.type === 'async-select') {
      return (
        <AsyncSelect
          key={keyName}
          label={inputProps.label}
          value={selectedSelect[keyName]}
          onChange={value => onChangeSelect(value, keyName)}
          defaultOptions={defaultOptions(keyName)}
          // placeholder={ inputProps.placeholder }
          loading={loadingSelect(keyName)}
          loadOptions={inputValue => promiseSelect(inputValue, keyName)}
        />
      )
    }

    return (
      <Input
        key={keyName}
        id={keyName}
        value={formRegister[keyName]}
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