import React, { useCallback, lazy, useState, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { styleHelper, utils } from 'utility'

import Skeleton from '../Skeleton'
import EmptyState from '../EmptyState'

const Tabs = lazy(() => import('../Tabs'))
const Card = lazy(() => import('../Card'))
const Text = lazy(() => import('../Text'))

const CommunityList = ({
  isMobileView,
  cardClassName,
  cardStyle,
  channelId
}) => {
  const history = useHistory()

  const allCommunities = useSelector(state => state.communities)?.allCommunities
  const lazyLoad = useSelector(state => state.misc).lazyLoad

  const [selectedCommunityId, setSelectedCommunityId] = useState(+channelId || 0)
  const [showAllData, setShowAllData] = useState(false)

  const onClickCommunity = useCallback(community => {
    setSelectedCommunityId(+community.value)

    history.push(`/forum/channel/${community.value}`)
  }, [])

  const onClickToggleShowData = useCallback(() => {
    setShowAllData(prev => !prev)
  }, [])

  const resolveData = () => {
    const loading = utils.isLazyLoading(lazyLoad, 'getAllDataCommunity')

    if (loading) {
      return utils.createDummyArray(5, {
        id: 0,
        value: '',
        label: '',
        icon_image: ''
      })
    }

    if (showAllData) return allCommunities || []

    return (allCommunities || [])?.slice(0, 5)
  }

  const renderCommunitiesData = () => {
    const loading = utils.isLazyLoading(lazyLoad, 'getAllDataCommunity')
    const data = resolveData()

    if (!loading && !data?.length) {
      return <EmptyState title='Tidak ada data' subtitle='Komunitas akan segera tersedia untuk Anda' />
    }

    return (
      <div className='divide-y divide-grey-light-6'>
        {data.map((community, index) => {
          const isSelected = +channelId === +community.value
          const iconImage = utils.getImageAPI(community.icon_image)

          return (
            <div key={index} className='flex items-center py-4'>
              <div className='mr-4 flex-shrink-0 self-center'>
                <Skeleton loading={loading} avatar={{
                  sizing: 'w-11 h-11',
                  shape: 'rounded'
                }}>
                  <div className='bg-grey-light-4 w-11 h-11 rounded'>
                    {iconImage && (
                      <img
                        src={iconImage}
                        className='w-full h-full object-cover rounded'
                        alt={community.label}
                      />
                    )}
                  </div>
                </Skeleton>
              </div>
              <div className='w-full'>
                <Skeleton loading={loading} paragraph={{ rows: 2 }}>
                  <div className='flex flex-col gap-1'>
                    <Text
                      size='text-sm'
                      weight='font-semibold'
                      color={isSelected ? 'text-primary' : 'text-black-primary'}
                      lineClamp='line-clamp-2'
                      onClick={() => onClickCommunity(community)}
                      underlineOnHover
                    >{community.label}</Text>

                    <Text size='text-xs' color='text-black-default'>{utils.getNumberUnit(community.counter_thread || 0)} thread | {utils.getNumberUnit(community.counter_resource || 0)} orang</Text>
                  </div>
                </Skeleton>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderTextToggleShowData = () => {
    const data = resolveData()

    if (data?.length) {
      return (
        <Text
          align='text-center'
          color='text-primary'
          weight='font-bold'
          onClick={onClickToggleShowData}
        >{showAllData ? 'Tutup' : 'Lihat Semua'}</Text>
      )
    }

    return null
  }

  const render = () => {
    if (isMobileView) {
      return (
        <Suspense fallback={<></>}>
          <Tabs
            tabs={allCommunities?.map(community => ({
              id: +community.value,
              name: community.label
            }))}
            selectedTab={selectedCommunityId}
            setSelectedTab={setSelectedCommunityId}
            keyName='id'
            wrapperClassName='space-x-6 justify-start overflow-x-auto no-scrollbar'
            onClick={onClickCommunity}
          />
        </Suspense>
      )
    }

    return (
      <Suspense fallback={<></>}>
        <Card
          cardClassName='w-full'
          paddingHorizontal='px-0'
          paddingVertical='py-0'
        >
          <div className={styleHelper.classNames('relative', cardClassName)} style={cardStyle}>
            <div className='flex flex-col p-3'>
              <Text weight='font-bold'>Komunitas</Text>

              {renderCommunitiesData()}
            </div>

            <div className='flex items-center justify-center py-4 -mt-4 px-3 bg-white sticky -bottom-[1px] w-full'>
              {renderTextToggleShowData()}
            </div>
          </div>
        </Card>
      </Suspense>
    )
  }

  return render()
}

export default CommunityList