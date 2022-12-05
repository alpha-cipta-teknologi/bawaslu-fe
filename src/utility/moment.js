import moment from 'moment'

// ** format date
export const formatDate = (value) => {
  if (null === value || undefined === value) return '-'
  return moment(value).format('YYYY-MM-DD') // YYYY-MM-DD
}

export const formatDateTime = (value) => {
  if (null === value || undefined === value) return '-'
  return moment(value).format('DD/MM/YYYY HH:mm') //dd mmm yyyy
}

export const formatTime = (value) => {
  if (null === value || undefined === value) return '-'
  return moment(value).format('HH:mm') //dd mmm yyyy
}

export const formatDateFull = (value) => {
  if (null === value || undefined === value) return '-'
  return moment(value).format('DD MMMM YYYY') //dd mmm yyyy
}

export const dateStrToMoment = (dateTime, format) => {
  return moment(moment(dateTime, format).toDate())
}

export const dateConverted = (
  date,
  newFormat,
  oldFormat
) => {
  if (newFormat) {
    return dateStrToMoment(date, oldFormat).format(newFormat)
  }

  return moment(date, oldFormat).toDate()
}

export const dateTimeToTimestamp = (dateTime, format) => {
  return dateStrToMoment(dateTime, format).valueOf()
}

export const timestampToMoment = (fullTimestamp) => moment(moment.unix(fullTimestamp / 1000).toDate())

export const timestampToDateTime = (fullTimestamp, format) => {
  return timestampToMoment(fullTimestamp).format(format)
}

export const lessThanOneHourAgo = (date) => moment(date).isAfter(moment().subtract(1, 'hours'))

export const fromNow = (date) => moment(date).fromNow()

export const utcToLocal = (dataUtc, format) => {
  return moment
    .utc(dataUtc)
    .local()
    .format(format)
}

export const addTime = (
  dateTime,
  format,
  amount,
  unit
) => {
  return moment(dateTime, format).add(amount, unit).format('HH:mm')
}

export const getPreviousMonth = (counter = 1) => {
  return moment(new Date(Date.now())).subtract(counter, 'month').endOf('month').format('MMM YYYY')
}

export const now = () => moment()