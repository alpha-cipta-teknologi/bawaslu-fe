import { transformObjectToParams } from '../utils'
import createShareButton from '../createShareButton'

const facebookLink = (
  url,
  { quote, hashtag }
) => {
  return `https://www.facebook.com/sharer/sharer.php${transformObjectToParams({
    u: url,
    quote,
    hashtag
  })}`
  // return (
  //   'https://www.facebook.com/sharer/sharer.php' +
  //   transformObjectToParams({
  //     u: url,
  //     quote,
  //     hashtag,
  //   })
  // )
}

const FacebookShareButton = createShareButton(
  'facebook',
  facebookLink,
  (props) => ({
    quote: props.quote,
    hashtag: props.hashtag
  }),
  {
    windowWidth: 550,
    windowHeight: 400
  }
)

export default FacebookShareButton