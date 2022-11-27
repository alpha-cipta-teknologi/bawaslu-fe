import React from 'react'

import { images } from 'constant'

import { Text, Logo } from '../../../components'

const socialMedia = [
  {
    name: 'instagram',
    url: 'https://www.instagram.com/bawasluri/',
    label: 'Instagram',
    src: images.social_media.instagram,
    className: 'w-4.5 h-4.5'
  },
  {
    name: 'youtube_footer',
    url: 'https://www.youtube.com/@HUMASBAWASLU/featured',
    label: 'Youtube',
    src: images.social_media.youtube,
    className: 'w-5 h-3.5'
  },
  {
    name: 'facebook',
    url: 'https://www.facebook.com/sahabatbawaslu',
    label: 'Facebook',
    src: images.social_media.facebook,
    className: 'w-5 h-5'
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/Bawaslu_RI',
    label: 'Twitter',
    src: images.social_media.twitter,
    className: 'w-5 h-4'
  }
]

const TextInfoBawaslu = ({ children, ...props }) => {
  return (
    <Text
      size='text-xs'
      weight='font-normal'
      color='text-grey-dark'
      align='text-center md:text-left'
      lineHeight='leading-[18px]'
      {...props}
    >{children}</Text>
  )
}

const Footer = () => {
  const onClickSocialMedia = url => {
    if (window) {
      const win = window.open(url, '_blank')

      if (win) {
        win.focus()
      }
    }
  }

  return (
    <footer className='relative py-10 bg-white border-t border-grey-light-2'>
      <div className='flex flex-col md:flex-row width-container w-full'>
        <div className='w-full flex flex-col items-center md:items-start gap-y-3.5 md:gap-y-0'>
          <Logo />

          <TextInfoBawaslu spacing='mt-2.5' text='Badan Pengawas Pemilihan Umum Republik Indonesia' />
          <TextInfoBawaslu spacing='mt-2.5' text='Jl. MH. Thamrin No. 14 Jakarta Pusat 10350 Telepon: 021 - 3905889 / 3907911' />

          <div className='flex flex-wrap items-center justify-center gap-5 md:gap-8 md:mt-5'>
            {socialMedia.map(icon => (
              <div
                key={icon.name}
                className='flex items-center justify-center cursor-pointer'
                onClick={() => onClickSocialMedia(icon.url)}
              >
                <img
                  src={icon.src}
                  alt={icon.label}
                  className={icon.className}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
