import { ReactComponent as Bell } from 'assets/images/icons/bell.svg'
import { ReactComponent as Calendar } from 'assets/images/icons/calendar.svg'
import { ReactComponent as Logout } from 'assets/images/icons/logout.svg'
import { ReactComponent as PlayButton } from 'assets/images/icons/play_button.svg'
import { ReactComponent as Like } from 'assets/images/icons/like.svg'
import { ReactComponent as Comment } from 'assets/images/icons/message_comment.svg'
import { ReactComponent as Share } from 'assets/images/icons/share.svg'

export default {
  logo_bawaslu: require('assets/images/logo/logo.png'),
  logo_bawaslu_2: require('assets/images/logo/logo_2.jpg'),
  logo_google: require('assets/images/logo/google.png'),
  logo_facebook: require('assets/images/logo/facebook.png'),
  empty_state: {
    profile: require('assets/images/empty_state/profile_none.png')
  },
  icons: {
    bell: Bell,
    calendar: Calendar,
    logout: Logout,
    play_button: PlayButton,
    like: Like,
    comment: Comment,
    share: Share
  },
  social_media: {
    instagram: require('assets/images/footer/instagram.png'),
    youtube: require('assets/images/footer/youtube.png'),
    twitter: require('assets/images/footer/twitter.png'),
    facebook: require('assets/images/footer/facebook.png')
  }
}