import React, { Fragment, useEffect, useRef, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Menu, Transition } from '@headlessui/react'

import { images } from 'constant'
import { momentHelper, hooks, utils, styleHelper } from 'utility'
import { actions } from 'store'

import { CustomIcon, Text, Spinner } from '../../../components'

const MenuNotification = ({ rowsPerPage = 10 }) => {
  const getDataNotification = hooks.useCustomDispatch(actions.notifications.getDataNotification)
  const readNotification = hooks.useCustomDispatch(actions.notifications.readNotification)

  const dataNotifications = useSelector(state => state.notifications).dataNotifications
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const isUserLoggedIn = utils.isUserLoggedIn()

  const observer = useRef()

  const [hasMoreData, setHasMoreData] = useState(true)
  const [page, setPage] = useState(1)
  const [isMounted, setIsMounted] = useState(false)

  const loadingNotif = utils.isLazyLoading(lazyLoad, 'getDataNotification')

  const lastElementRef = useCallback(node => {
    if (loadingNotif) return

    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreData) {
        setPage(prev => prev + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [loadingNotif, hasMoreData])

  useEffect(() => {
    if (isUserLoggedIn) {
      const pageCount = Math.ceil(dataNotifications?.total / rowsPerPage) || 1

      if (page >= pageCount) {
        setHasMoreData(false)
      } else {
        setHasMoreData(true)
      }
    }
  }, [page, dataNotifications?.total, isUserLoggedIn])

  const fetchNotification = () => {
    getDataNotification({
      page,
      perPage: rowsPerPage
    }, () => {
      setIsMounted(true)
    })
  }

  useEffect(() => {
    if (isUserLoggedIn) {
      fetchNotification()
    }
  }, [page, isUserLoggedIn])

  const onClickNotification = notifId => {
    readNotification(notifId)
  }

  const renderNotifItem = notif => {
    return (
      <Menu.Item
        as='a'
        href={notif.target_url}
        onClick={() => onClickNotification(notif.id)}
      >
        <span className={styleHelper.classNames(
          'flex items-center p-2 cursor-pointer',
          notif.status === 2 ? 'bg-primary bg-opacity-5 hover:bg-opacity-[0.08]' : 'bg-white hover:bg-gray-100'
        )}>
          <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
            <img
              className='h-8 w-8 rounded-full'
              src={notif.author?.image_foto ? utils.getImageAPI(notif.author?.image_foto) : images.empty_state.profile}
              alt={notif.author?.username || 'profile'}
            />
          </div>
          <div className='flex-1'>
            <Text
              size='text-xs'
              weight='font-bold'
              lineClamp='line-clamp-1'
              cursor='cursor-pointer'
            >{notif.author?.full_name}</Text>
            <Text size='text-xs' lineClamp='line-clamp-3' cursor='cursor-pointer'>{notif.text_message || ''}</Text>
            <Text
              size='text-xxs'
              color='text-grey-base'
              lineClamp='line-clamp-1'
              cursor='cursor-pointer'
            >{momentHelper.formatDateFull(notif.created_date)}</Text>
          </div>
        </span>
      </Menu.Item>
    )
  }

  const renderSpinner = () => {
    return (
      <div className='w-full my-10 flex justify-center items-center'>
        <Spinner sizing='w-6 h-6' />
      </div>
    )
  }

  const renderNotificationList = () => {
    const notifList = dataNotifications?.values || []

    if ((loadingNotif && !isMounted) || (notifList && notifList?.length)) {
      return (
        <>
          {!isMounted || (loadingNotif && page === 1)
            ? renderSpinner()
            : (
              <>
                {notifList.map((notif, i) => {
                  const isLastElement = notifList.length === i + 1

                  return isLastElement ? (
                    <div key={notif.id} ref={lastElementRef}>
                      {renderNotifItem(notif)}
                    </div>
                  ) : (
                    <div key={notif.id}>
                      {renderNotifItem(notif)}
                    </div>
                  )
                })}
              </>
            )}

          {loadingNotif
            && isMounted
            && page > 1
            && renderSpinner()}
        </>
      )
    }

    return (
      <div className='py-10 flex items-center justify-center'>
        <Text align='text-center'>Tidak ada notifikasi</Text>
      </div>
    )
  }

  const renderBadge = () => {
    return <span className='absolute top-0.5 right-0 bg-red-light-1 w-2 h-2 rounded-full' />
  }

  return (
    <Menu as='div' className='relative'>
      <div>
        <Menu.Button className='relative focus:outline-none focus:ring-0'>
          <CustomIcon iconName='bell' className='h-6 w-6' aria-hidden='true' />

          {renderBadge()}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 divide-y divide-grey-light-6 divide-opacity-50 z-10 mt-2 w-48 sm:w-[272px] max-h-[248px] overflow-y-auto custom-scrollbar origin-top-right rounded bg-white shadow-2md focus:outline-none'>
          {renderNotificationList()}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default MenuNotification
