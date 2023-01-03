import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { ForumArticleList } from 'core/components'

import { hooks } from 'utility'
import { actions } from 'store'

import { ForumListContainer } from '../components'

const ForumListChannelPage = () => {
  const { channelid } = useParams()

  const getAllDataCommunity = hooks.useCustomDispatch(actions.communities.getAllDataCommunity)

  // ** States
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getAllDataCommunity()
  }, [])

  const renderForumArticleList = () => {
    return (
      <ForumArticleList
        fulfilledCondition={channelid}
        emptyStateTitle='Tidak ada thread'
        wrapperListClassName='lg:mx-2'
        page={currentPage}
        setPage={setCurrentPage}
        paramsList={{ komunitas_id: channelid }}
      />
    )
  }

  return (
    <ForumListContainer
      channelId={+channelid}
      renderForumArticleList={renderForumArticleList}
      withChannel
    />
  )
}

export default ForumListChannelPage