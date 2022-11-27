import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from '@headlessui/react'

import { styleHelper } from 'utility'

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <Switch
      checked={ checked }
      onChange={ onChange }
      className={ styleHelper.classNames(
        checked ? 'bg-white' : 'bg-gray-200',
        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 outline-none ring-2 ring-offset-2 ring-drcGreen'
      ) }
    >
      <span className='sr-only'>Use setting</span>
      <span
        aria-hidden='true'
        className={ styleHelper.classNames(
          checked ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-drcGreen shadow transform ring-0 transition ease-in-out duration-200'
        ) }
      />
    </Switch>
  )
}

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

export default ToggleSwitch