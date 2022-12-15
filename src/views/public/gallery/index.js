import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import { Skeleton, Text, Tooltip } from 'core/components'
import { useSelector } from 'react-redux'
import { hooks, utils, styleHelper } from 'utility'
import { actions } from 'store'

import { ModalGallery } from './components'

const GalleryPage = () => {

  // ** Store & Actions
  const getDataGallery = hooks.useCustomDispatch(actions.gallerys.getDataGallery)

  const galleryList = useSelector(state => state.gallerys).galleryList
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(12)
  const [galleryDetail, setGalleryDetail] = useState({
    id: 0,
    folder_name: '',
    description: '',
    path_thumbnail: '',
    status: 1,
    created_by: 1,
    created_date: '',
    modified_by: null,
    modified_date: null,
    detail: []
  })
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    getDataGallery({
      page: currentPage,
      perPage: rowsPerPage
    })
  }, [currentPage])

  const onClickPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }

  const onClickNextPage = () => {
    const pageCount = Math.ceil(galleryList?.total / rowsPerPage) || 1

    if (currentPage < pageCount) {
      setCurrentPage(prevPage => prevPage + 1)
    }
  }

  const classNameArrow = enabled => styleHelper.classNames(
    'w-5 h-5',
    enabled ? 'text-black-primary hover:text-primary cursor-pointer' : 'text-gray-400'
  )

  const renderArrowPagination = () => {
    const enabledPrevArrow = currentPage > 1
    const enabledNextArrow = currentPage < (Math.ceil(galleryList?.total / rowsPerPage) || 1)

    return (
      <div className='flex items-center gap-x-5'>
        <ChevronLeftIcon className={classNameArrow(enabledPrevArrow)} onClick={onClickPrevPage} />

        <span className='w-0 h-4.5 border-l border-grey-base' />

        <ChevronRightIcon className={classNameArrow(enabledNextArrow)} onClick={onClickNextPage} />
      </div>
    )
  }

  const renderGalleryList = () => {
    const loading = utils.isLazyLoading(lazyLoad, 'getDataGallery')
    const listData = loading
      ? utils.createDummyArray(rowsPerPage, {
        path_thumbnail: '',
        folder_name: ''
      })
      : (galleryList?.data || [])

    return (
      <div className='flex flex-wrap gap-x-4 sm:gap-x-7 gap-y-4'>
        {listData.map((data, index) => {
          return (
            <Skeleton loading={loading} className='h-[150px] sm:h-[196px] w-full sm:w-1/4' key={index}>
              <div className='relative group flex cursor-pointer' onClick={() => {
                setGalleryDetail({
                  ...data,
                  detail: data.detail?.length
                    ? [{ path_image: data.path_thumbnail }, ...data.detail]
                    : [{ path_image: data.path_thumbnail }]
                })
                setActiveImageIdx(0)
                setOpenModal(true)
              }}>
                <span className='group-hover:bg-gradient2 absolute inset-0 z-[1]' />

                <img
                  className='h-[150px] sm:h-[196px] w-full sm:w-1/4 object-cover skeleton-box'
                  onLoad={({ currentTarget }) => {
                    currentTarget.className = 'h-[150px] sm:h-[196px] object-cover'
                  }}
                  onError={({ currentTarget }) => {
                    currentTarget.className = 'h-[150px] sm:h-[196px] sm:w-[250px] w-[200px] bg-gray-200'
                  }}
                  src={utils.getImageAPI(data.path_thumbnail)}
                  alt={data.folder_name}
                />

                <div className='hidden lg:flex z-[2] absolute left-3 bottom-2.5 lg:bottom-0 lg:group-hover:bottom-2.5 right-3 lg:opacity-0 lg:group-hover:opacity-100 transition-all transform duration-500'>
                  <Tooltip description={data.folder_name}>
                    <Text
                      size='text-xs'
                      color='text-white'
                      weight='font-extrabold'
                      cursor='cursor-pointer'
                      lineClamp='line-clamp-2'
                    >{data.folder_name}</Text>
                  </Tooltip>
                </div>
              </div>
            </Skeleton>
          )
        })}
      </div>
    )
  }

  return (
    <>
      <div className='py-6 md:py-7'>
        <div className='flex items-center justify-between gap-x-5 mb-7'>
          <Text weight='font-bold' size='text-2.5xl'>Galeri</Text>

          {renderArrowPagination()}
        </div>

        {renderGalleryList()}
      </div>

      <ModalGallery
        open={openModal}
        setOpen={setOpenModal}
        src={galleryDetail.detail?.length ? utils.getImageAPI(galleryDetail.detail[activeImageIdx]?.path_image) : ''}
        alt={galleryDetail.folder_name}
        content={galleryDetail.description}
        onClickArrow={action => {
          if (action === 'next' && activeImageIdx < (galleryDetail.detail?.length - 1)) {
            setActiveImageIdx(prevIdx => prevIdx + 1)
          } else if (action === 'prev' && activeImageIdx > 0) {
            setActiveImageIdx(prevIdx => prevIdx - 1)
          }
        }}
      />
    </>
  )
}

export default GalleryPage