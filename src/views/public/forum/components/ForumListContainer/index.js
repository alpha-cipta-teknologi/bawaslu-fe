import React, {
  useEffect,
  lazy,
  Suspense
} from 'react'

import { hooks, screen, styleHelper } from 'utility'
import { actions } from 'store'

import CardTrending from '../CardTrending'
import CardCreatePost from '../CardCreatePost'

const CommunityList = lazy(() => import('core/components/CommunityList'))

const ForumListContainer = ({
  withChannel,
  renderForumArticleList,
  channelId,
  onChangeChannel,
  renderSearchForum
}) => {
  // ** Store & Actions
  const getDataTrendingForumArticle = hooks.useCustomDispatch(actions.forums.getDataTrendingForumArticle)

  const windowDimensions = hooks.useWindowDimensions()

  useEffect(() => {
    getDataTrendingForumArticle()
  }, [])

  const renderCommunityList = (isMobileView, cardClassName, cardStyle) => {
    return (
      <Suspense fallback={<></>}>
        <CommunityList
          channelId={channelId}
          isMobileView={isMobileView}
          cardClassName={cardClassName}
          cardStyle={cardStyle}
          onChangeChannel={onChangeChannel}
        />
      </Suspense>
    )
  }

  const renderStickyCommunityList = () => {
    const isMobile = windowDimensions.width < screen.lg

    return (
      <div className={styleHelper.classNames('lg:sticky', renderSearchForum ? 'lg:top-[162px]' : 'lg:top-[90px]')}>
        {renderCommunityList(false, 'overflow-y-auto custom-scrollbar', { maxHeight: isMobile ? 500 : 'calc(100vh - 182px)' })}
      </div>
    )
  }

  return (
    <>
      <div className='py-6 md:py-11'>
        {withChannel ? (
          <div className='mb-5 block md:hidden'>
            {renderCommunityList(true)}
          </div>
        ) : null}

        <div className='grid lg:grid-cols-12 flex-col w-full md:flex-row gap-5 relative'>

          {withChannel ? (
            <div className='w-full hidden md:flex flex-col lg:hidden'>
              {renderStickyCommunityList()}
            </div>
          ) : null}

          <CardTrending />

          {renderSearchForum && (
            <div className='flex lg:hidden'>
              {renderSearchForum()}
            </div>
          )}

          <div className='flex flex-col w-full lg:col-span-6'>
            {renderForumArticleList ? renderForumArticleList() : null}
          </div>

          <div className='w-full gap-7 hidden lg:flex lg:flex-col lg:col-span-3'>
            <CardCreatePost isSticky={!withChannel} channelId={channelId} />

            {renderSearchForum && (
              <div className='lg:sticky lg:top-[90px]'>
                {renderSearchForum()}
              </div>
            )}

            {withChannel ? renderStickyCommunityList() : null}
          </div>
        </div>
      </div>

      <CardCreatePost channelId={channelId} isBottomSheet />
    </>
  )
}

export default ForumListContainer