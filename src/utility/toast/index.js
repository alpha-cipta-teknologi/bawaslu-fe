import { Slide, toast } from 'react-toastify'

const defaultConfig = {
  theme: 'colored',
  position: toast.POSITION.TOP_RIGHT,
  hideProgressBar: true,
  draggable: true,
  draggablePercent: 60,
  draggableDirection: 'y',
  autoClose: 4000,
  bodyClassName: 'text-sm font-primary font-medium',
  transition: Slide
}

export const success = message => {
  toast.success(message, defaultConfig)
}

export const error = message => {
  toast.error(message, defaultConfig)
}

export const warning = message => {
  toast.warning(message, defaultConfig)
}

export const info = message => {
  toast.info(message, defaultConfig)
}

export const errorDefault = () => {
  error('Maaf, terjadi kesalahan. Silakan muat ulang halaman.')
}
