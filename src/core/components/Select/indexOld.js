import React, {
	useMemo,
	useRef,
	useState
} from 'react'
import {
	Listbox,
	Portal,
	Transition
} from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/solid'
import { ArrowDownIcon, ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePopper } from 'react-popper'

import { styleHelper } from 'utility'

import Text from '../Text'
import CustomIcon from '../CustomIcon'

const Select = ({
	list,
	value,
	placeholder,
	sizing = 'w-full',
	spacing = 'mt-1.5',
	padding = 'p-3 pr-0',
	border = 'border border-drcGrey-soft',
	shadow = 'shadow-none',
	bgColor = 'bg-white',
	iconType = 'chevron', // 'arrow', 'chevron'
	textProps,
	label,
	labelSize = 'text-sm',
	labelClassName,
	wrapperClassName,
	onChange,
	isMulti
}) => {
	const popperElRef = useRef(null)

	const [isOpen, setIsOpen] = useState(false)
	const [targetElement, setTargetElement] = useState(null)
	const [popperElement, setPopperElement] = useState(null)
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

	const selectClassNames = open => styleHelper.classNames(
		'relative rounded-lg cursor-pointer',
		open ? 'bg-white' : bgColor,
		open ? 'ring-0 border border-drcGreen' : border,
		sizing,
		spacing,
		padding,
		shadow,
		wrapperClassName
	)

	const labelClassNames = open => styleHelper.classNames(
		'block font-primary whitespace-nowrap',
		labelSize,
		open
			? 'text-drcGreen font-medium'
			: 'text-drcBlack-2',
		labelClassName
	)

	const isSelected = (option, selectedDefault) => {
		if (isMulti) return value.find((el) => el === option)

		return selectedDefault
	}

	const handleDeselect = option => {
		const selectedUpdated = value.filter(el => el !== option)
		onChange(selectedUpdated)
		setIsOpen(true)
	}

	const handleSelect = option => {
		if (!isSelected(option)) {
			const selectedUpdated = [
				...value,
				list.find(el => el === option)
			]

			onChange(selectedUpdated)
		} else {
			handleDeselect(option)
		}

		setIsOpen(true)
	}

	const renderIconSelect = (open) => {
		if (iconType === 'chevron') {
			return open
				? <ChevronUpIcon className='h-5 w-5 text-drcGreen' aria-hidden='true' />
				: <ChevronDownIcon className='h-5 w-5 text-drcGreen' aria-hidden='true' />
		}

		return (
			<ArrowDownIcon className={styleHelper.classNames(
				open
					? 'rotate-180 fill-drcGreen'
					: 'rotate-0 fill-drcBlack-1'
			)} />
		)
	}

	return (
		<Listbox
			value={value && Array.isArray(value) ? [...value] : value}
			onChange={isMulti ? handleSelect : onChange}
			open={isMulti ? isOpen : undefined}
		>
			{({ open: openDefault }) => {
				const open = isMulti ? isOpen : openDefault
				const selectedTextProps = {
					size: 'text-sm',
					color: !value.value ? 'text-drcGrey-base' : 'text-drcBlack-2',
					weight: 'font-normal',
					cursor: 'cursor-pointer',
					align: 'text-left',
					className: 'truncate',
					...textProps
				}
				const selectedText = !value || !value?.value || (isMulti && !value.length)
					? placeholder
					: value.label

				return (
					<div className='flex flex-col'>
						<Listbox.Label className={labelClassNames(open)}>
							{label}
						</Listbox.Label>

						<div className='relative group'>
							<div ref={setTargetElement} onClick={isMulti ? () => setIsOpen(!isOpen) : undefined}>
								<Listbox.Button className={selectClassNames(open)} open={open}>
									<span className='flex items-start'>
										{(isMulti && Array.isArray(value) && !value.length) || !isMulti
											? <Text {...selectedTextProps}>{selectedText}</Text>
											: null}

										{isMulti && (
											<div className='flex flex-wrap gap-2'>
												{value?.map((el, index) => (
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
											</div>
										)}
									</span>
									<span className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
										{renderIconSelect(open)}
									</span>
								</Listbox.Button>
							</div>

							<Portal>
								<div
									ref={popperElRef}
									style={styles.popper}
									{...attributes.popper}
								>
									<Transition
										show={open}
										unmount={false}
										enter='transition ease-out duration-100'
										enterFrom='transform opacity-0 scale-95'
										enterTo='transform opacity-100 scale-100'
										leave='transition ease-in duration-75'
										leaveFrom='transform opacity-100 scale-100'
										leaveTo='transform opacity-0 scale-95'
										beforeEnter={() => setPopperElement(popperElRef.current)}
										afterLeave={() => setPopperElement(null)}
									>
										<Listbox.Options static className='z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 overflow-auto custom-scrollbar hover:outline-none'>
											{
												list && list.length
													? (
														<>
															{list.map((data, index) => (
																<Listbox.Option
																	key={index}
																	className={({ active }) => styleHelper.classNames(
																		active ? 'text-white bg-drcGreen' : '',
																		'cursor-pointer select-none relative py-2 pl-3 pr-9'
																	)}
																	value={data}
																>
																	{({ selected: selectedDefault, active }) => {
																		const selected = isSelected(data, JSON.stringify(data.value) === JSON.stringify(value.value))
																		const listTextProps = {
																			size: 'text-sm',
																			weight: selected ? 'font-semibold' : 'font-normal',
																			className: styleHelper.classNames(
																				active ? 'bg-drcGreen' : '',
																				'truncate'
																			),
																			color: active ? 'text-white' : 'text-drcBlack-2',
																			cursor: 'cursor-pointer',
																			...textProps
																		}
																		const text = data.label

																		return (
																			<>
																				<Text {...listTextProps}>{text}</Text>

																				{selected ? (
																					<span
																						className={styleHelper.classNames(
																							active ? 'text-white' : 'text-drcGreen',
																							'font-primary absolute inset-y-0 right-0 flex items-center pr-4'
																						)}
																					>
																						<CheckIcon className='h-5 w-5' aria-hidden='true' />
																					</span>
																				) : null}
																			</>
																		)
																	}}
																</Listbox.Option>
															))}
														</>
													) : (
														<div className='cursor-default select-none relative py-2 pl-3 pr-9 text-drcBlack-2 text-sm font-primary'>
															Nothing found.
														</div>
													)
											}
										</Listbox.Options>
									</Transition>
								</div>
							</Portal>
						</div>
					</div>
				)
			}}
		</Listbox>
	)
}

export default Select
