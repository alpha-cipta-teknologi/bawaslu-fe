import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Tabs } from 'core/components'
import { utils } from 'utility'

import { FormComplaint, HistoryComplaint } from './components'

const tabs = [{ name: 'Buat Pengaduan' }, { name: 'Riwayat Saya' }]

const ComplaintPage = () => {
  const history = useHistory()

  const [selectedTab, setSelectedTab] = useState(tabs[0].name)

  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : { userdata: null }

  useEffect(() => {
    if (!userdata) {
      history.push('/login')
    }
  }, [])

  const renderContent = () => {
    if (selectedTab === 'Buat Pengaduan') {
      return <FormComplaint />
    } else if (selectedTab.includes('Riwayat')) {
      return <HistoryComplaint selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    }
  }

  return (
    <div className='pb-10 md:pb-20 pt-7'>
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        fontWeight='font-bold'
        wrapperClassName='grid grid-cols-2 md:flex md:justify-start md:space-x-8 no-scrollbar'
      />

      <div className='mt-10'>
        {renderContent()}
      </div>
    </div>
  )
}

export default ComplaintPage
