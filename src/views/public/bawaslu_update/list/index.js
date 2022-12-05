import React, { useState, useEffect } from 'react'

import { Text } from 'core/components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { hooks, utils, momentHelper } from 'utility'
import { actions } from 'store'
import { apiConfig } from 'configs'

const BawasluUpdateListPage = () => {

  // ** Store & Actions
  const getDataBawasluUpdate = hooks.useCustomDispatch(actions.bawasluupdates.getDataBawasluUpdate)

  const bawasluList = useSelector(state => state.bawasluupdates).bawasluList
  const lazyLoad = useSelector(state => state.misc).lazyLoad
  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : {userdata: null}

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
    <div className='py-3 md:py-6'>
      <Text weight='font-bold' size='text-2xl' className='mb-7'>Bawaslu Update</Text>
      <div className='flex flex-col w-full md:flex-row'>
        <div className='w-full md:flex-auto md:w-96 h-[434px] relative mb-7 md:mb-0'>
          <Link to={`/bawaslu_update/${bawasluList.data[0]?.slug}`}>
          <img
            className='w-full h-full'
            src={apiConfig.baseUrl + bawasluList.data[0]?.path_thumbnail}
            alt={bawasluList.data[0]?.title}
          />
          <div className='flex flex-col absolute inset-x-0 bottom-4 px-6'>
            <Text size='text-xxs' className='text-[#FFFFFF]' cursor='cursor-pointer'>{momentHelper.formatDateFull(bawasluList.data[0]?.created_date)}</Text>
            <Text weight='font-bold' size='text-sm' className='text-[#FFFFFF]' cursor='cursor-pointer'>
              {bawasluList.data[0]?.title}
            </Text>
          </div>
          </Link>
        </div>
        <div className='w-full md:flex-1 md:pl-7'>
          {bawasluList.data.map((data) => {
            return (
              <Link to={`/bawaslu_update/${data.slug}`} key={data.id}>
                <div className='flex flex-row mb-3'>
                  <img
                    className='h-[140px] w-[200px] md:h-[76px] md:w-[120px]'
                    src={apiConfig.baseUrl + data.path_thumbnail}
                    alt={data.title}
                  />
                  <div className='flex flex-col flex-auto pl-3'>
                    <Text size='text-xxs'>{momentHelper.formatDateFull(data.created_date)}</Text>
                    <Text weight='font-bold' size='text-sm'>
                      {data.title}
                    </Text>
                  </div>
                </div>
              </Link>
            )
          }).slice(0, 5)}
        </div>
      </div>
      <Text weight='font-bold' size='text-2xl' className='my-7'>Update Terbaru</Text>
      <div className='flex flex-wrap'>
        {bawasluList.data.map((data) => {
          return (
            <Link to={`/bawaslu_update/${data.slug}`} key={data.id}>
              <div className='flex flex-col mr-3 mb-7'>
                <img
                  className='h-[140px] w-[200px]'
                  src={apiConfig.baseUrl + data.path_thumbnail}
                  alt={data.title}
                />
                <div className='flex flex-col mt-3 w-[200px]'>
                  <Text size='text-xxs'>{momentHelper.formatDateFull(data.created_date)}</Text>
                  <Text weight='font-bold' size='text-sm'>
                    {data.title}
                  </Text>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BawasluUpdateListPage