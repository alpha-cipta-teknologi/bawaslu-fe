import React from 'react'
import { useHistory } from 'react-router-dom'
import { EllipsisVerticalIcon, HeartIcon } from '@heroicons/react/24/outline'

import { hooks, momentHelper, styleHelper, utils } from 'utility'
import { actions } from 'store'
import { images } from 'constant'
import { apiConfig } from 'configs'

import Card from '../../../Card'
import CounterArticle from '../../../CounterArticle'
import Text from '../../../Text'
import CustomIcon from '../../../CustomIcon'
import Menu from '../../../Menu'
import PopoverSharedButtons from '../../../PopoverSharedButtons'

import TextArticle from '../TextArticle'

const menuCardArticle = [
  {
    id: 'delete',
    name: 'Hapus',
    icon: () => <CustomIcon iconName='trash_outline' />
  }
]

const CardArticle = ({
  withActionCard,
  onClickMenuCardArticle,
  onClickComment,
  isMobile,
  isContentTruncate,
  onClickShowMoreContent,
  data
}) => {
  const history = useHistory()

  // ** Store & Actions
  const likeForumArticle = hooks.useCustomDispatch(actions.forums.likeForumArticle)
  const counterViewShare = hooks.useCustomDispatch(actions.forums.counterViewShare)

  const handleLike = id => {
    if (!utils.isUserLoggedIn()) {
      history.push('/login')
      return
    }

    likeForumArticle({
      group: 1,
      id,
      reducer: 'forums'
    })
  }

  const handleShare = id => {
    counterViewShare({
      id,
      group: 1,
      counter: 'share',
      reducer: 'forums'
    })
  }

  const renderPopoverShare = (data, isMobile) => {
    return (
      <PopoverSharedButtons
        onShareWindowClose={() => handleShare(data?.id)}
        title={data?.title}
        url={`${apiConfig.baseUrlFE}/forum/${data?.slug}`}
      >
        <CounterArticle
          renderIcon={() => <CustomIcon iconName='share' className='w-5 h-5' />}
          text={`${utils.getNumberUnit(data?.counter_share || 0)}${isMobile ? '' : ' Dibagikan'}`}
        />
      </PopoverSharedButtons>
    )
  }

  const renderCounter = data => {
    return (
      <div className='flex items-center flex-wrap w-full gap-y-2.5 mt-6 px-3 gap-x-4.5'>
        <CounterArticle
          renderIcon={() => (
            <HeartIcon className={styleHelper.classNames(
              'w-5 h-5 cursor-pointer',
              data?.like ? 'fill-[#EB5757] stroke-[#EB5757]' : ''
            )} />
          )}
          text={`${utils.getNumberUnit(data?.counter_like || 0)}${isMobile ? '' : ' Menyukai'}`}
          onClick={() => handleLike(data?.id)}
        />
        <CounterArticle
          renderIcon={() => (<CustomIcon iconName='comment' className='w-5 h-5 cursor-pointer' />)}
          text={`${utils.getNumberUnit(data?.counter_comment || 0)}${isMobile ? '' : ' Komentar'}`}
          onClick={onClickComment}
        />

        {renderPopoverShare(data, isMobile)}
      </div>
    )
  }

  const renderCardArticle = () => {
    const author = data?.author

    return (
      <Card paddingHorizontal='px-0' paddingVertical='py-4'>
        <div className='flex flex-col'>
          <div className='px-3 gap-y-1.5 flex flex-col'>
            <div className='flex justify-between pb-4.5'>
              <div className='flex'>
                <div className='mr-4 flex-shrink-0 self-center'>
                  <img
                    className='inline-block h-11 w-11 rounded-full'
                    src={utils.getImageAPI(author?.image_foto)}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null
                      currentTarget.src = images.empty_state.profile
                    }}
                    alt={author?.full_name}
                  />
                </div>
                <div className='grid gap-y-1'>
                  <Text size='text-sm' weight='font-bold' color='text-black-default'>{author?.full_name}</Text>
                  <Text size='text-xs' color='text-grey-base'>{momentHelper.formatDateFull(data?.created_date)}</Text>
                </div>
              </div>

              {withActionCard && (
                <Menu
                  renderButton={() => <EllipsisVerticalIcon className='w-5 h-5' />}
                  menuItems={menuCardArticle}
                  onClickMenuItem={menu => onClickMenuCardArticle(menu, data)}
                />
              )}
            </div>

            <Text weight='font-bold'>{data?.title}</Text>

            <TextArticle
              text={data?.description || ''}
              isTruncate={isContentTruncate}
              onClickShowMore={onClickShowMoreContent}
            />
          </div>

          {data?.path_image && (
            <img
              alt={data?.title}
              src={utils.getImageAPI(data?.path_image)}
              className='w-full h-full max-h-80 mt-1.5 object-cover'
            />
          )}

          {renderCounter(data)}
        </div>
      </Card>
    )
  }

  return renderCardArticle()
}

export default CardArticle