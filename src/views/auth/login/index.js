import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'

import { Text, Button, Input } from 'core/components'
import { utils, hooks, toastify } from 'utility'
import { images } from 'constant'
import { actions } from 'store'

import { CardAuth } from '../components'

const formLoginInputProps = [
  {
    label: 'Email',
    name: 'username',
    type: 'text'
  }, {
    label: 'Kata Sandi',
    name: 'password',
    type: 'password'
  }
]

const LoginPage = () => {
  const history = useHistory()

  const handleLogin = hooks.useCustomDispatch(actions.auth.handleLogin)

  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const [formLogin, setFormLogin] = useState({
    username: '',
    password: ''
  })
  const [captchaToken, setCaptchaToken] = useState(null) // Tambahkan state untuk menyimpan token CAPTCHA
  const [showErrorInput, setShowErrorInput] = useState(false)

  const onCaptchaChange = (token) => {
    console.log('Captcha Token:', token) // Cetak token di konsol
    setCaptchaToken(token)
  }

  const onSubmitLogin = async event => {
    event.preventDefault()

    const isFormLoginError = utils.isFormError(formLoginInputProps, formLogin)

    if (isFormLoginError || !captchaToken) { // Cek apakah CAPTCHA sudah diisi
      setShowErrorInput(true)
      if (!captchaToken) {
        toastify.error('Silakan lengkapi reCAPTCHA sebelum login.')
      }
    } else {
      setShowErrorInput(false)

      // Tambahkan token CAPTCHA ke form login
      const formWithCaptcha = { ...formLogin, captcha: captchaToken }

      handleLogin(formWithCaptcha, async () => {
        try {
          history.push('/')

          toastify.success('You have successfully logged in')

        } catch (error) {
          toastify.error('Maaf, terjadi kesalahan. Silakan muat ulang halaman beberapa saat lagi')
        }
      })
    }
  }

  const onChangeForm = useCallback(e => {
    setFormLogin(prevForm => ({
      ...prevForm,
      [e.target.name]: e.target.value
    }))
  }, [])

  const renderInput = (inputProps) => {
    return (
      <Input
        key={inputProps.name}
        id={inputProps.name}
        value={formLogin[inputProps.name || '']}
        onChange={onChangeForm}
        labelClassName='flex'
        showError={showErrorInput}
        setShowError={setShowErrorInput}
        {...inputProps}
      />
    )
  }

  const renderFormLogin = () => {
    const disabled = utils.isEmptyForm(formLogin)
    const loading = utils.isLazyLoading(lazyLoad, 'login')

    return (
      <form className='grid gap-y-6' onSubmit={onSubmitLogin}>
        {formLoginInputProps.map(form => renderInput(form))}

        <div className='flex'>
          <Text
            weight='font-semibold'
            href='/forgot-password'
            underlineOnHover
          >Lupa Kata Sandi?</Text>
        </div>

        {/* Tambahkan komponen reCAPTCHA */}
        <ReCAPTCHA
          sitekey="6LfhST4qAAAAAGeXNTARW8-LxVhEbnexBqEMxT2U"  // Ganti dengan site key dari Google reCAPTCHA
          onChange={onCaptchaChange}
        />

        <Button.ButtonPrimary
          sizing='w-full'
          disabled={disabled}
          loading={loading}
        >Masuk</Button.ButtonPrimary>
      </form>
    )
  }

  const renderButtonOAuth = (socialMedia) => {
    const srcLogo = images[`logo_${socialMedia}`]
    const name = utils.titleCase(socialMedia)

    return (

      <Button.BasicButton
        spacing='py-3 px-4'
        borderRadius='rounded-2sm'
        border='border border-grey-lighter-2'
        fontWeight='font-semibold'
        fontColor='text-black-primary'
        fontSize='text-base'
        shadow='shadow-none'
        className='flex items-center justify-center gap-3'
      >
        <img
          alt={name}
          src={srcLogo}
          className='w-8 h-8'
        />
        {name}
      </Button.BasicButton>
    )
  }

  return (
    <CardAuth>
      <div className='grid gap-y-6'>
        {/* {renderButtonOAuth('google')}
        {renderButtonOAuth('facebook')}

        <Text weight='font-semibold' align='text-center'>Atau</Text> */}

        {renderFormLogin()}

      </div>
    </CardAuth>
  )
}

export default LoginPage
