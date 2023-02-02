import React, { useState, Suspense, lazy, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { EllipsisVerticalIcon, HeartIcon } from '@heroicons/react/24/outline'

import { hooks, momentHelper, styleHelper, utils } from 'utility'
import { actions } from 'store'
import { images } from 'constant'
import { apiConfig } from 'configs'

import Card from '../../../Card'
import CounterArticle from '../../../CounterArticle'
import Text from '../../../Text'
import CustomIcon from '../../../CustomIcon'
import Menu from '../../../Menu'
import PopoverSharedButtons from '../../../PopoverSharedButtons'
import RadioGroup from '../../../RadioGroup'
import ButtonPrimary from '../../../Button/ButtonPrimary'

import TextArticle from '../TextArticle'

const ModalImage = lazy(() => import('../../../ModalImage'))
const Modal = lazy(() => import('../../../Modal'))

const menuCardArticle = [
  {
    id: 'delete',
    name: 'Hapus',
    icon: () => <CustomIcon iconName='trash_outline' />
  }
]

const CardArticle = ({
  withActionCard,
  onClickMenuCardArticle,
  onClickComment,
  isMobile,
  isContentTruncate,
  onClickShowMoreContent,
  data
}) => {
  const history = useHistory()

  // ** Store & Actions
  const likeForumArticle = hooks.useCustomDispatch(actions.forums.likeForumArticle)
  const counterViewShare = hooks.useCustomDispatch(actions.forums.counterViewShare)
  const reportArticle = hooks.useCustomDispatch(actions.forums.reportArticle)
  const getReportArticleCategories = hooks.useCustomDispatch(actions.params.getReportArticleCategories)

  const lazyLoad = useSelector(state => state.misc).lazyLoad
  const reportArticleCategories = useSelector(state => state.params).reportArticleCategories

  const [openModalImage, setOpenModalImage] = useState(false)
  const [openModalReport, setOpenModalReport] = useState(false)
  const [activeRadioReport, setActiveRadioReport] = useState('')
  const [showSuccessReport, setShowSuccessReport] = useState(false)

  const handleLike = id => {
    if (!utils.isUserLoggedIn()) {
      history.push('/login')
      return
    }

    likeForumArticle({
      group: 1,
      id,
      reducer: 'forums'
    })
  }

  const handleShare = id => {
    counterViewShare({
      id,
      group: 1,
      counter: 'share',
      reducer: 'forums'
    })
  }

  const onSubmitReport = () => {
    const requestBody = {
      article_id: {
        value: data?.id || 0,
        label: data?.title || ''
      },
      jenis_laporan: activeRadioReport
    }

    reportArticle(requestBody, isSuccess => {
      if (isSuccess) setShowSuccessReport(true)
    })
  }

  const handleReport = () => {
    if (!utils.isUserLoggedIn()) {
      history.push('/login')
      return
    }

    getReportArticleCategories()
    setOpenModalReport(true)
  }

  const onResetReport = () => {
    setTimeout(() => {
      setActiveRadioReport('')

      setShowSuccessReport(false)
    }, 400)
  }

  const onCloseModalReport = useCallback(() => {
    setOpenModalReport(false)

    onResetReport()
  }, [])

  const onChangeRadio = useCallback(e => setActiveRadioReport(e.target.id), [])

  const renderRadioReportType = () => {
    const reportOptions = reportArticleCategories.map(option => ({
      id: option.label,
      title: option.label
    }))
    const loading = utils.isLazyLoading(lazyLoad, 'getComplaintCategories')

    return (
      <RadioGroup
        direction='vertical'
        textSize='text-base'
        border='focus:ring-0 focus:outline-none focus:ring-transparent border checked:!border-primary border-black-primary border-2'
        accentColor='text-white'
        value={activeRadioReport}
        onChange={onChangeRadio}
        spacing='m-0'
        options={reportOptions}
        loading={loading}
        inverse
      />
    )
  }

  const renderModalReport = () => {
    const loadingSubmitReport = utils.isLazyLoading(lazyLoad, 'reportArticle')
    const disabledButton = showSuccessReport
      ? false
      : !activeRadioReport

    return (
      <Modal
        open={openModalReport}
        setOpen={setOpenModalReport}
        padding='p-6'
        width='w-full max-w-sm'
        closeButton={false}
        onCloseModal={onResetReport}
      >
        <div className='flex flex-col gap-7'>
          <Text size='text-2xl' weight='font-bold'>Laporkan Thread Ini</Text>

          <div>
            {showSuccessReport
              ? <Text>Laporan Anda sudah dikirim ke admin Bawaslu dan akan segera ditindak lanjuti, Terimakasih</Text>
              : (
                <>
                  <Text spacing='mb-4.5'>Alasan Pelaporan</Text>

                  {renderRadioReportType()}
                </>
              )}
          </div>

          <div className='w-full'>
            <ButtonPrimary
              sizing='w-full'
              fontSize='text-base'
              spacing='py-[9px] px-4'
              onClick={showSuccessReport ? onCloseModalReport : onSubmitReport}
              loading={loadingSubmitReport}
              disabled={disabledButton}
            >{showSuccessReport ? 'Tutup' : 'Laporkan'}</ButtonPrimary>
          </div>
        </div>
      </Modal>
    )
  }

  const renderPopoverShare = (data, isMobile) => {
    return (
      <PopoverSharedButtons
        onShareWindowClose={() => handleShare(data?.id)}
        title={data?.title}
        url={`${apiConfig.baseUrlFE}/forum/${data?.slug}`}
      >
        <CounterArticle
          renderIcon={() => <CustomIcon iconName='share' className='w-5 h-5' />}
          text={`${utils.getNumberUnit(data?.counter_share || 0)}${isMobile ? '' : ' Dibagikan'}`}
        />
      </PopoverSharedButtons>
    )
  }

  const renderCounter = data => {
    return (
      <div className='flex items-center flex-wrap w-full gap-y-2.5 mt-6 px-3 gap-x-4.5'>
        <CounterArticle
          renderIcon={() => (
            <HeartIcon className={styleHelper.classNames(
              'w-5 h-5 cursor-pointer',
              data?.like ? 'fill-[#EB5757] stroke-[#EB5757]' : ''
            )} />
          )}
          text={`${utils.getNumberUnit(data?.counter_like || 0)}${isMobile ? '' : ' Menyukai'}`}
          onClick={() => handleLike(data?.id)}
        />
        <CounterArticle
          renderIcon={() => (<CustomIcon iconName='comment' className='w-5 h-5 cursor-pointer' />)}
          text={`${utils.getNumberUnit(data?.counter_comment || 0)}${isMobile ? '' : ' Komentar'}`}
          onClick={onClickComment}
        />

        {renderPopoverShare(data, isMobile)}
      </div>
    )
  }

  const renderCardArticle = () => {
    const author = data?.author

    return (
      <Card paddingHorizontal='px-0' paddingVertical='py-4'>
        <div className='flex flex-col'>
          <div className='px-3 gap-y-1.5 flex flex-col'>
            <div className='flex justify-between items-start pb-4.5'>
              <div className='flex'>
                <div className='mr-4 flex-shrink-0 self-center'>
                  <img
                    className='inline-block h-11 w-11 rounded-full'
                    src={utils.getImageAPI(author?.image_foto)}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null
                      currentTarget.src = images.empty_state.profile
                    }}
                    alt={author?.full_name}
                  />
                </div>
                <div className='grid gap-y-1'>
                  <Text size='text-sm' weight='font-bold' color='text-black-default'>{author?.full_name}</Text>
                  <Text size='text-xs' color='text-grey-base'>{momentHelper.formatDateFull(data?.created_date)}</Text>
                </div>
              </div>

              {withActionCard
                ? (
                  <Menu
                    renderButton={() => <EllipsisVerticalIcon className='w-5 h-5' />}
                    menuItems={menuCardArticle}
                    onClickMenuItem={menu => onClickMenuCardArticle(menu, data)}
                  />
                )
                : (
                  <div className='flex items-center gap-1.5 cursor-pointer' onClick={handleReport}>
                    <CustomIcon iconName='flag_outline' />

                    <Text
                      size='text-xs'
                      weight='font-medium'
                      className='italic'
                      cursor='cursor-pointer'
                    >Laporkan</Text>
                  </div>
                )}
            </div>

            <Text
              weight='font-bold'
              className='break-words'
              style={{ wordBreak: 'break-word' }}
            >{data?.title}</Text>

            <TextArticle
              text={data?.description || ''}
              isTruncate={isContentTruncate}
              onClickShowMore={onClickShowMoreContent}
            />
          </div>

          {data?.path_image && (
            <div>
              <img
                alt={data?.title}
                src={utils.getImageAPI(data?.path_image)}
                className='w-full h-full max-h-80 mt-1.5 object-cover cursor-pointer hover:ring-1 hover:ring-secondary'
                onClick={() => setOpenModalImage(true)}
              />
            </div>
          )}

          {renderCounter(data)}
        </div>
      </Card>
    )
  }

  return (
    <>
      {renderCardArticle()}

      {data?.path_image && (
        <Suspense fallback={<></>}>
          <ModalImage
            src={utils.getImageAPI(data?.path_image)}
            open={openModalImage}
            setOpen={setOpenModalImage}
            alt={data?.title}
          />
        </Suspense>
      )}

      <Suspense fallback={<></>}>
        {renderModalReport()}
      </Suspense>
    </>
  )
}

export default CardArticle