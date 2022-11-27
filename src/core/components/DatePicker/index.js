import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'

import DateRange from './DatePickerRange'
import InputDatePicker from './components/Input'
import HeaderDatePicker from './components/Header'
import Label from './components/Label'

import './style.css'

const BasicDate = ({
  inputClassName,
  spacing = 'mt-1.5',
  padding = 'p-3 pr-0',
  textSize = 'text-sm',
  labelSize = 'text-sm',
  label,
  value,
  setValue,
  placeholder
}) => {
  const [focus, setFocus] = useState(false)

  const renderLabel = () => {
    return (
      <Label
        focus={ focus }
        label={ label }
        labelSize={ labelSize }
      />
    )
  }

  return (
    <div>
      { renderLabel() }

      <DatePicker
        portalId='root'
        selected={ value }
        closeOnScroll={ (e) => e.target === document }
        onChange={ date => setValue(date) }
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
        onCalendarClose={ () => setFocus(false) }
        onCalendarOpen={ () => setFocus(true) }
        renderCustomHeader={ params => <HeaderDatePicker { ...params } /> }
      />
    </div>
  )
}

BasicDate.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.func,
  inputClassName: PropTypes.string,
  textSize: PropTypes.string,
  labelSize: PropTypes.string,
  label: PropTypes.string,
  spacing: PropTypes.string,
  padding: PropTypes.string,
  placeholder: PropTypes.string
}

export default {
  BasicDate,
  DateRange
}