import moment from 'moment'

const monthOptions = ['All', ...moment.months()].map((monthName, index) => {
  const monthIdx = index < 10 ? `0${ index }` : index

  return {
    label: monthName,
    value: monthName.includes('All') ? 'All' : monthIdx
  }
})

const dateOptions = Array.from(Array(32).keys()).map(i => {
  const date = i > 0 ? i : 'All'

  return {
    label: date,
    value: date
  }
})

export default {
  monthOptions,
  dateOptions
}