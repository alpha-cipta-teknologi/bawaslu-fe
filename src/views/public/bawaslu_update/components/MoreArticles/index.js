import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Text, Skeleton } from 'core/components'
import { apiConfig } from 'configs'
import { momentHelper, utils } from 'utility'

const MoreArticles = ({ limit }) => {
  const bawasluList = useSelector(state => state.bawasluupdates).bawasluList
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const renderList = () => {
    const loading = utils.isLazyLoading(lazyLoad, 'getDataBawasluUpdate') || false
    const listData = loading ? utils.createDummyArray(5, {
      id: 0,
      path_thumbnail: '',
      slug: '',
      created_date: '',
      title: ''
    }) : (bawasluList?.data || [])?.slice(0, limit)

    return (
      <>
        {listData.map((data, index) => {
          return (
            <div className='flex flex-col w-full' key={index}>
              <Skeleton loading={loading} avatar={{ sizing: 'h-[140px] w-full' }}>
                <Link to={`/bawaslu_update/${data.slug}`}>
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
                    href={`/bawaslu_update/${data.slug}`}
                    underlineOnHover
                  >
                    {data.title}
                  </Text>
                </div>
              </Skeleton>
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
