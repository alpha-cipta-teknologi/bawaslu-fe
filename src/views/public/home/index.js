import React, { useState } from 'react'
import ReactPlayer from 'react-player'

import { Button, CustomIcon, Text } from 'core/components'
import { utils } from 'utility'

const videoUrl = 'https://www.youtube.com/embed/92D7K5eP6BY'

const HomePage = () => {
  const [playingVideo, setPlayingVideo] = useState(false)

  const renderPlayIcon = () => {
    return (
      <div className='w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-black-default relative'>
        <CustomIcon iconName='play_button' className='w-15 h-15 sm:w-20 sm:h-20 absolute-center' />
      </div>
    )
    // return 
  }

  return (
    <div className='py-10 md:py-20'>
      <div className='flex flex-col items-center justify-center'>
        <Text
          size='text-5.5xl'
          align='text-center'
          weight='font-bold'
        >Selamat Datang</Text>

        <Text
          size='text-lg'
          align='text-center'
          spacing='mt-4'
          lineHeight='leading-[30px]'
        >
          Komunitas Digital Pengawasan Partisipatif adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>

        <div className='w-full px-6 md:px-8 lg:px-12 my-12'>
          <div className='w-full h-full aspect-w-16 aspect-h-9 rounded-xl'>
            <ReactPlayer
              url={videoUrl}
              playing={playingVideo}
              volume={1}
              width='100%'
              height='100%'
              style={{
                borderRadius: 12,
                overflow: 'hidden'
              }}
              playIcon={renderPlayIcon()}
              onClickPreview={() => setPlayingVideo(true)}
              light={utils.getYoutubeThumbnail(videoUrl)}
              controls
            />
          </div>
        </div>

        <Button.ButtonPrimary fontSize='text-lg' spacing='py-3 px-7.5'>Pelajari Lebih Lanjut</Button.ButtonPrimary>
      </div>
    </div>
  )
}

export default HomePage