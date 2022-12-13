import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Text, EmptyState } from 'core/components'
import { utils } from 'utility'

import { TopArticles, MoreArticles } from '../components'

const BawasluUpdateListPage = () => {
  const bawasluList = useSelector(state => state.bawasluupdates).bawasluList
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [isMounted, setIsMounted] = useState(false)

  const renderTopArticles = () => {
    const loading = utils.isLazyLoading(lazyLoad, 'getDataBawasluUpdate') && !isMounted

    if (loading || bawasluList?.data?.length) {
      return (
        <TopArticles
          mainArticle={bawasluList?.data[0]}
          sideArticleList={bawasluList?.data}
          loading={loading}
          isOverlayMainArticle
        />
      )
    }

    return <EmptyState title='Tidak ada artikel yang tersedia' />
  }

  const renderMoreArticles = () => {
    const loading = utils.isLazyLoading(lazyLoad, 'getDataBawasluUpdate')

    if (loading || bawasluList?.data?.length || !isMounted) {
      return (
        <MoreArticles
          page={currentPage}
          setPage={setCurrentPage}
          isMounted={isMounted}
          setIsMounted={setIsMounted}
        />
      )
    }

    return <EmptyState title='Tidak ada artikel yang tersedia' />
  }

  return (
    <div className='py-6 md:py-7'>
      <Text weight='font-bold' size='text-2.5xl' spacing='mb-7'>Bawaslu Update</Text>

      {renderTopArticles()}

      <Text weight='font-bold' size='text-2.5xl' className='my-7'>Update Terbaru</Text>

      {renderMoreArticles()}
    </div>
  )
}

export default BawasluUpdateListPage