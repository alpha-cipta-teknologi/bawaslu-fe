import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Text, Skeleton } from 'core/components'
import { hooks, momentHelper, utils } from 'utility'
import { actions } from 'store'

const MoreArticles = ({
  rowsPerPage = 10,
  page,
  setPage,
  refreshing,
  setRefreshing,
  isMounted,
  setIsMounted
}) => {
  const getDataBawasluUpdate = hooks.useCustomDispatch(actions.bawasluupdates.getDataBawasluUpdate)

  const bawasluList = useSelector(state => state.bawasluupdates).bawasluList
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const observer = useRef()

  const [hasMoreData, setHasMoreData] = useState(true)

  const loading = utils.isLazyLoading(lazyLoad, 'getDataBawasluUpdate')

  const lastElementRef = useCallback(node => {
    if (loading) return

    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreData) {
        if (setPage) setPage(prev => prev + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [loading, hasMoreData])

  useEffect(() => {
    const pageCount = Math.ceil(bawasluList?.total / rowsPerPage) || 1

    if (page >= pageCount) {
      setHasMoreData(false)
    } else {
      setHasMoreData(true)
    }
  }, [page, bawasluList?.total])

  const fetchBawasluArticle = () => {
    getDataBawasluUpdate({
      page,
      perPage: rowsPerPage
    }, () => {
      if (!isMounted && setIsMounted) setIsMounted(true)
      if (refreshing && setRefreshing) setRefreshing(false)
    })
  }

  useEffect(() => {
    fetchBawasluArticle()
  }, [page])

  // ==== Refreshing ====
  useEffect(() => {
    if (refreshing && isMounted) {
      if (page !== 1) {
        if (setPage) setPage(1)
      } else {
        fetchBawasluArticle()
      }
    }
  }, [refreshing])

  const renderArticle = data => {
    const loading = utils.isLazyLoading(lazyLoad, 'getDataBawasluUpdate') && !isMounted

    return (
      <div className='flex flex-col w-full'>
        <Skeleton loading={loading} avatar={{ sizing: 'h-[140px] w-full' }}>
          <Link to={`/bawaslu-update/${data.slug}`}>
            <img
              className='h-[140px] w-full object-cover'
              src={utils.getImageAPI(data.path_thumbnail)}
              alt={data.title}
            />
          </Link>
        </Skeleton>

        <Skeleton loading={loading} paragraph={{ rows: 2 }} className='mt-3'>
          <div className='flex flex-col mt-3 w-full gap-y-1'>
            <Text size='text-xs' color='text-grey-light-7'>{momentHelper.formatDateFull(data.created_date)}</Text>
            <Text
              weight='font-bold'
              size='text-sm'
              lineClamp='line-clamp-2'
              cursor='cursor-pointer'
              href={`/bawaslu-update/${data.slug}`}
              underlineOnHover
            >
              {data.title}
            </Text>
          </div>
        </Skeleton>
      </div>
    )
  }

  const renderList = () => {
    const loading = utils.isLazyLoading(lazyLoad, 'getDataBawasluUpdate') && !isMounted
    const listData = loading ? utils.createDummyArray(5, {
      id: 0,
      path_thumbnail: '',
      slug: '',
      created_date: '',
      title: ''
    }) : (bawasluList?.data || [])

    return (
      <>
        {listData.map((data, index) => {
          const isLastElement = bawasluList?.data?.length === index + 1

          return isLastElement ? (
            <div key={index} ref={lastElementRef}>
              {renderArticle(data)}
            </div>
          ) : (
            <div key={index}>
              {renderArticle(data)}
            </div>
          )
        })}
      </>
    )
  }

  return (
    <div className='grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-7'>
      {renderList()}
    </div>
  )
}

export default MoreArticles
