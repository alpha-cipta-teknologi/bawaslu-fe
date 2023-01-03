import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Text, Card, Spinner } from 'core/components'
import { hooks, utils, screen, styleHelper } from 'utility'
import { actions } from 'store'

const CardTrending = ({ onClick, wrapperClassName }) => {
  const history = useHistory()

  const getForumArticleDetail = hooks.useCustomDispatch(utils.isUserLoggedIn() ? actions.forums.getForumArticleDetailAuth : actions.forums.getForumArticleDetail)

  const trendingForumList = useSelector(state => state.forums).trendingForumList
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const windowDimensions = hooks.useWindowDimensions()

  const handleGoToDetail = data => {
    getForumArticleDetail(data, () => {
      history.push(`/forum/${data.slug}`)
    })
  }

  const onClickTrending = el => {
    if (onClick) {
      onClick(el)
    } else {
      handleGoToDetail(el)
    }
  }

  const renderContentTrending = () => {
    const data = trendingForumList || []
    const loading = utils.isLazyLoading(lazyLoad, 'getDataTrendingForumArticle')

    if (loading) {
      return <Spinner sizing='w-7.5 h-7.5' />
    }

    if (!data.length && !loading) {
      return <Text size='text-sm'>Tidak ada data</Text>
    }

    return (
      <ul className='list-outside list-disc ml-4 text-sm'>
        {data?.map(el => {
          return (
            <li key={el.id} onClick={() => onClickTrending(el)} className='pb-3'>
              <Text size='text-sm' weight='font-bold' underlineOnHover>{el.title}</Text>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderCardTrending = () => {
    const isMobile = windowDimensions.width < screen.lg

    return (
      <div className={styleHelper.classNames('w-full lg:col-span-3', wrapperClassName)}>
        <div className='lg:sticky w-full lg:top-[90px]'>
          <Card
            cardClassName='overflow-y-auto custom-scrollbar'
            paddingHorizontal='px-3'
            paddingVertical='py-3'
            style={{ maxHeight: isMobile ? 200 : 'calc(100vh - 110px)' }}
          >
            <Text weight='font-bold' spacing='mb-4'>Trending</Text>

            {renderContentTrending()}
          </Card>
        </div>
      </div>
    )
  }

  return renderCardTrending()
}

export default CardTrending