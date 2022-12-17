import { transformObjectToParams } from '../utils'
import createShareButton from '../createShareButton'

/* eslint-disable prefer-template */

const telegramLink = (url, { title }) => {
  return (
    'https://telegram.me/share/' +
    transformObjectToParams({
      url,
      text: title
    })
  )
}

const TelegramShareButton = createShareButton(
  'telegram',
  telegramLink,
  (props) => ({
    title: props.title
  }),
  {
    windowWidth: 550,
    windowHeight: 400
  }
)

export default TelegramShareButton