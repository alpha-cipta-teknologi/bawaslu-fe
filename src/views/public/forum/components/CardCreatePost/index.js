import React from 'react'
import { useHistory } from 'react-router-dom'

import { Text, Card, Button } from 'core/components'
import { utils } from 'utility'

const CardCreatePost = ({
  isBottomSheet,
  isSticky,
  channelId
}) => {
  const history = useHistory()

  const onClickCreatePost = () => {
    if (!utils.isUserLoggedIn()) {
      return history.push('/login')
    }

    if (channelId) {
      return history.push({
        pathname: '/forum/create',
        state: { channelId }
      })
    }

    return history.push('/forum/create')
  }

  const renderContentCreatePost = () => {
    return (
      <>
        <Text weight='font-bold' spacing='mb-4'>Buat Thread</Text>
        <Button.ButtonPrimary
          spacing='py-2.5 px-5'
          fontSize='text-base'
          sizing='w-full'
          onClick={onClickCreatePost}
        >
          Buat
        </Button.ButtonPrimary>
      </>
    )
  }

  const renderCardCreatePost = () => {
    return (
      <Card cardClassName='w-full' paddingHorizontal='px-3' paddingVertical='py-3'>
        {renderContentCreatePost()}
      </Card>
    )
  }

  const renderBottomSheetCreatePost = () => {
    return (
      <div className='fixed left-0 block lg:hidden w-full p-5 pb-10 bottom-0 bg-white rounded-t-lg shadow-md'>
        {renderContentCreatePost()}
      </div>
    )
  }

  const render = () => {
    if (isBottomSheet) return renderBottomSheetCreatePost()

    if (isSticky) {
      return (
        <div className='lg:sticky lg:top-[90px]'>
          {renderCardCreatePost()}
        </div>
      )
    }

    return renderCardCreatePost()
  }

  return render()
}

export default CardCreatePost
