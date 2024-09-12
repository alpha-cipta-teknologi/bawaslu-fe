import React, { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'

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
    label: 'Provinsi Domisili',
    name: 'province_id',
    type: 'async-select'
  },
  {
    label: 'Kabupaten/Kota Domisili',
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
  },
  {
    label: 'Komunitas',
    name: 'komunitas_id',
    type: 'async-select'
  },
  {
    label: 'Tema',
    name: 'tema_id',
    type: 'async-select',
    isMulti: true
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
  const allCommunities = useSelector(state => state.communities)?.allCommunities
  const allTopics = useSelector(state => state.topics)?.allTopics

  const handleRegister = hooks.useCustomDispatch(actions.auth.handleRegister)
  const getDataProvinces = hooks.useCustomDispatch(actions.areas.getDataProvinces)
  const getDataRegencies = hooks.useCustomDispatch(actions.areas.getDataRegencies)
  const getDataRegenciesByProvince = hooks.useCustomDispatch(actions.areas.getDataRegenciesByProvince)
  const getAllDataCommunity = hooks.useCustomDispatch(actions.communities.getAllDataCommunity)
  const getAllDataTopic = hooks.useCustomDispatch(actions.topics.getAllDataTopic)

  const [formRegister, setFormRegister] = useState({
    full_name: '',
    date_of_birth: '',
    place_of_birth: initialSelect,
    province_id: initialSelect,
    regency_id: initialSelect,
    email: '',
    telepon: '',
    password: '',
    confirm_password: '',
    komunitas_id: initialSelect,
    tema_id: []
  })
  const [selectedSelect, setSelectedSelect] = useState({
    place_of_birth: initialSelect,
    province_id: initialSelect,
    regency_id: initialSelect,
    komunitas_id: initialSelect,
    tema_id: []
  })
  const [showErrorInput, setShowErrorInput] = useState(false)

  const [captchaToken, setCaptchaToken] = useState(null)

  useEffect(() => {
    getDataProvinces()
    getAllDataCommunity()
    getAllDataTopic()
  }, [])

  useEffect(() => {
    if (+selectedSelect.province_id.value > 0) {
      const province_id = +selectedSelect.province_id.value

      getDataRegenciesByProvince(province_id)
    }
  }, [selectedSelect.province_id.value])

  const onCaptchaChange = (token) => {
    setCaptchaToken(token) // Menyimpan token CAPTCHA
  }

  const onSubmitRegister = event => {
    event.preventDefault()

    if (!captchaToken) {
      toastify.error('Please complete the CAPTCHA') // Validasi jika CAPTCHA belum diisi
      return
    }

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
        },
        komunitas_id: {
          ...selectedSelect.komunitas_id,
          value: +selectedSelect.komunitas_id.value
        },
        tema_id: selectedSelect.tema_id.map(komunitas => +komunitas.value),
        captcha_token: captchaToken
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
      case 'tema_id':
        return allTopics || []
      case 'komunitas_id':
        return allCommunities || []
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
      case 'tema_id':
        return utils.isLazyLoading(lazyLoad, 'getAllDataTopic')
      case 'komunitas_id':
        return utils.isLazyLoading(lazyLoad, 'getAllDataCommunity')
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
          perPage: 30,
          q: inputValue
        }, data => {
          resolve(data || [])
        })
      } else if (['province_id', 'regency_id', 'tema_id', 'komunitas_id'].includes(keyName)) {
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
          loading={loadingSelect(keyName)}
          loadOptions={inputValue => promiseSelect(inputValue, keyName)}
          isMulti={inputProps.isMulti}
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
    const disabled = utils.isEmptyForm({
      ...formRegister,
      komunitas_id: selectedSelect.komunitas_id.value,
      place_of_birth: selectedSelect.place_of_birth.value
    })
    const loading = utils.isLazyLoading(lazyLoad, 'register')

    return (
      <form className='grid gap-y-6' onSubmit={onSubmitRegister}>
        {formRegisterInputProps.map(form => renderInput(form))}

        {/* Tambahkan reCAPTCHA di sini */}
        <ReCAPTCHA
          sitekey="6LcRGz4qAAAAAOjcgJSy9b0eMsA6PIhQM276D4RO"  // Ganti dengan site key dari Google reCAPTCHA
          onChange={onCaptchaChange}
        />

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