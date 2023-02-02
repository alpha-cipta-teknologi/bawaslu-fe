import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { EmptyState, ModalImage, Spinner, Text } from 'core/components'
import { actions } from 'store'
import { hooks, utils } from 'utility'

const rowsPerPage = 12

const FactCheckPage = () => {
  // ** Store & Actions
  const lazyLoad = useSelector(state => state.misc).lazyLoad
  const factCheckList = useSelector(state => state.factcheck).factCheckList

  const getDataFactCheck = hooks.useCustomDispatch(actions.factcheck.getDataFactCheck)

  const [isMounted, setIsMounted] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMoreData, setHasMoreData] = useState(true)
  const [showModalDetailCard, setShowModalDetailCard] = useState(false)
  const [activeFact, setActiveFact] = useState(null)

  const loading = utils.isLazyLoading(lazyLoad, 'getDataFactCheck') || !isMounted

  const observer = useRef()
  const lastElementRef = useCallback(node => {
    if (loading) return

    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreData) {
        setPage(prev => prev + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [loading, hasMoreData])

  useEffect(() => {
    const pageCount = Math.ceil(factCheckList?.total / rowsPerPage) || 1

    if (page >= pageCount) {
      setHasMoreData(false)
    } else {
      setHasMoreData(true)
    }
  }, [page, factCheckList?.total])

  const fetchFactCheck = () => {
    getDataFactCheck({
      page,
      perPage: rowsPerPage
    }, () => {
      if (!isMounted) setIsMounted(true)
    })
  }

  useEffect(() => {
    fetchFactCheck()
  }, [page])

  const onClickShowModalDetailCard = (data) => {
    setActiveFact(data)
    setShowModalDetailCard(true)
  }

  const renderSpinner = () => {
    return (
      <div className='my-12.5 center-content'>
        <Spinner sizing='w-7.5 h-7.5' />
      </div>
    )
  }

  const renderContentCard = data => {
    return (
      <>
        <div className='bg-gray-200 group-hover:opacity-75 h-40 lg:h-52 cursor-pointer'>
          <img
            src={utils.getImageAPI(data.path_image || '')}
            alt={data.judul}
            className='h-full w-full object-cover object-center sm:h-full sm:w-full'
          />
        </div>
        <div className='flex flex-1 flex-col space-y-2 p-4 cursor-pointer'>
          <Text
            weight='font-bold'
            lineClamp='line-clamp-3'
            cursor='cursor-pointer'
          >
            <span aria-hidden='true' className='absolute inset-0' />
            {data.judul}
          </Text>

          <div className='flex flex-1 flex-col justify-end cursor-pointer'>
            <Text size='text-sm' color='text-grey-dark'>Link Berita</Text>

            <a
              href={data.link_berita}
              target='_blank'
              rel='noopener noreferrer'
              className='break-all'
            >
              <Text
                size='text-sm'
                weight='font-medium'
                color='text-secondary'
                underlineOnHover
              >{data.link_berita}</Text>
            </a>
          </div>
        </div>
      </>
    )
  }

  const renderFactCheckList = () => {
    const factCheckData = factCheckList?.data || []
    const cardClassName = 'group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white cursor-pointer'

    return (
      <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8'>
        {factCheckData.map((data, index) => {
          const isLastElement = factCheckData?.length === index + 1

          return isLastElement ? (
            <div
              key={data.id}
              ref={lastElementRef}
              className={cardClassName}
              onClick={() => onClickShowModalDetailCard(data)}
            >
              {renderContentCard(data)}
            </div>
          ) : (
            <div
              key={data.id}
              className={cardClassName}
              onClick={() => onClickShowModalDetailCard(data)}
            >
              {renderContentCard(data)}
            </div>
          )
        })}
      </div>
    )
  }

  const renderContent = () => {
    const factCheckData = factCheckList?.data || []

    if (!factCheckData?.length && !loading) {
      return (
        <div className='my-12.5'>
          <EmptyState title='Hasil cek fakta belum tersedia' subtitle='Hasil cek fakta akan segera tersedia untuk Anda disini' />
        </div>
      )
    }

    return (
      <div className='w-full'>
        {!isMounted || (loading && page === 1)
          ? renderSpinner()
          : renderFactCheckList()
        }

        {loading
          && isMounted
          && page > 1
          && renderSpinner()}
      </div>
    )
  }

  const renderModalDetail = () => {
    const src = utils.getImageAPI(activeFact?.path_image || '')

    return (
      <ModalImage
        src={src}
        alt={activeFact?.judul}
        open={showModalDetailCard}
        setOpen={setShowModalDetailCard}
        placementContent='top'
        content={(
          <div className='flex flex-1 flex-col gap-y-5 p-4'>
            <Text size='text-lg' weight='font-bold'>
              {activeFact?.judul}
            </Text>

            <div className='flex flex-col gap-1'>
              <Text color='text-grey-dark'>Link Berita</Text>

              <a
                href={activeFact?.link_berita}
                target='_blank'
                rel='noopener noreferrer'
                className='break-all'
              >
                <Text
                  weight='font-medium'
                  color='text-secondary'
                  underlineOnHover
                >{activeFact?.link_berita}</Text>
              </a>
            </div>
          </div>
        )}
      />
    )
  }

  return (
    <>
      <div className='py-6 md:py-7'>
        <Text weight='font-bold' size='text-2.5xl' spacing='mb-7'>Hasil Cek Fakta</Text>

        {renderContent()}

      </div>

      {renderModalDetail()}
    </>
  )
}

export default FactCheckPage
