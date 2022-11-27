import React, { useState, useCallback, useContext } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Text, Button, Input } from 'core/components'
import { localStorageHelper, utils, AbilityContext } from 'utility'

import { CardAuth } from '../components'
import { images } from 'constant'

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
  const ability = useContext(AbilityContext)

  const lazyLoad = useSelector(state => state.misc).lazyLoad
  const navigations = useSelector(state => state.navigations).allData

  const [formLogin, setFormLogin] = useState({
    username: '',
    password: ''
  })
  const [showErrorInput, setShowErrorInput] = useState(false)

  const onSubmitLogin = async event => {
    event.preventDefault()

    const isFormLoginError = utils.isFormError(formLoginInputProps, formLogin)

    if (isFormLoginError) {
      setShowErrorInput(true)
    } else {
      setShowErrorInput(false)

      // handle login dispatch
      // u/ dummy, simpan localstorage, save navigations to abilitys
      await localStorageHelper.setItem('userData', utils.removeProperties(formLogin, 'password'))

      history.push('/')
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
            underlineOnHover
          >Lupa Kata Sandi?</Text>
        </div>

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
        {renderButtonOAuth('google')}
        {renderButtonOAuth('facebook')}

        <Text weight='font-semibold' align='text-center'>Atau</Text>

        {renderFormLogin()}
      </div>
    </CardAuth>
  )
}

export default LoginPage