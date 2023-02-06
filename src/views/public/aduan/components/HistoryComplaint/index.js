import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'

import { Button, EmptyState, Modal, Spinner, Text, TextHTML, Input } from 'core/components'
import { hooks, momentHelper, utils } from 'utility'
import { actions } from 'store'

import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const tabs = [{ name: 'Buat Pengaduan' }, { name: 'Riwayat Saya' }]

const rowsPerPage = 10

const HistoryComplaint = ({ selectedTab, setSelectedTab }) => {
  // ** Store & Actions
  const lazyLoad = useSelector(state => state.misc).lazyLoad
  const historyComplaintList = useSelector(state => state.complaint).historyComplaintList

  const getHistoryReportComplaint = hooks.useCustomDispatch(actions.complaint.getHistoryReportComplaint)

  const [isMounted, setIsMounted] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [hasMoreData, setHasMoreData] = useState(true)
  const [showModalDetailCard, setShowModalDetailCard] = useState(false)
  const [activeComplaint, setActiveComplaint] = useState(null)

  const debouncedSearch = hooks.useDebounce(search, 800)
  const loadingHistory = utils.isLazyLoading(lazyLoad, 'getHistoryReportComplaint') || !isMounted

  const observer = useRef()
  const lastElementRef = useCallback(node => {
    if (loadingHistory) return

    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreData) {
        setPage(prev => prev + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [loadingHistory, hasMoreData])

  useEffect(() => {
    if (selectedTab.includes('Riwayat')) {
      const pageCount = Math.ceil(historyComplaintList?.total / rowsPerPage) || 1

      if (page >= pageCount) {
        setHasMoreData(false)
      } else {
        setHasMoreData(true)
      }
    }
  }, [page, selectedTab, historyComplaintList?.total])

  const fetchHistoryComplaint = () => {
    getHistoryReportComplaint({
      page,
      perPage: rowsPerPage,
      q: debouncedSearch
    }, () => {
      if (!isMounted) setIsMounted(true)
    })
  }

  useEffect(() => {
    if (selectedTab.includes('Riwayat')) {
      fetchHistoryComplaint()
    }
  },
    [
      page,
      debouncedSearch,
      selectedTab
    ]
  )

  useEffect(() => {
    if (isMounted && selectedTab.includes('Riwayat')) {
      setPage(1)
    }
  }, [selectedTab, debouncedSearch])

  const onChangeSearch = useCallback(e => {
    setSearch(e.target.value)
  }, [])

  const onClickToFormComplaint = () => setSelectedTab(tabs[0].name)

  const onToggleShowModalDetailCard = (complaint) => {
    setActiveComplaint(complaint)
    setShowModalDetailCard(true)
  }

  const renderSearch = () => {
    return (
      <div className='w-full'>
        <Input
          id='search'
          type='search'
          placeholder='Cari riwayat aduan'
          name='search'
          value={search}
          onChange={onChangeSearch}
          inputClassName='block w-full'
          borderColor='border-gray-200'
          textSize='text-sm'
          padding='px-5 py-2.5'
          spacing='m-0'
        />
      </div>
    )
  }

  const renderComplaintContent = complaint => {
    return (
      <>
        <div className='flex items-center border-b border-gray-200 p-4 sm:gap-x-6 sm:p-6'>
          <div className='grid flex-1 grid-cols-1 gap-y-3 sm:gap-x-6 sm:col-span-3 sm:grid-cols-3'>
            <div className='flex flex-col gap-1'>
              <Text size='text-sm' weight='font-bold'>Kategori</Text>

              <Text size='text-sm'>{complaint.jenis_aduan || '-'}</Text>
            </div>

            <div className='flex flex-col gap-1'>
              <Text size='text-sm' weight='font-bold'>Tujuan Aduan</Text>

              <Text size='text-sm'>{utils.titleCase(complaint.regency?.name || '-')}</Text>
            </div>

            <div className='flex flex-col gap-1'>
              <Text size='text-sm' weight='font-bold'>Link Berita</Text>

              {complaint?.link_berita
                ? (
                  <a
                    href={complaint?.link_berita}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='break-all'
                  >
                    <Text size='text-sm' color='text-secondary' underlineOnHover>{complaint?.link_berita}</Text>
                  </a>
                ) : <Text size='text-sm'>-</Text>}
            </div>
          </div>
        </div>

        <div className='p-4 sm:p-6'>
          <div className='flex items-center sm:items-start'>
            <div className='flex flex-col gap-2.5'>
              <Text size='text-lg' weight='font-bold'>{complaint.title}</Text>

              <TextHTML
                size='text-sm'
                lineClamp='line-clamp-2'
                lineHeight='leading-6'
                style={{ maxHeight: `${(2 * 1.25)}rem` }}
                htmlString={complaint?.description || '-'}
              />
            </div>
          </div>

          <div className='mt-6 flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center'>
            <div className='flex items-center'>
              <CheckCircleIcon className='h-5 w-5 text-green-500' aria-hidden='true' />
              <Text weight='font-medium' color='text-grey-dark' spacing='ml-2' size='text-sm'>
                Dibuat pada {momentHelper.formatDate(complaint.created_date)}
              </Text>
            </div>

            <Button.BasicButton
              onClick={() => onToggleShowModalDetailCard(complaint)}
              fontSize='text-sm'
              fontWeight='font-bold'
              fontColor='text-secondary'
              borderRadius='rounded-md'
              border='border border-gray-300 focus:outline-none focus:ring-0'
              background='bg-white hover:bg-gray-50'
              spacing='py-2 px-2.5'
              shadow='shadow-sm'
            >
              Lihat Detail
            </Button.BasicButton>
          </div>
        </div>
      </>
    )
  }

  const renderHistoryList = () => {
    const historyComplaintData = historyComplaintList?.data || []
    const cardClassName = 'border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border'

    if (!historyComplaintData.length && debouncedSearch) {
      return (
        <EmptyState title='Riwayat tidak ditemukan' subtitle='Silakan cari dengan kata kunci lainnya' />
      )
    }

    return (
      <div className='flex flex-col gap-y-6'>
        {historyComplaintData.map((complaint, index) => {
          const isLastElement = historyComplaintData?.length === index + 1

          return isLastElement ? (
            <div key={complaint.id} ref={lastElementRef} className={cardClassName}>
              {renderComplaintContent(complaint)}
            </div>
          ) : (
            <div key={complaint.id} className={cardClassName}>
              {renderComplaintContent(complaint)}
            </div>
          )
        })}
      </div>
    )
  }

  const renderSpinner = () => {
    return (
      <div className='my-12.5 center-content'>
        <Spinner sizing='w-7.5 h-7.5' />
      </div>
    )
  }

  const renderContent = () => {
    const historyComplaintData = historyComplaintList?.data || []

    if (!historyComplaintData?.length && !loadingHistory && !debouncedSearch) {
      return (
        <EmptyState title='Anda tidak memiliki riwayat' subtitle='Anda bisa membuat pengaduan Anda disini'>
          <div className='mt-5'>
            <Button.ButtonPrimary onClick={onClickToFormComplaint}>Buat Pengaduan</Button.ButtonPrimary>
          </div>
        </EmptyState>
      )
    }

    return (
      <div className='mx-auto max-w-2xl space-y-8 lg:max-w-4xl'>
        {renderSearch()}

        {!isMounted || (loadingHistory && page === 1)
          ? renderSpinner()
          : renderHistoryList()
        }

        {loadingHistory
          && isMounted
          && page > 1
          && renderSpinner()}
      </div>
    )
  }

  const renderModalDetail = () => {
    return (
      <Modal
        open={showModalDetailCard}
        setOpen={setShowModalDetailCard}
        title={(
          <Text size='text-lg' weight='font-bold'>{activeComplaint?.title}</Text>
        )}
        padding='p-4'
      >
        <div className='flex flex-col gap-5 divide-y divide-gray-300 max-h-[60vh] overflow-y-auto custom-scrollbar'>
          <TextHTML size='text-sm' htmlString={activeComplaint?.description || ''} />

          <div className='pt-5 flex flex-col gap-2'>
            <Text size='text-sm' weight='font-bold'>Kategori:</Text>
            <Text size='text-sm'>{activeComplaint?.jenis_aduan || '-'}</Text>
          </div>

          <div className='pt-5 flex flex-col gap-2'>
            <Text size='text-sm' weight='font-bold'>Tujuan Aduan:</Text>
            <Text size='text-sm'>{activeComplaint?.regency?.name || '-'}</Text>
          </div>

          <div className='pt-5 flex flex-col gap-2'>
            <Text size='text-sm' weight='font-bold'>Link Berita:</Text>

            {activeComplaint?.link_berita
              ? (
                <a
                  href={activeComplaint?.link_berita}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Text size='text-sm' color='text-secondary' underlineOnHover>{activeComplaint?.link_berita}</Text>
                </a>
              ) : <Text size='text-sm'>-</Text>}
          </div>

          <div className='pt-5 flex flex-col gap-2'>
            <Text size='text-sm' weight='font-bold'>Konfirmasi:</Text>
            <Text size='text-sm'>{activeComplaint?.hasil_cek_fakta || '-'}</Text>
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <>
      {renderContent()}

      {renderModalDetail()}
    </>
  )
}

export default HistoryComplaint
