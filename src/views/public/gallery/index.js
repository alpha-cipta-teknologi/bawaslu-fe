import React, { useEffect, useState } from 'react'

import { Text } from 'core/components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { hooks, utils, momentHelper } from 'utility'
import { actions } from 'store'
import { apiConfig } from 'configs'

const updateTerbaru = [
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'
  },
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/350x350/d9ced9/010103.jpg&text=ini+dummy'
  },
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'
  },
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/350x350/d9ced9/010103.jpg&text=ini+dummy'
  },
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/350x350/d9ced9/010103.jpg&text=ini+dummy'
  },
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'
  },
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/350x350/d9ced9/010103.jpg&text=ini+dummy'
  },
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'
  },
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/350x350/d9ced9/010103.jpg&text=ini+dummy'
  },
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/350x350/d9ced9/010103.jpg&text=ini+dummy'
  },
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'
  },
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'
  }
]

const GalleryPage = () => {

  // ** Store & Actions
  const getDataGallery = hooks.useCustomDispatch(actions.gallerys.getDataGallery)

  const galleryList = useSelector(state => state.gallerys).galleryList
  const lazyLoad = useSelector(state => state.misc).lazyLoad
  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : {userdata: null}

  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(12)

  const loading = utils.isLazyLoading(lazyLoad, 'getDataGallery')

  useEffect(() => {
    getDataGallery({
      page: currentPage,
      perPage: rowsPerPage
    })
  }, [currentPage])

  return (
    <div className='py-3 md:py-6'>
      <Text weight='font-bold' size='text-2xl' className='mb-7'>Galeri</Text>
      <div className='flex flex-wrap'>
        {galleryList.data.map((data) => {
          return (
            <div className='flex flex-col mr-3 mb-7 h-[190px]' key={data.id}>
              <img
                className='h-full'
                src={apiConfig.baseUrl + data.path_thumbnail}
                alt={data.folder_name}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GalleryPage