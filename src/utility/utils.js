import _ from 'lodash'

import * as momentHelper from './moment'
import validation from './validation'

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

export const timeToSeconds = (time) => {
  /* eslint-disable */
  const seconds = time.split(':')
  return (+seconds[0]) * 60 * 60 + (+seconds[1]) * 60 + (+seconds[2])
  /* eslint-enable */
}

export const days = (delta) => {
  return Math.floor(delta / 86400)
}

export const hours = (delta) => {
  return Math.floor(delta / 3600) % 24
}

export const minutes = (delta) => {
  return Math.floor(delta / 60) % 60
}

// ** Check if object lazy loading (misc reducer) has key equal with keyword and value is true
export const isLazyLoading = (lazyLoad, keyword) => {
  if (lazyLoad) {
    const keyLazy = Object.keys(lazyLoad).find(key => key === keyword)

    return keyLazy && lazyLoad[keyword]
  }

  return false
}

// ** Check if loading object (misc reducer) is loading true
export const isLoading = (loading, message) => {
  if (loading) {
    return loading.isLoading && loading.message === message
  }

  return false
}

// ** Random integer
export const randomInt = (min, max) => {
  return Math.floor((Math.random() * (max - min + 1)) + min)
}

// ** Check object if contain empty value (empty string, null, undefined, etc)
export const isEmptyForm = (obj, emptyVal = '') => {
  return !!(Object.keys(obj).filter(key => {
    if (emptyVal === '[]') return !obj[key].length
    return obj[key] === emptyVal
  }).length)
}

// ** Check if icon from database is valid with 3rd party (react-feather)
export const isValidIconFeather = (iconName) => iconName && !(iconName.substr(0, 2).toLowerCase() === 'fa')

// ** Convert restrict level number to text
export const convertRestrictLevel = (restrictLevel) => {
  switch (restrictLevel.toString()) {
    case '0':
      return 'Open All Akses'
    case '2':
      return 'Restrict Regional'
    case '3':
      return 'Restrict Area'
    case '4':
      return 'Restrict City'
    default:
      return ''
  }
}

export const findRestrictLevel = (restrictLevel, value) => {
  return restrictLevel.find(res => `${res.value}` === `${value}`)
}

// ** Remove property or properties from object
export const removeProperty = (propKey, { [propKey]: propValue, ...rest }) => rest
export const removeProperties = (object, ...keys) => (keys.length ? removeProperties(removeProperty(keys.pop() || '', object), ...keys) : object)

// ** Get unique array
export const getUniqueArray = (arr) => {
  const uniqueArray = arr.filter((thing, index) => {
    const _thing = JSON.stringify(thing)
    return index === arr.findIndex(obj => {
      return JSON.stringify(obj) === _thing
    })
  })

  return uniqueArray
}

// ** Create possible combination from 2 or more array of objects
export const combineObjects = ([head, ...[headTail, ...tailTail]]) => {
  if (!headTail) return head

  const combined = headTail.reduce((acc, x) => {
    return acc.concat(head.map(h => ({ ...h, ...x })))
  }, [])

  return combineObjects([combined, ...tailTail])
}

// ** Flatten array
export const flattenArray = (arr) => arr.reduce((flat, next) => flat.concat(next), [])

// ** Merge two array by label
export const mergeByLabel = (a1, a2, label) => {
  const a1FilteredA2 = a1.filter(o1 => a2.some(o2 => o1[label] === o2[label]))

  return a1FilteredA2.map(itm => ({
    ...itm,
    ...a2.find((item) => (item[label] === itm[label]) && item)
  }))
}

// ** Group array of objects by key
export const groupArrayByKey = (data, keyGroup, keyChildren) => {
  const result = _(data)
    .groupBy(keyGroup)
    .map((group, value) => ({
      [keyGroup]: value,
      [keyChildren]: _.map(group, (obj) => obj[keyChildren])
    }))
    .value()

  return result
}

export const equalizeId = (a, b) => {
  return a === b
}

export const convertPeriodDate = (date) => momentHelper.dateConverted(new Date(date || ''), 'YYYY-MM-DD')

export const filterSelectData = (inputValue, data, filterBy = 'label') => {
  return data.filter(i => (i[filterBy] || '')?.toLowerCase()
    .replace(/\s+/g, '')
    .includes(inputValue?.toLowerCase()?.replace(/\s+/g, '')))
}

export const mappingSelectData = (selectObj) => {
  return Object.assign({},
    ...Object.keys(selectObj).map(key => ({
      [key]: selectObj[key].value
    }))
  )
}

export const filterArrObjFromArr = (
  arrObj,
  arr,
  key,
  isInclude = false
) => {
  return isInclude
    ? arrObj.filter(obj => arr.includes(obj[key]))
    : arrObj.filter(obj => !arr.includes(obj[key]))
}

export const setDataSelectOption = (data, keyName, keyLabel) => {
  return data?.map(r => ({
    id: r[keyName],
    value: r[keyName],
    label: r[keyLabel]
  }))
}

export const getYearsOption = (back = 3) => {
  const year = new Date().getFullYear()
  const years = Array.from({ length: back }, (v, i) => year - back + i + 1)

  return years.map(year => ({
    label: year,
    value: year
  }))
}

export const convertGroupColumns = (groupColumns) => {
  const columns = flattenArray(groupColumns.map(groupColumn => ([...groupColumn.columns])))

  return columns
}

export const timer = ms => new Promise(res => setTimeout(res, ms))

export const priceFormat = (price = 0) => `${price?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`

export const getRowByIndex = (rows, index) => {
  return rows.find(row => row.index === index)
}

export const commaSeparateNumber = val => {
  // remove sign if negative
  let sign = 1
  if (val < 0) {
    sign = -1
    val = -val
  }

  // trim the number decimal point if it exists
  let num = val.toString().includes('.') ? val.toString().split('.')[0] : val.toString()

  while (/(\d+)(\d{3})/.test(num.toString())) {
    // insert comma to 4th last position to the match number
    num = num.toString().replace(/(\d+)(\d{3})/, '$1,$2')
  }

  // add number after decimal point
  if (val.toString().includes('.')) {
    num = `${num}.${val.toString().split('.')[1]}`
  }

  // return result with - sign if negative
  return sign < 0 ? `-${num}` : num
}

export const calculateIncrement = (arrObj, propertyName) => {
  const mappingArr = arrObj.map(obj => +obj[propertyName])

  return mappingArr.length
    ? mappingArr.reduce((prev, next) => prev + next)
    : 0
}

export const titleCase = (str) => {
  const splitStr = str.toLowerCase().split(' ')

  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }

  return splitStr.join(' ')
}

export const convertHeaderLeftPeriod = fieldName => {
  switch (fieldName) {
    case 'last_month':
      return 'Last Month'
    case 'last_3_months':
    case 'three_last_month':
      return 'Last 3 Months'
    default:
      return fieldName
  }
}

export const generateQueryString = obj => {
  if (obj) {
    const str = []

    for (const p in obj) {
      str.push(`${p}=${obj[p]}`)
    }

    return str.join('&')
  }

  return ''
}

export const roundByStep = (num, rounder) => {
  const multiplier = 1 / (rounder || 0.5)

  return Math.round(num * multiplier) / multiplier
}

export const rangeNumber = (start, stop, step = 1) => {
  const length = Math.ceil((stop - start) / step)

  return Array.from({ length }, (_, i) => (i * step) + start)
}

export const createDummyArray = (length, obj) => Array.from(Array(length).keys()).map(() => (Object.assign(obj ? obj : {})))

export const sumObjectsByKey = (...objs) => {
  return objs.reduce((a, b) => {
    for (const k in b) {
      if (b.hasOwnProperty(k)) {
        a[k] = (a[k] || 0) + b[k]
      }
    }
    return a
  }, {})
}

export const getYoutubeThumbnail = (url, quality = 'max') => {
  if (url) {
    let videoId, result

    if (result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)) {
      videoId = result.pop()
    } else if (result = url.match(/youtu.be\/(.{11})/)) {
      videoId = result.pop()
    }

    if (videoId) {
      let qualityKey = 'maxresdefault' // Max quality

      switch (quality) {
        case 'low':
          qualityKey = 'sddefault'
          break
        case 'medium':
          qualityKey = 'mqdefault'
          break
        case 'high':
          qualityKey = 'hqdefault'
          break
        case 'max':
        default:
          qualityKey = 'maxresdefault'
      }

      const thumbnail = `https://i.ytimg.com/vi/${videoId}/${qualityKey}.jpg`

      return thumbnail
    }
  }

  return ''
}

export const isValueError = (
  value,
  name,
  label
) => {
  const inputName = (name || '').toLowerCase()
  const labelText = (label || '').toLowerCase()

  if (inputName.includes('password')) return !validation.passwordLength(value)
  if (inputName.includes('email') || labelText.toLowerCase().includes('email')) return !validation.email(value)
  else if (inputName.includes('phone')) return !validation.phone(value)
  else return false
}

export const validationErrorText = (
  value,
  name,
  label
) => {
  const isError = isValueError(value, name, label)

  if (isError) {
    const inputName = (name || '').toLowerCase()
    const labelText = (label || '').toLowerCase()

    if (inputName.includes('password')) return 'Minimum password adalah 8 karakter'
    else if (inputName.includes('email') || labelText.toLowerCase().includes('email')) return 'Format email tidak valid'
    else if (inputName.includes('phone')) return 'Nomor telepon tidak valid'
  }

  return ''
}

export const isFormError = (formInputProps, data) => {
  const arrayError = formInputProps.map((form) => validationErrorText(data[form.name || ''], form.name, form.label)).filter((errorText) => errorText !== '')

  return (arrayError?.length || 0) > 0
}

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    } else {
      resolve('')
    }
  })
}