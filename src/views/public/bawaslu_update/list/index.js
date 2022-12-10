import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Text } from 'core/components'
import { hooks, utils, momentHelper } from 'utility'
import { actions } from 'store'
import { apiConfig } from 'configs'

import { TopArticles, MoreArticles } from '../components'

const BawasluUpdateListPage = () => {

  // ** Store & Actions
  const getDataBawasluUpdate = hooks.useCustomDispatch(actions.bawasluupdates.getDataBawasluUpdate)

  const bawasluList = useSelector(state => state.bawasluupdates).bawasluList
  const lazyLoad = useSelector(state => state.misc).lazyLoad
  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : { userdata: null }

  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const loading = utils.isLazyLoading(lazyLoad, 'getDataBawasluUpdate')

  useEffect(() => {
    getDataBawasluUpdate({
      page: currentPage,
      perPage: rowsPerPage
    })
  }, [currentPage])

  return (
    <div className='py-6 md:py-7'>
      <Text weight='font-bold' size='text-2.5xl' spacing='mb-7'>Bawaslu Update</Text>

      <TopArticles mainArticle={bawasluList?.data[0]} sideArticleList={bawasluList?.data} isOverlayMainArticle />

      <Text weight='font-bold' size='text-2.5xl' className='my-7'>Update Terbaru</Text>

      <MoreArticles />
    </div>
  )
}

export default BawasluUpdateListPage