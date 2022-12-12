import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Text, Input, Button } from 'core/components'
import { hooks, toastify, utils, validation } from 'utility'
import { actions } from 'store'

const formPasswordInputProps = [
  {
    label: 'Kata Sandi Sekarang',
    name: 'old_password',
    type: 'password'
  },
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

const FormChangePassword = ({
  selectedMenuId,
  showErrorInput,
  setShowErrorInput,
  formPassword,
  setFormPassword,
  userdata
}) => {
  const history = useHistory()

  const handleLogout = hooks.useCustomDispatch(actions.auth.handleLogout)
  const updateProfile = hooks.useCustomDispatch(actions.profile.updateProfile)

  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const onLogout = () => {
    handleLogout()

    history.replace('/login')
  }

  const onChangePassword = () => {
    updateProfile(
      { id: userdata?.resource_id, password: formPassword.password },
      () => {
        toastify.success('Ubah password berhasil. Silakan masuk kembali dengan password baru anda')

        onLogout()
      }
    )
  }

  const onSubmitForm = event => {
    event.preventDefault()

    const isFormError = utils.isFormError(formPasswordInputProps, formPassword)

    if (isFormError) {
      setShowErrorInput(true)
    } else {
      if (selectedMenuId === 'change_password') {
        const validationPassMatch = validation.passwordMatch(formPassword.password, formPassword.confirm_password)

        if (!validationPassMatch) {
          toastify.error('Password dan konfirmasi password tidak sesuai')

          return
        }
      }

      setShowErrorInput(false)

      onChangePassword()
    }
  }

  const onChangeForm = useCallback(e => {
    setFormPassword(prevForm => ({
      ...prevForm,
      [e.target.name]: e.target.value
    }))
  }, [])

  const renderInput = (inputProps) => {
    const keyName = inputProps.name || ''
    const value = formPassword[keyName]

    return (
      <Input
        key={keyName}
        id={keyName}
        value={value}
        onChange={onChangeForm}
        labelClassName='flex'
        showError={showErrorInput}
        setShowError={setShowErrorInput}
        {...inputProps}
      />
    )
  }

  const renderFormChangePassword = () => {
    const disabled = utils.isEmptyForm(formPassword)
    const loading = utils.isLazyLoading(lazyLoad, 'updateProfile')

    return (
      <form className='grid gap-y-3 mt-4' onSubmit={onSubmitForm}>
        {formPasswordInputProps.map(form => renderInput(form))}

        <div className='flex justify-end mt-7'>
          <Button.ButtonPrimary
            disabled={disabled}
            loading={loading}
            spacing='py-2 px-6'
          >Simpan</Button.ButtonPrimary>
        </div>
      </form>
    )
  }

  const renderChangePassword = () => {
    return (
      <div>
        <Text size='text-2xl' weight='font-semibold'>Kata Sandi</Text>

        {renderFormChangePassword()}
      </div>
    )
  }

  return renderChangePassword()
}

export default FormChangePassword