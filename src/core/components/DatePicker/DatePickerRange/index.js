import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

import InputDatePicker from '../components/Input'
import HeaderDatePicker from '../components/Header'
import Label from '../components/Label'

import '../style.css'

const CustomDatePickerRange = ({
  inputClassName,
  spacing = 'mt-1.5',
  padding = 'p-3 pr-0',
  textSize = 'text-sm',
  labelSize = 'text-sm',
  labelStart,
  labelEnd,
  placeholderStart,
  placeholderEnd,
  className,
  startDate,
  endDate,
  setStartDate,
  setEndDate
}) => {
  const [focusStart, setFocusStart] = useState(null)
  const [focusEnd, setFocusEnd] = useState(null)

  const renderLabelStart = () => {
    return (
      <Label
        focus={ focusStart }
        label={ labelStart }
        labelSize={ labelSize }
      />
    )
  }

  const renderLabelEnd = () => {
    return (
      <Label
        focus={ focusEnd }
        label={ labelEnd }
        labelSize={ labelSize }
      />
    )
  }

  const renderDatePicker = (type) => {
    const isPickerStart = type === 'start'
    const placeholder = isPickerStart ? placeholderStart : placeholderEnd

    return (
      <DatePicker
        portalId='root'
        selected={ isPickerStart ? startDate : endDate }
        onChange={ date => {
          isPickerStart
            ? setStartDate(date)
            : setEndDate(date)
        } }
        selectsStart={ isPickerStart }
        selectsEnd={ !isPickerStart }
        startDate={ startDate }
        endDate={ endDate }
        minDate={ !isPickerStart && startDate }
        closeOnScroll={ (e) => e.target === document }
        customInput={ (
          <InputDatePicker
            placeholder={ placeholder }
            textSize={ textSize }
            spacing={ spacing }
            padding={ padding }
            inputClassName={ inputClassName }
          />
        ) }
        placeholderText={ placeholder }
        onCalendarClose={ () => {
          isPickerStart ? setFocusStart(false) : setFocusEnd(false)
        } }
        onCalendarOpen={ () => {
          isPickerStart ? setFocusStart(true) : setFocusEnd(true)
        } }
        renderCustomHeader={ params => <HeaderDatePicker { ...params } /> }
      />
    )
  }

  return (
    <div className={ className }>
      <div>
        { renderLabelStart() }
        { renderDatePicker('start') }
      </div>

      <div>
        { renderLabelEnd() }
        { renderDatePicker('end') }
      </div>
    </div>
  )
}

export default CustomDatePickerRange