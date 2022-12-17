import { transformObjectToParams } from '../utils'
import createShareButton from '../createShareButton'

/* eslint-disable prefer-template */

const isMobileOrTablet = () => {
  return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent)
}

const whatsappLink = (
  url,
  { title, separator = ':: ' }
) => {
  // return `https://${(isMobileOrTablet() ? 'api' : 'web')}.whatsapp.com/send${transformObjectToParams({ text: title ? title + separator + url : url })}`
  return (
    'https://' +
    (isMobileOrTablet() ? 'api' : 'web') +
    '.whatsapp.com/send' +
    transformObjectToParams({ text: title ? title + separator + url : url })
  )
}

const WhatsappShareButton = createShareButton(
  'whatsapp',
  whatsappLink,
  (props) => ({
    title: props.title,
    separator: props.separator || ' '
  }),
  {
    windowWidth: 550,
    windowHeight: 400
  }
)

export default WhatsappShareButton