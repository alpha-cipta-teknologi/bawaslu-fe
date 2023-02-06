import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { Input, ForumArticleList } from 'core/components'

import { hooks } from 'utility'
import { actions } from 'store'

import { ForumListContainer } from '../components'

const ForumListChannelPage = () => {
  const { channelid } = useParams()

  // ** Store & Actions
  const getAllDataCommunity = hooks.useCustomDispatch(actions.communities.getAllDataCommunity)

  // ** States
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [channelIdParams, setChannelIdParams] = useState(+channelid)

  const debouncedSearch = hooks.useDebounce(search, 400)
  const debouncedChannelId = hooks.useDebounce(channelIdParams, 400)
  const debouncedPage = hooks.useDebounce(page, 400)

  useEffect(() => {
    setSearch('')
    setPage(1)
    setChannelIdParams(+channelid)
  }, [channelid])

  useEffect(() => {
    if (window) {
      window.scrollTo({
        top: 0,
        left: 0
      })
    }
  }, [debouncedSearch])

  useEffect(() => {
    getAllDataCommunity()
  }, [])

  const onChangeSearch = useCallback(e => {
    setSearch(e.target.value)
    setPage(1)
  }, [])

  const renderSearchForum = () => {
    return (
      <div className='w-full'>
        <Input
          id='search'
          type='search'
          placeholder='Cari thread'
          name='search'
          value={search}
          onChange={onChangeSearch}
          inputClassName='block w-full'
          borderColor='border-grey-light-2'
          textSize='text-sm'
          padding='px-5 py-2.5'
          spacing='m-0'
        />
      </div>
    )
  }

  const renderForumArticleList = () => {
    return (
      <ForumArticleList
        fulfilledCondition
        emptyStateTitle='Tidak ada thread'
        page={debouncedPage}
        setPage={setPage}
        search={debouncedSearch}
        channelId={debouncedChannelId}
      // renderSearch={renderSearchForum}
      />
    )
  }

  return (
    <ForumListContainer
      channelId={+channelid}
      renderForumArticleList={renderForumArticleList}
      renderSearchForum={renderSearchForum}
      withChannel
    />
  )
}

export default ForumListChannelPage