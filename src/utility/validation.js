import { error } from './toast'

export default {
  username: (username) => {
    return !!username.match(/^[a-z0-9]+$/i)
  },

  email: (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(email)
  },

  phone: (phone) => {
    // format phone : 0... => min. 10 digit
    const re = /^\d+$/

    return !!(phone.length > 9 && phone.length < 20 && re.test(phone))
  },

  password: (password) => {
    const reInvalid = /^(.{0,5}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/

    return !(reInvalid.test(password))
  },

  passwordMatch: (password, confirmPassword) => {
    return password === confirmPassword
  },

  uploadImage: (file, maxMB = 5) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt5M = file.size / 1024 / 1024 < maxMB

    if (!isJpgOrPng) {
      error('You can only upload JPG/PNG file!')

      return false
    }

    if (!isLt5M) {
      error(`Image must smaller than ${maxMB}MB!`)

      return false
    }

    return true
  }
}