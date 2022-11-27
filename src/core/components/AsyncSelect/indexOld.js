import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import {
  Combobox,
  Portal,
  Transition
} from '@headlessui/react'
import { usePopper } from 'react-popper'

import { hooks, styleHelper } from 'utility'

import Text, { setResponsiveTextSize } from '../Text'
import Spinner from '../Loader/Spinner'
import { setResponsivePlaceholderTextSize } from '../Input'

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
  placeholder,
  renderOption,
  disabled,
  isMulti
}) => {
  const inputRef = useRef(null)
  const popperElRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [loadedOptions, setLoadedOptions] = useState([])
  const [defaultOptions, setDefaultOptions] = useState([])
  const [targetElement, setTargetElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)

  const options = query
    ? loadedOptions
    : (defaultOptions || [])
  const debouncedSearch = hooks.useDebounce(query, 800)

  const modifiers = useMemo(() => [
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`
      },
      phase: 'beforeWrite',
      requires: ['computeStyles']
    },
    {
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }
  ], [])

  const { styles, attributes } = usePopper(targetElement, popperElement, {
    placement: 'bottom-start',
    modifiers
  })

  const labelClassNames = (open) => styleHelper.classNames(
    'block font-primary',
    setResponsiveTextSize(labelSize),
    open
      ? 'text-drcGreen font-bold'
      : 'text-drcBlack-2',
    labelClassName
  )
  const placeholderResponsiveSize = setResponsivePlaceholderTextSize(textSize)

  const inputClassNames = (open) => styleHelper.classNames(
    'font-primary font-normal text-drcBlack-2',
    'placeholder:text-drcGrey-base placeholder:font-primary placeholder:font-normal',
    setResponsiveTextSize(textSize),
    ...placeholderResponsiveSize,
    inputClassName,
    isMulti ? 'max-w-[50%] w-full truncate' : 'block w-full border rounded-2lg',
    isMulti ? 'p-0' : padding,
    isMulti
      ? 'border-0 ring-0 focus:border-0 focus:ring-0 p-0'
      : open
        ? 'focus:ring-0 focus:border-drcGreen'
        : 'focus:ring-0 focus:border-drcGrey-soft border-drcGrey-soft',
    disabled
      ? isMulti
        ? 'bg-transparent'
        : 'bg-drcGrey-soft bg-opacity-50'
      : 'bg-white cursor-pointer',
    isMulti ? '' : 'custom-scrollbar'
  )

  const containerMultiSelectClassNames = (open) => styleHelper.classNames(
    'block w-full border rounded-2lg',
    padding,
    open
      ? 'focus:ring-0 focus:border-drcGreen'
      : 'focus:ring-0 focus:border-drcGrey-soft border-drcGrey-soft',
    disabled
      ? 'bg-drcGrey-soft bg-opacity-50'
      : 'bg-white cursor-pointer',
    'custom-scrollbar'
  )

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
    loadOptions(debouncedSearch, (options) => {
      setLoadedOptions(options || [])

      setIsTyping(false)
    })

    return () => {
      setLoadedOptions([])
    }
  }, [debouncedSearch])

  const onChangeQuery = (event) => {
    setIsTyping(true)
    setIsOpen(true)

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
    setIsOpen(true)
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

    setIsOpen(true)
  }
  /** End of multiple function */

  const renderIconSelect = (open) => {
    return (
      <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
        {open
          ? <ChevronUpIcon className='h-5 w-5 text-drcGreen' aria-hidden='true' />
          : <ChevronDownIcon className='h-5 w-5 text-drcGreen' aria-hidden='true' />}
      </div>
    )
  }

  const renderSelectContainer = (open) => {
    if (isMulti) {
      const arrSelected = value && Array.isArray(value) ? value : []

      return (
        <span className={containerMultiSelectClassNames(open)}>
          <div className='flex flex-wrap gap-2 max-h-12 overflow-y-auto custom-scrollbar'>
            {arrSelected.map((el, index) => (
              <span key={index} className='inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-drcGreen bg-opacity-10 text-drcGreen text-opacity-70'>
                {el.label}
                <span
                  className='flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-drcGreen text-opacity-40 hover:bg-drcGreen hover:bg-opacity-20 hover:text-drcGreen hover:text-opacity-50 focus:outline-none'
                  onClick={() => handleSelect(el)}
                >
                  <span className='sr-only'>Remove option</span>
                  <XMarkIcon className='w-3 h-3 text-drcGreen' />
                </span>
              </span>
            ))}

            <Combobox.Input
              ref={inputRef}
              onChange={onChangeQuery}
              className={inputClassNames(open)}
              displayValue={() => query}
              placeholder={placeholder}
              autoComplete='off'
              spellCheck={false}
              disabled={disabled}
            />
          </div>
        </span>
      )
    }

    return (
      <Combobox.Input
        ref={inputRef}
        className={inputClassNames(open)}
        onChange={onChangeQuery}
        displayValue={selected => selected.label}
        placeholder={!value?.value ? placeholder : undefined}
        autoComplete='off'
        spellCheck={false}
        disabled={disabled}
      />
    )
  }

  const renderOptions = () => {
    if (loading) {
      return (
        <div className='my-12.5 center-content'>
          <Spinner sizing='w-7.5 h-7.5' />
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

    return (
      <>
        {options.map((option, index) => (
          <Combobox.Option
            key={index}
            value={option}
            className={({ active }) => styleHelper.classNames(
              'cursor-pointer select-none relative py-2 pl-3 pr-9 w-full',
              active ? 'bg-drcGreen' : ''
            )}
          >
            {({ active, selected: selectedDefault }) => {
              const selected = isSelected(option, JSON.stringify(option.value) === JSON.stringify(value.value))

              return (
                <>
                  <Text
                    type='span'
                    weight={selected ? 'font-semibold' : 'font-normal'}
                    className={styleHelper.classNames(
                      active ? ' bg-drcGreen' : '',
                      'break-all'
                    )}
                    color={active ? 'text-white' : 'text-drcBlack-2'}
                    cursor='cursor-pointer'
                    size='text-sm'
                  >{renderOption
                    ? renderOption(option, active)
                    : option.label}</Text>

                  {selected && (
                    <span className={styleHelper.classNames(
                      'absolute inset-y-0 right-0 flex items-center pr-4',
                      active ? 'text-white' : 'text-drcBlack-2'
                    )}>
                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                    </span>
                  )}
                </>
              )
            }}
          </Combobox.Option>
        ))}
      </>
    )
  }

  return (
    <Combobox
      as='div'
      value={value && Array.isArray(value) ? [...value] : value}
      onChange={isMulti ? handleSelect : onChange}
      open={isMulti ? isOpen : undefined}
      disabled={disabled}
    >
      {({ open: openDefault }) => {
        const open = isMulti ? isOpen : openDefault

        return (
          <>
            <div className={labelClassNames(open)}>
              {typeof label === 'string'
                ? <Combobox.Label>{label}</Combobox.Label>
                : label()}
            </div>

            <div className={styleHelper.classNames('relative', spacing)} onClick={() => inputRef.current?.focus()}>
              <div ref={setTargetElement} onClick={isMulti && !disabled ? () => setIsOpen(!isOpen) : undefined}>
                {renderSelectContainer(open)}

                {isMulti
                  ? renderIconSelect(open)
                  : (
                    <Combobox.Button className={styleHelper.classNames('combobox-button', disabled ? 'cursor-default' : 'cursor-pointer')} disabled={disabled}>
                      {renderIconSelect(open)}
                    </Combobox.Button>
                  )}
              </div>

              <Portal>
                <div
                  ref={popperElRef}
                  style={styles.popper}
                  {...attributes.popper}
                >
                  <Transition
                    show={open}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                    beforeEnter={() => setPopperElement(popperElRef.current)}
                    afterLeave={() => setPopperElement(null)}
                  >
                    <Combobox.Options static className='z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 overflow-auto custom-scrollbar hover:outline-none'>
                      {!disabled && renderOptions()}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Portal>

            </div>
          </>
        )
      }}
    </Combobox>
  )
}

export default AsyncSelect
