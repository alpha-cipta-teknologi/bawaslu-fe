import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ClockIcon, EyeIcon, EyeSlashIcon, MagnifyingGlassIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'

import { styleHelper, utils } from 'utility'

import Text, { setResponsiveTextSize } from '../Text'
import CustomIcon from '../CustomIcon'

/* eslint-disable no-unused-expressions */
export const setResponsivePlaceholderTextSize = textSize => {
  return setResponsiveTextSize(textSize).split(' ')
    .map(size => `placeholder:${size}`)
}

const Input = ({
  id,
  name,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  placeholder = '',
  label = '',
  type = 'text',
  errorText = '',
  rows = 3,
  value,
  textSize = 'text-sm',
  labelSize = 'text-sm',
  leadingIcon,
  trailingIcon,
  onChange,
  onChangeFile,
  onDropFile,
  required = false,
  spacing = 'mt-1',
  bgColor = 'bg-white',
  disabled = false,
  restrictVal,
  showError,
  setShowError,
  children,
  borderColor = 'border-grey-lighter-2',
  acceptFile,
  ...rest
}) => {
  const inputRef = useRef(null)

  const [focus, setFocus] = useState(false)
  const [inputType, setInputType] = useState(type)
  const [error, setError] = useState(errorText || '')

  const labelClassNames = styleHelper.classNames(
    'block font-primary text-blue-navy',
    setResponsiveTextSize(labelSize),
    labelClassName,
    'pt-3 px-3.5'
  )
  const placeholderResponsiveSize = setResponsivePlaceholderTextSize(textSize)

  const inputClassNames = styleHelper.classNames(
    'font-primary font-normal text-blue-navy',
    setResponsiveTextSize(textSize),
    'focus:ring-0 outline-0 border-0 block w-full px-3.5 rounded',
    label ? 'pb-3 pt-0.5' : 'py-3',
    'placeholder:text-grey-light-7 placeholder:font-primary placeholder:font-normal',
    ...placeholderResponsiveSize,
    label ? spacing : '',
    inputClassName,
    disabled
      ? 'bg-grey-light-5 bg-opacity-50'
      : focus
        ? 'bg-white'
        : bgColor
  )

  useEffect(() => {
    if (showError && value) {
      setError(utils.validationErrorText(value, name, label))
    }
  }, [showError, value])

  const onChangeForm = e => {
    onChange && onChange(e)

    setError('')

    setShowError && setShowError(false)
  }

  const handleDragOver = e => e.preventDefault()

  const handleDrop = e => {
    e.preventDefault()

    onDropFile && onDropFile(e)
  }

  const onClickTogglePassword = () => {
    setInputType(prevInput => {
      if (prevInput === 'password') {
        return 'text'
      } else {
        return 'password'
      }
    })
  }

  const renderLabel = () => {
    return (
      <label htmlFor={id} className={labelClassNames}>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
    )
  }

  const renderInput = () => {
    return (
      <>
        <input
          id={id}
          ref={inputRef}
          type={inputType}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChangeForm}
          className={inputClassNames}
          disabled={disabled}
          autoComplete='off'
          min={inputType === 'number' ? restrictVal?.min || 0 : undefined}
          onKeyPress={inputType === 'number'
            ? e => {
              if (/\+|-|e/.test(e.key) || (!value && e.key < (restrictVal?.min || 0))) {
                e.preventDefault()
              }
            }
            : undefined}
          {...rest}
        />
      </>
    )
  }

  const renderEyeIcon = () => {
    const iconClassName = 'w-5 h-5 text-black-primary cursor-pointer'

    if (inputType === 'password') {
      return <EyeIcon className={iconClassName} />
    }

    return <EyeSlashIcon className={iconClassName} />
  }

  const renderInputBasedOnType = () => {
    switch (type) {
      case 'password':
        return (
          <>
            <div className='absolute inset-y-0 right-0 flex items-center px-5 py-[0.813rem]'>
              <input
                className='hidden js-password-toggle'
                id={`toggle-${id}`}
                type='checkbox'
              />

              <label
                className='cursor-pointer js-password-label'
                htmlFor={`toggle-${id}`}
                onClick={onClickTogglePassword}
              >{renderEyeIcon()}</label>
            </div>

            {renderInput()}
          </>
        )

      case 'search':
        return (
          <div className='relative'>
            {renderInput()}

            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <MagnifyingGlassIcon className='text-gray-400' />
            </div>
          </div>
        )

      case 'date':
        return (
          <>
            {renderInput()}

            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <CustomIcon iconName='calendar' className='w-5 h-5' />
            </div>
          </>
        )
      case 'time':
        return (
          <div className='relative'>
            {renderInput()}

            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <ClockIcon className='w-5 h-5 text-gray-400' />
            </div>
          </div>
        )

      case 'textarea':
        return (
          <div className='relative'>
            {leadingIcon ? (
              <div className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-start pointer-events-none'>
                {leadingIcon()}
              </div>
            ) : null}

            <textarea
              rows={rows}
              className={inputClassNames}
              id={id}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={onChange}
              {...rest}
            />
          </div>
        )
      case 'photo_profile':
        return (
          <>
            {children}

            <div className='w-auto mt-2'>
              <label htmlFor={id} className='inline-flex cursor-pointer w-auto'>
                <input
                  id={id}
                  name={name}
                  type='file'
                  className='sr-only'
                  onChange={onChangeFile}
                  {...rest}
                />

                <Text
                  weight='font-bold'
                  size='text-sm'
                  cursor='cursor-pointer'
                >{value ? 'Ubah' : 'Pilih'} Foto</Text>
              </label>
            </div>
          </>
        )
      case 'file':
        return (
          <div className='sm:col-span-6'>
            <label htmlFor={id} className='cursor-pointer'>
              <div className={inputClassNames}>
                <div className='flex'>
                  <div className='mr-4 flex-shrink-0'>
                    <span className='bg-gray-200 py-1 px-3 rounded-lg'>
                      <span className={styleHelper.classNames('relative font-primary text-blue-navy', textSize)}>{placeholder}</span>
                    </span>

                    <input
                      id={id}
                      name={name}
                      type='file'
                      className='sr-only'
                      onChange={onChangeFile}
                      {...rest}
                    />
                  </div>

                  <Text
                    size={textSize}
                    color='text-drcGrey-base'
                    className='truncate break-all'
                  >{value && value instanceof File
                    ? value.name
                    : 'No File Choosen'}
                  </Text>
                </div>
              </div>
            </label>

            <Text
              size='text-xxs'
              weight='font-normal'
              color='text-drcGrey-base'
              spacing='mt-1'
            >*Max Size File Upload 2 MB</Text>
          </div>
        )
      case 'file-dropzone':
        return (
          <div className='relative'>
            <label htmlFor={id} className='cursor-pointer'>
              <div
                className='flex justify-center px-6 py-7 rounded'
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className='space-y-1.5 text-center'>
                  <div className='flex items-center justify-center'>
                    <input
                      id={id}
                      name={name}
                      type='file'
                      className='sr-only'
                      onChange={onChangeFile}
                      accept={acceptFile}
                      {...rest}
                    />
                  </div>
                  <span className='flex flex-col justify-center items-center gap-2'>
                    <CloudArrowUpIcon className='w-6 h-6 text-[#4F4F4F]' />

                    <Text
                      type='span'
                      color='text-[#4F4F4F]'
                      size={textSize}
                    >Drag gambar, atau{' '}
                      <Text size={textSize} type='span' color='text-blue-600' className='underline underline-offset-1 decoration-blue-600'>
                        browse
                      </Text>
                    </Text>
                  </span>
                </div>
              </div>
            </label>
          </div>
        )
      default:
        return (
          <div className='relative'>
            {leadingIcon ? (
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                {leadingIcon()}
              </div>
            ) : null}

            {renderInput()}

            {trailingIcon ? (
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                {trailingIcon()}
              </div>
            ) : null}
          </div>
        )
    }
  }

  return (
    <div
      className={containerClassName}
      onClick={() => inputRef.current?.focus()}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {type === 'photo_profile'
        ? renderInputBasedOnType()
        : (
          <div className={styleHelper.classNames(
            'block w-full border rounded relative',
            focus
              ? 'border-blue-midnight'
              : borderColor,
            disabled
              ? 'bg-grey-light-5 bg-opacity-50'
              : focus && type !== 'file-dropzone'
                ? 'bg-white'
                : bgColor
          )}>
            {label && renderLabel()}

            {renderInputBasedOnType()}
          </div>
        )}

      {(errorText || error) && (
        <Text
          color='text-red-500'
          size='text-xs'
          spacing='pl-2 mt-2'
        >{errorText || error}</Text>
      )}
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  rows: PropTypes.number,
  onChange: PropTypes.func,
  onChangeFile: PropTypes.func,
  onDropFile: PropTypes.func,
  type: PropTypes.oneOf([
    'text',
    'email',
    'url',
    'password',
    'number',
    'date',
    'datetime-local',
    'month',
    'search',
    'tel',
    'time',
    'week',
    'checkbox',
    'radio',
    'file',
    'file-dropzone',
    'photo_profile',
    'textarea'
  ]),
  errorText: PropTypes.string,
  textSize: PropTypes.string,
  labelSize: PropTypes.string,
  leadingIcon: PropTypes.element,
  trailingIcon: PropTypes.element,
  spacing: PropTypes.string,
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  showError: PropTypes.bool,
  setShowError: PropTypes.func
}

export default Input