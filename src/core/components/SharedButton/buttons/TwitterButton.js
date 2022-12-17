import { transformObjectToParams } from '../utils'
import createShareButton from '../createShareButton'

/* eslint-disable prefer-template */

const twitterLink = (
  url,
  {
    title,
    via,
    hashtags = [],
    related = []
  }
) => {
  return (
    'https://twitter.com/share' +
    transformObjectToParams({
      url,
      text: title,
      via,
      hashtags: hashtags.length > 0 ? hashtags.join(',') : undefined,
      related: related.length > 0 ? related.join(',') : undefined
    })
  )
}

const TwitterShareButton = createShareButton(
  'twitter',
  twitterLink,
  (props) => ({
    hashtags: props.hashtags,
    title: props.title,
    via: props.via,
    related: props.related
  }),
  {
    windowWidth: 550,
    windowHeight: 400
  }
)

export default TwitterShareButton