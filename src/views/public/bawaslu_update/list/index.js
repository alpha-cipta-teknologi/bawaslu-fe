import React from 'react'

import { Text } from 'core/components'
import { Link } from 'react-router-dom'

const tranding = [
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'
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

const updateTerbaru = [
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'
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
  },
  {
    date: '27 Nov 2022',
    title: 'Unja teken MoU dengan Bawaslu Jambi',
    image: 'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'
  }
]

const BawasluUpdateListPage = () => {
  return (
    <div className='py-3 md:py-6'>
      <Text weight='font-bold' size='text-2xl' className='mb-7'>Bawaslu Update</Text>
      <div className='flex flex-col w-full md:flex-row'>
        <div className='w-full md:flex-auto md:w-96 h-[434px] relative mb-7 md:mb-0'>
          <Link to='/bawaslu_update/1'>
          <img
            className='w-full h-full'
            src={'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'}
            alt={''}
          />
          <div className='flex flex-col absolute inset-x-0 bottom-4 px-6'>
            <Text size='text-xxs' className='text-[#FFFFFF]' cursor='cursor-pointer'>12 September 2022</Text>
            <Text weight='font-bold' size='text-sm' className='text-[#FFFFFF]' cursor='cursor-pointer'>
              Bawaslu-Pemantau Intensifkan Konsolidasi 20 Pemantau Terakreditasi dan Agendakan “MoU” Serentak
            </Text>
          </div>
          </Link>
        </div>
        <div className='w-full md:flex-1 md:pl-7'>
          {tranding.map((data, key) => {
            return (
              <div className='flex flex-row mb-3' key={key}>
                <img
                  className='h-[140px] w-[200px] md:h-[76px] md:w-[120px]'
                  src={data.image}
                  alt={data.title}
                />
                <div className='flex flex-col flex-auto pl-3'>
                  <Text size='text-xxs'>{data.date}</Text>
                  <Text weight='font-bold' size='text-sm'>
                    {data.title}
                  </Text>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Text weight='font-bold' size='text-2xl' className='my-7'>Update Terbaru</Text>
      <div className='flex flex-wrap'>
        {updateTerbaru.map((data, key) => {
          return (
            <div className='flex flex-col mr-3 mb-7' key={key}>
              <img
                className='h-[140px] w-[200px]'
                src={data.image}
                alt={data.title}
              />
              <div className='flex flex-col mt-3 w-[200px]'>
                <Text size='text-xxs'>{data.date}</Text>
                <Text weight='font-bold' size='text-sm'>
                  {data.title}
                </Text>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BawasluUpdateListPage