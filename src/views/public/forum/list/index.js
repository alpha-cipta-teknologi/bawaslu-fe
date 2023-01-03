import React, { useState } from 'react'

import { ForumArticleList } from 'core/components'

import { ForumListContainer } from '../components'

const ForumListPage = () => {
  // ** States
  const [currentPage, setCurrentPage] = useState(1)

  const renderForumArticleList = () => {
    return (
      <ForumArticleList
        fulfilledCondition
        emptyStateTitle='Tidak ada thread'
        wrapperListClassName='lg:mx-2'
        page={currentPage}
        setPage={setCurrentPage}
      />
    )
  }

  return <ForumListContainer renderForumArticleList={renderForumArticleList} />
}

export default ForumListPage