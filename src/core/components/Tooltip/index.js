import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { createPopper } from '@popperjs/core'

import Text from '../Text'

import './style.css'

const Tooltip = ({
  children,
  title,
  description,
  style,
  placement
}) => {
  useEffect(() => {
    document.querySelectorAll('[data-tooltip-target]').forEach((tooltipToggleEl) => {
      let popperInstance = null
      const tooltipEl = document.getElementById(tooltipToggleEl.getAttribute('data-tooltip-target') || '')
      const trigger = tooltipToggleEl.getAttribute('data-tooltip-trigger')

      if (tooltipEl) {
        popperInstance = createPopper(tooltipToggleEl, tooltipEl, {
          placement: placement || 'bottom',
          modifiers: [
            {
              name: 'offset',
              options: { offset: [0, 8] }
            }
          ]
        })

        tooltipEl.style.removeProperty('margin')
      }
      const show = () => {
        // Make the tooltip visible
        if (tooltipEl) {
          tooltipEl.classList.remove('opacity-0')
          tooltipEl.classList.add('opacity-100')
          tooltipEl.classList.remove('invisible')
          tooltipEl.classList.add('visible')
          tooltipEl.style.removeProperty('margin')

          // Enable the event listeners
          popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
              {
                name: 'offset',
                options: { offset: [0, 8] }
              }, {
                name: 'eventListeners',
                enabled: true
              }
            ]
          }))

          // Update its position
          popperInstance.update()
        }
      }

      const hide = () => {
        // Hide the tooltip
        if (tooltipEl) {
          tooltipEl.classList.remove('opacity-100')
          tooltipEl.classList.add('opacity-0')
          tooltipEl.classList.remove('visible')
          tooltipEl.classList.add('invisible')
          tooltipEl.style.removeProperty('margin')

          // Disable the event listeners
          popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
              {
                name: 'offset',
                options: { offset: [0, 8] }
              }, {
                name: 'eventListeners',
                enabled: false
              }
            ]
          }))
        }
      }

      let showEvents = []
      let hideEvents = []

      switch (trigger) {
        case 'click':
          showEvents = ['click', 'focus']
          hideEvents = ['focusout', 'blur']
          break
        case 'hover':
        default:
          showEvents = ['mouseenter', 'focus']
          hideEvents = ['mouseleave', 'blur']
      }

      showEvents.forEach((event) => {
        tooltipToggleEl.addEventListener(event, show)
      })

      hideEvents.forEach((event) => {
        tooltipToggleEl.addEventListener(event, hide)
      })
    })
  }, [])

  const text = title ? title : (description || '')

  return (
    <>
      <div
        data-tooltip-target={ `tooltip-${ text.split(' ').join('-') }` }
        data-tooltip-trigger='hover'
        className='cursor-pointer'
        style={ style }
      >{ children }</div>
      <div
        id={ `tooltip-${ text.split(' ').join('-') }` }
        role='tooltip'
        className='inline-block absolute invisible z-[99] py-2 px-3 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip'
      >
        <Text
          size='text-sm'
          weight='font-medium'
          color='text-white'
          align='text-center'
        >{ title }</Text>
        <Text
          size='text-xs'
          weight='font-medium'
          color='text-white'
          align='text-center'
        >{ description }</Text>
        <div className='tooltip-arrow' data-popper-arrow />
      </div>
    </>
  )
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  style: PropTypes.object,
  placement: PropTypes.oneOf([
    'top',
    'left',
    'right',
    'bottom',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
    'auto',
    'auto-start',
    'auto-end'
  ])
}

export default Tooltip
