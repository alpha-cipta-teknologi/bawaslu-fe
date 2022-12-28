import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { Combobox } from '@headlessui/react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

import { styleHelper, hooks } from 'utility'

import Spinner from '../Loader/Spinner'
import PortalSelect from '../PortalSelect'
import Text, { setResponsiveTextSize } from '../Text'

const AsyncSelect = ({
  loadOptions: propsLoadOptions,
  defaultOptions: propsDefaultOptions,
  value,
  onChange,
  loading,
  label,
  spacing = 'mt-1.5',
  padding = 'p-3 pr-10',
  labelClassName,
  inputClassName,
  textSize = 'text-sm',
  labelSize = 'text-sm',
  borderRadius = 'rounded-lg',
  placeholder,
  renderOption,
  disabled,
  isMulti,
  borderColor = 'border-grey-lighter-2',
  bgColor = 'bg-white'
}) => {
  const inputRef = useRef(null)

  const [query, setQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [loadedOptions, setLoadedOptions] = useState([])
  const [defaultOptions, setDefaultOptions] = useState([])

  const debouncedQuery = hooks.useDebounce(query, 800)
  const options = query
    ? loadedOptions
    : (defaultOptions || [])

  // loadOptions digunakan jika defaultOptions tidak mencakup semua data karena butuh hit API yang menggunakan pagination
  const loadOptions = useCallback((inputValue, callback) => {
    if (!propsLoadOptions) return callback()
    const loader = propsLoadOptions(inputValue, callback)
    if (loader && typeof loader.then === 'function') {
      loader.then(callback, () => callback())
    }
  }, [propsLoadOptions])

  useEffect(() => {
    if (propsDefaultOptions) {
      setDefaultOptions(propsDefaultOptions || [])
    }
  }, [loading])

  useEffect(() => {
    if (propsLoadOptions) {
      loadOptions(debouncedQuery, newOptions => {
        setLoadedOptions(newOptions || [])

        setIsTyping(false)
      })

      return () => {
        setLoadedOptions([])
      }
    }
  }, [debouncedQuery])

  const inputClassNames = (open) => styleHelper.classNames(
    'font-primary font-normal text-blue-navy',
    setResponsiveTextSize(textSize),
    // 'placeholder:text-drcGrey-base placeholder:font-primary placeholder:font-normal',
    // ...placeholderResponsiveSize,
    inputClassName,
    isMulti ? 'max-w-[50%] w-full truncate' : 'block w-full rounded',
    isMulti ? 'p-0' : padding,
    isMulti
      ? 'border-0 ring-0 focus:border-0 focus:ring-0 p-0'
      : 'focus:ring-0 outline-0 border-0',
    disabled
      ? isMulti
        ? 'bg-transparent'
        : 'bg-grey-light-5 bg-opacity-50'
      : open
        ? 'bg-white'
        : bgColor,
    isMulti ? '' : 'custom-scrollbar-secondary'
  )

  const labelClassNames = styleHelper.classNames(
    'block font-primary text-blue-navy',
    setResponsiveTextSize(labelSize),
    labelClassName,
    'pt-3 px-3.5'
  )

  const onChangeQuery = event => {
    setIsTyping(true)

    const inputValue = event.target.value

    setQuery(inputValue)
  }

  const isSelected = (option, selectedDefault) => {
    if (isMulti) return value.find((el) => `${el.value}` === `${option.value}`)

    return selectedDefault
  }

  /** Multiple Function */
  const handleDeselect = option => {
    const selectedUpdated = value.filter(el => `${el.value}` !== `${option.value}`)
    onChange(selectedUpdated)
  }

  const handleSelect = option => {
    setQuery('')

    if (!isSelected(option)) {
      const selectedUpdated = [
        ...value,
        options.find(el => `${el.value}` === `${option.value}`)
      ]

      onChange(selectedUpdated)
    } else {
      handleDeselect(option)
    }
  }
  /** End of multiple function */

  const renderComboboxButton = open => {
    const ChevronIcon = open ? ChevronUpIcon : ChevronDownIcon

    return (
      <Combobox.Button
        className={styleHelper.classNames(
          'combobox-button',
          disabled ? 'cursor-default' : 'cursor-pointer'
        )}
        disabled={disabled}
      >
        <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
          <ChevronIcon
            className={styleHelper.classNames(
              'h-5 w-5',
              open
                ? 'text-blue-midnight'
                : 'text-black-default'
            )}
            aria-hidden='true'
          />
        </div>
      </Combobox.Button>
    )
  }

  const renderSelectContainer = open => {
    const containerSelectClassNames = styleHelper.classNames(
      'block w-full border rounded relative',
      open
        ? 'border-blue-midnight'
        : borderColor,
      disabled
        ? 'bg-grey-light-5 bg-opacity-50'
        : open
          ? 'bg-white'
          : bgColor
    )

    if (isMulti) {
      return (
        <>
          <span className={containerSelectClassNames}>
            <div className={labelClassNames}>
              {typeof label === 'string'
                ? <Combobox.Label>{label}</Combobox.Label>
                : label()}
            </div>

            <div className={styleHelper.classNames(
              'flex flex-wrap gap-2 overflow-y-auto custom-scrollbar-secondary',
              padding
            )}>
              {value?.map((option, index) => {
                return (
                  <span key={index} className='inline-flex z-10 rounded-xl items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-blue-midnight bg-opacity-10 text-blue-midnight text-opacity-70'>
                    {option.label}
                    <span
                      className='flex-shrink-0 ml-0.5 h-4 w-4 rounded-xl inline-flex items-center justify-center text-blue-midnight text-opacity-40 hover:bg-blue-midnight hover:bg-opacity-20 hover:text-blue-midnight hover:text-opacity-50 focus:outline-none'
                      onClick={() => handleSelect(option)}
                    >
                      <span className='sr-only'>Remove option</span>
                      <XMarkIcon className='w-3 h-3 text-blue-midnight' />
                    </span>
                  </span>
                )
              })}

              <Combobox.Input
                ref={inputRef}
                className={inputClassNames(open)}
                onChange={onChangeQuery}
                placeholder={placeholder}
                spellCheck={false}
                disabled={disabled}
                autoComplete='off'
              />
            </div>
          </span>

          {renderComboboxButton(open)}
        </>
      )
    }

    return (
      <div className={containerSelectClassNames}>
        <div className={labelClassNames}>
          {typeof label === 'string'
            ? <Combobox.Label>{label}</Combobox.Label>
            : label()}
        </div>

        <Combobox.Input
          ref={inputRef}
          onChange={onChangeQuery}
          displayValue={selected => selected.label}
          placeholder={!value?.value ? placeholder : undefined}
          className={inputClassNames(open)}
          spellCheck={false}
          disabled={disabled}
          autoComplete='off'
        />

        {renderComboboxButton(open)}
      </div>
    )
  }

  const renderOptions = () => {
    if (loading) {
      return (
        <div className='my-12.5 center-content'>
          <Spinner sizing='w-7 h-7' color='text-blue-midnight' />
        </div>
      )
    }

    if ((!options || !options?.length) && query !== '' && !isTyping) {
      return (
        <div className='cursor-default select-none relative py-2 pl-3'>
          <Text size='text-sm'>Nothing found.</Text>
        </div>
      )
    }

    return options?.map((option, index) => (
      <Combobox.Option
        key={index}
        value={option}
        className={({ active }) => styleHelper.classNames(
          'cursor-pointer select-none relative py-2 pl-3 pr-9 w-full',
          active ? 'bg-blue-midnight' : ''
        )}
      >
        {({ active, selected: selectedDefault }) => {
          const selected = propsLoadOptions
            ? isMulti
              ? isSelected(option)
              : value?.value === option.value
            : selectedDefault

          return (
            <>
              <Text
                type='span'
                weight={selected ? 'font-semibold' : 'font-normal'}
                className={styleHelper.classNames(
                  active ? ' bg-blue-midnight' : '',
                  'break-all'
                )}
                color={active ? 'text-white' : 'text-drcBlack-2'}
                cursor='cursor-pointer'
                size='text-sm'
              >{renderOption
                ? renderOption(option, active)
                : option.label}</Text>

              {selected && (
                <span className='absolute inset-y-0 right-0 flex items-center pr-4'>
                  <CheckIcon
                    className={styleHelper.classNames(
                      active ? 'text-white' : 'text-blue-midnight',
                      'w-5 h-5'
                    )}
                    aria-hidden='true'
                  />
                </span>
              )}
            </>
          )
        }}
      </Combobox.Option>
    ))
  }

  return (
    <Combobox
      as='div'
      value={value}
      onChange={props => {
        onChange(props)
        setQuery('')
      }}
      multiple={isMulti}
    >
      {({ open }) => {
        return (
          <>

            <div className={styleHelper.classNames('relative', spacing)} onClick={() => inputRef.current?.focus()}>
              <PortalSelect
                open={open}
                renderTargetElement={() => renderSelectContainer(open)}
              // afterLeave={() => setQuery('')}
              >
                <Combobox.Options className={styleHelper.classNames(borderRadius, 'z-10 mt-1 w-full bg-white shadow-lg max-h-60 py-1 overflow-auto custom-scrollbar-secondary hover:outline-none ring-1 ring-black-default ring-opacity-5 focus:outline-none')}>
                  {!disabled && renderOptions()}
                </Combobox.Options>
              </PortalSelect>
            </div>
          </>
        )
      }}
    </Combobox>
  )
}

export default AsyncSelect