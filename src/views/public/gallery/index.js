import React from 'react'

import { Text } from 'core/components'
import { Link } from 'react-router-dom'

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
  return (
    <div className='py-3 md:py-6'>
      <Text weight='font-bold' size='text-2xl' className='mb-7'>Galeri</Text>
      <div className='flex flex-wrap'>
        {updateTerbaru.map((data, key) => {
          return (
            <div className='flex flex-col mr-3 mb-7 h-[190px]' key={key}>
              <img
                className='h-full'
                src={data.image}
                alt={data.title}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GalleryPage