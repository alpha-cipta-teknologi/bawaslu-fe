import React, { useCallback, useEffect, useState } from 'react'

import { ForumArticleList, Input } from 'core/components'
import { hooks } from 'utility'

import { ForumListContainer } from '../components'

const ForumListPage = () => {
  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')

  const debouncedSearch = hooks.useDebounce(search, 800)

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch])

  const onChangeSearch = useCallback(e => {
    setSearch(e.target.value)
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
        page={currentPage}
        setPage={setCurrentPage}
        search={debouncedSearch}
        renderSearch={renderSearchForum}
      />
    )
  }

  return <ForumListContainer renderForumArticleList={renderForumArticleList} />
}

export default ForumListPage