import { toastify } from 'utility'

/* eslint-disable no-mixed-operators */

export const CustomWindow = (
  url,
  {
    height,
    width,
    ...configRest
  },
  blankTarget,
  onClose = null
) => {
  const config = {
    height,
    width,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'no',
    centerscreen: 'yes',
    chrome: 'yes',
    ...configRest
  }

  let dialog

  if (blankTarget) {
    dialog = window.open(url, '_blank')
  } else {
    dialog = window.open(
      url,
      '',
      Object.keys(config)
        .map((key) => `${key}=${config[key]}`)
        .join(', ')
    )
  }

  if (onClose) {
    const interval = window.setInterval(() => {
      try {
        if (dialog === null || dialog.closed) {
          window.clearInterval(interval)
          onClose(dialog)
        }
      } catch (e) {
        toastify.errorDefault()
      }
    }, 1000)
  }

  return dialog
}

export const getPositionOnWindowCenter = (width, height) => ({
  left:
    window.outerWidth / 2 +
    (window.screenX || window.screenLeft || 0) -
    width / 2,
  top:
    window.outerHeight / 2 +
    (window.screenY || window.screenTop || 0) -
    height / 2
})

export const getPositionOnScreenCenter = (width, height) => ({
  top: (window.screen.height - height) / 2,
  left: (window.screen.width - width) / 2
})

export const isPromise = (obj) => !!obj &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function'


export const transformObjectToParams = (object) => {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)

  return params.length > 0 ? `?${params.join('&')}` : ''
}