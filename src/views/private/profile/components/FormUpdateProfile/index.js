import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Text, CustomIcon, Input, Button } from 'core/components'
import { hooks, toastify, utils, validation } from 'utility'
import { actions } from 'store'
import { apiConfig } from 'configs'

const formProfileInputProps = [
  {
    name: 'image_foto',
    type: 'photo_profile'
  },
  {
    label: 'Nama Lengkap',
    name: 'full_name',
    type: 'text'
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
  }
]

const InputUploadProfile = ({ children, value, onChangeFile }) => {
  return (
    <Input
      type='photo_profile'
      value={value}
      onChangeFile={onChangeFile}
    >{children}</Input>
  )
}

const FormUpdateProfile = ({
  selectedMenuId,
  showErrorInput,
  setShowErrorInput,
  userdata
}) => {
  const getDataProfile = hooks.useCustomDispatch(actions.profile.getDataProfile)
  const updateProfile = hooks.useCustomDispatch(actions.profile.updateProfile)

  const profile = useSelector(state => state.profile).profile
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const [formProfile, setFormProfile] = useState({
    full_name: '',
    email: '',
    telepon: '',
    image_foto: ''
  })
  const [profilePicture, setProfilePicture] = useState(profile?.image_foto || '')
  const [isChangeProfilePicture, setIsChangeProfilePicture] = useState(false)

  const fetchProfileData = () => {
    getDataProfile(userdata.resource_id, data => {
      setFormProfile(prevData => ({
        ...prevData,
        full_name: data.full_name,
        email: data.email,
        telepon: data.telepon,
        image_foto: data.image_foto
      }))
    })
  }

  useEffect(() => {
    if (userdata && userdata?.resource_id && selectedMenuId === 'profile') {
      fetchProfileData()
    }
  }, [selectedMenuId, userdata?.resource_id])

  const onSaveUpdateProfile = () => {
    updateProfile(
      {
        id: userdata?.resource_id,
        full_name: formProfile.full_name,
        email: formProfile.email,
        telepon: formProfile.telepon,
        ...isChangeProfilePicture
          ? { image_foto: formProfile.image_foto }
          : {}
      },
      () => {
        toastify.success('Ubah profil berhasil')

        fetchProfileData()
      }
    )
  }

  const onSubmitForm = (event) => {
    event.preventDefault()

    const isFormError = utils.isFormError(formProfileInputProps, formProfile)

    if (isFormError) {
      setShowErrorInput(true)
    } else {
      setShowErrorInput(false)

      onSaveUpdateProfile()
    }
  }

  const onChangeFile = useCallback(async (event) => {
    try {
      setFile(event.target.files ? event.target.files[0] : null)
    } catch (error) {
      toastify.error('Terjadi kesalahan saat mengupload')
    }
  }, [])

  const onChangeForm = useCallback((e, keyName) => {
    if (keyName === 'image_foto') {
      onChangeFile(e)
    } else {
      setFormProfile(prevForm => ({
        ...prevForm,
        [e.target.name]: e.target.value
      }))
    }
  }, [])

  const onChangeProfilePicture = useCallback(async (event) => {
    try {
      const file = event.target.files ? event.target.files[0] : null
      const imageBase64 = await utils.getBase64(file)

      if (file) {
        const isImageValid = validation.uploadImage(file, 10)

        if (isImageValid) {

          setFormProfile(prevForm => ({
            ...prevForm,
            image_foto: file
          }))

          setProfilePicture(
            imageBase64 && typeof imageBase64 === 'string'
              ? imageBase64
              : ''
          )

          setIsChangeProfilePicture(true)
        }
      }
    } catch (error) {
      toastify.error('Terjadi kesalahan saat mengupload')

      setIsChangeProfilePicture(false)
    }
  }, [])

  const renderInput = (inputProps) => {
    const keyName = inputProps.name || ''
    const value = formProfile[keyName]

    if (inputProps.type === 'photo_profile') {
      return (
        <InputUploadProfile
          key={keyName}
          value={value}
          onChangeFile={onChangeProfilePicture}
        >
          <span className='bg-[#FAFAFA] rounded w-20 h-20 relative flex border border-[#F0F0F0]'>
            {value ? (
              <img
                src={typeof value === 'string' ? utils.getImageAPI(value) : profilePicture}
                className='w-full h-full object-cover'
                alt='profile'
              />
            ) : (
              <span className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
                <CustomIcon iconName='user' className='stroke-blue-navy' />
              </span>
            )}
          </span>
        </InputUploadProfile>
      )
    }

    return (
      <Input
        key={keyName}
        id={keyName}
        value={value}
        onChange={e => onChangeForm(e, keyName)}
        labelClassName='flex'
        showError={showErrorInput}
        setShowError={setShowErrorInput}
        {...inputProps}
      />
    )
  }

  const renderFormProfile = () => {
    const disabled = utils.isEmptyForm(formProfile)
    const loading = utils.isLazyLoading(lazyLoad, 'updateProfile')

    return (
      <form className='grid gap-y-3' onSubmit={onSubmitForm}>
        {formProfileInputProps.map(form => renderInput(form))}

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

  const renderPersonalInfo = () => {
    return (
      <div>
        <Text size='text-2xl' weight='font-semibold'>Informasi Pribadi</Text>

        <div className='grid gap-y-3 mt-4'>
          {renderFormProfile()}
        </div>
      </div>
    )
  }

  return renderPersonalInfo()
}

export default FormUpdateProfile