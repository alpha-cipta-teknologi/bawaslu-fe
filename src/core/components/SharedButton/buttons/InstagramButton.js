import { transformObjectToParams } from '../utils'
import createShareButton from '../createShareButton'

/* eslint-disable prefer-template */

const instagramLink = (
  url,
  { quote, hashtag }
) => {
  return (
    'https://www.facebook.com/sharer/sharer.php' +
    transformObjectToParams({
      u: url,
      quote,
      hashtag
    })
  )
}

const InstagramShareButton = createShareButton(
  'instagram',
  instagramLink,
  (props) => ({
    quote: props.quote,
    hashtag: props.hashtag
  }),
  {
    windowWidth: 550,
    windowHeight: 400
  }
)

export default InstagramShareButton