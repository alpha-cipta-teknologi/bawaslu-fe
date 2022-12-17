import { transformObjectToParams } from '../utils'
import createShareButton from '../createShareButton'

/* eslint-disable prefer-template */

const linkedinLink = (url, { title, summary, source }) => {
  return (
    // 'https://linkedin.com/shareArticle' +
    'https://linkedin.com/sharing/share-offsite' +
    transformObjectToParams({
      url,
      mini: 'true',
      title,
      summary,
      source
    })
  )
}

const LinkedinShareButton = createShareButton(
  'linkedin',
  linkedinLink,
  ({ title, summary, source }) => ({ title, summary, source }),
  {
    windowWidth: 750,
    windowHeight: 600
  }
)

export default LinkedinShareButton