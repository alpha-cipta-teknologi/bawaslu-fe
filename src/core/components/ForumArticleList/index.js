import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { hooks, styleHelper, toastify, utils, screen } from 'utility'
import { actions } from 'store'

import EmptyState from '../EmptyState'
import Spinner from '../Loader/Spinner'

import { CardArticle } from './components'

const ForumArticleList = ({
  fulfilledCondition,
  withActionCard,
  page,
  setPage,
  rowsPerPage = 10,
  emptyStateTitle = 'Tidak ada data',
  wrapperListClassName,
  renderSearch,
  search,
  channelId
}) => {
  const history = useHistory()
  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : { userdata: null }

  // ** Store & Actions
  const getDataForumArticle = hooks.useCustomDispatch(userdata ? actions.forums.getDataForumArticleAuth : actions.forums.getDataForumArticle)
  const deleteForumArticle = hooks.useCustomDispatch(actions.forums.deleteForumArticle)
  const getForumArticleDetail = hooks.useCustomDispatch(utils.isUserLoggedIn() ? actions.forums.getForumArticleDetailAuth : actions.forums.getForumArticleDetail)
  const getDataSearchForumArticle = hooks.useCustomDispatch(actions.forums.getDataSearchForumArticle)

  const forumList = useSelector(state => state.forums).forumList
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const observer = useRef()

  const [hasMoreData, setHasMoreData] = useState(true)
  const [refreshing, setRefreshing] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  const loadingForumArticle = utils.isLazyLoading(lazyLoad, 'getDataForumArticle')
  const windowDimensions = hooks.useWindowDimensions()

  const lastElementRef = useCallback(node => {
    if (loadingForumArticle) return

    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreData) {
        if (setPage) setPage(prev => prev + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [loadingForumArticle, hasMoreData])

  useEffect(() => {
    if (fulfilledCondition) {
      const pageCount = Math.ceil(forumList?.total / rowsPerPage) || 1

      if (page >= pageCount) {
        setHasMoreData(false)
      } else {
        setHasMoreData(true)
      }
    }
  }, [page, forumList?.total, fulfilledCondition])

  const fetchForumArticle = () => {
    getDataForumArticle({
      page,
      perPage: rowsPerPage,
      ...search ? { q: search || '' } : {},
      ...userdata && !withActionCard
        ? { type: 'fe' }
        : {},
      ...channelId ? { komunitas_id: channelId } : {}
    }, () => {
      if (!isMounted) setIsMounted(true)
      if (refreshing) setRefreshing(false)
    })
  }

  const fetchSearchForumArticle = () => {
    getDataSearchForumArticle({
      page,
      perPage: rowsPerPage,
      q: search || '',
      ...channelId ? { komunitas_id: channelId } : {},
      ...userdata ? { user_id: userdata?.resource_id || 0 } : {}
    }, () => {
      if (!isMounted) setIsMounted(true)
      if (refreshing) setRefreshing(false)
    })
  }

  useEffect(() => {
    if (fulfilledCondition) {
      if (search) {
        fetchSearchForumArticle()
      } else {
        fetchForumArticle()
      }
    }
  }, [fulfilledCondition, page, search, channelId])

  // ==== Refreshing ====
  useEffect(() => {
    if (refreshing && fulfilledCondition && isMounted) {
      if (page !== 1) {
        if (setPage) setPage(1)
      } else {
        fetchForumArticle()
      }
    }
  }, [refreshing, fulfilledCondition])

  const handleGoToDetail = (data, state) => {
    getForumArticleDetail(data, () => {
      history.push({
        pathname: `/forum/${data.slug}`,
        state
      })
    })
  }

  const onClickMenuCardArticle = (menu, data) => {
    if (menu.id === 'delete') {
      deleteForumArticle(data.id, () => {
        toastify.success('Berhasil menghapus postingan')

        setRefreshing(true)
      })
    }
  }

  const renderCardArticle = data => {
    const isMobile = windowDimensions.width < screen.sm

    return (
      <CardArticle
        data={data}
        withActionCard={withActionCard}
        onClickMenuCardArticle={onClickMenuCardArticle}
        onClickComment={() => handleGoToDetail(data, { isOpenComment: true })}
        isMobile={isMobile}
        onClickShowMoreContent={() => handleGoToDetail(data)}
        isContentTruncate
      />
    )
  }

  const renderSpinner = () => {
    return (
      <div className='w-full my-12.5 flex justify-center items-center'>
        <Spinner sizing='w-7.5 h-7.5' />
      </div>
    )
  }

  const renderList = () => {
    if (!forumList?.data?.length && search) {
      return (
        <EmptyState title='Thread tidak ditemukan' subtitle='Silakan cari dengan kata kunci lainnya' />
      )
    }

    return (
      <>
        {forumList?.data?.map((data, i) => {
          const isLastElement = forumList?.data?.length === i + 1

          return isLastElement ? (
            <div key={i} ref={lastElementRef}>
              {renderCardArticle(data)}
            </div>
          ) : (
            <div key={i}>
              {renderCardArticle(data)}
            </div>
          )
        })}
      </>
    )
  }

  const renderForumArticles = () => {
    if (!loadingForumArticle && !forumList?.data?.length && !search) {
      return (
        <EmptyState title={emptyStateTitle} />
      )
    }

    return (
      <div className={styleHelper.classNames('grid gap-y-4', wrapperListClassName)}>
        {renderSearch && renderSearch()}

        {!isMounted || (loadingForumArticle && page === 1)
          ? renderSpinner()
          : renderList()}

        {loadingForumArticle
          && isMounted
          && page > 1
          && renderSpinner()}
      </div>
    )
  }

  return renderForumArticles()
}

export default ForumArticleList