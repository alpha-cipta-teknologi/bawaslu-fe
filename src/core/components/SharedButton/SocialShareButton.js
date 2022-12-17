import React from 'react'

import {
  CustomWindow,
  getPositionOnWindowCenter,
  getPositionOnScreenCenter,
  isPromise
} from './utils'

const SocialShareButton = ({
  disabledStyle = { opacity: 0.6 },
  openShareDialogOnClick = true,
  resetButtonStyle = true,
  ...props
}) => {
  const openShareDialog = (link) => {
    const {
      onShareWindowClose,
      windowHeight = 400,
      windowPosition = 'windowCenter',
      windowWidth = 550,
      blankTarget = false
    } = props

    const windowConfig = {
      height: windowHeight,
      width: windowWidth,
      ...(windowPosition === 'windowCenter'
        ? getPositionOnWindowCenter(windowWidth, windowHeight)
        : getPositionOnScreenCenter(windowWidth, windowHeight))
    }

    CustomWindow(link, windowConfig, blankTarget, onShareWindowClose)
  }

  const handleClick = async (event) => {
    const {
      beforeOnClick,
      disabled,
      networkLink,
      onClick,
      url,
      // openShareDialogOnClick,
      opts
    } = props

    const link = networkLink(url, opts)

    if (disabled) {
      return
    }

    event.preventDefault()

    if (beforeOnClick) {
      const returnVal = beforeOnClick()

      if (isPromise(returnVal)) {
        await returnVal
      }
    }

    if (openShareDialogOnClick) {
      openShareDialog(link)
    }

    if (onClick) {
      onClick(event, link)
    }
  }

  const render = () => {
    const { children, forwardedRef, networkName, style, ...rest } = props

    const newStyle = {
      backgroundColor: 'transparent',
      border: 'none',
      padding: 0,
      font: 'inherit',
      color: 'inherit',
      cursor: 'pointer',
      outline: 'none',
      ...style
    }

    return (
      <button
        aria-label={rest['aria-label'] || networkName}
        onClick={handleClick}
        ref={forwardedRef}
        style={newStyle}
      >
        {children}
      </button>
    )
  }

  return render()
}

export default SocialShareButton

// export default class SocialShareButton extends Component {
//   static defaultProps = {
//     disabledStyle: { opacity: 0.6 },
//     openShareDialogOnClick: true,
//     resetButtonStyle: true,
//   }

//   openShareDialog = (link) => {
//     const {
//       onShareWindowClose,
//       windowHeight = 400,
//       windowPosition = 'windowCenter',
//       windowWidth = 550,
//       blankTarget = false,
//     } = this.props

//     const windowConfig = {
//       height: windowHeight,
//       width: windowWidth,
//       ...(windowPosition === 'windowCenter'
//         ? getPositionOnWindowCenter(windowWidth, windowHeight)
//         : getPositionOnScreenCenter(windowWidth, windowHeight)),
//     }

//     CustomWindow(link, windowConfig, blankTarget, onShareWindowClose)
//   }

//   handleClick = async (event) => {
//     const {
//       beforeOnClick,
//       disabled,
//       networkLink,
//       onClick,
//       url,
//       openShareDialogOnClick,
//       opts,
//     } = this.props

//     const link = networkLink(url, opts)

//     if (disabled) {
//       return
//     }

//     event.preventDefault()

//     if (beforeOnClick) {
//       const returnVal = beforeOnClick()

//       if (isPromise(returnVal)) {
//         await returnVal
//       }
//     }

//     if (openShareDialogOnClick) {
//       this.openShareDialog(link)
//     }

//     if (onClick) {
//       onClick(event, link)
//     }
//   }

//   render() {
//     const { children, forwardedRef, networkName, style, ...rest } = this.props

//     const newStyle = {
//       backgroundColor: 'transparent',
//       border: 'none',
//       padding: 0,
//       font: 'inherit',
//       color: 'inherit',
//       cursor: 'pointer',
//       outline: 'none',
//       ...style,
//     }

//     return (
//       <button
//         aria-label={rest['aria-label'] || networkName}
//         onClick={this.handleClick}
//         ref={forwardedRef}
//         style={newStyle}
//       >
//         {children}
//       </button>
//     )
//   }
// }