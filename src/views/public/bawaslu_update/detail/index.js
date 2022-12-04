import React from 'react'

import { Text, CustomIcon, Card, Input, Button } from 'core/components'
import { Link } from 'react-router-dom'
import { HeartIcon, EyeIcon } from '@heroicons/react/24/outline'

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
  }
]

const BawasluUpdateDetailPage = () => {
  return (
    <div className='py-3 md:py-6'>
      <Text weight='font-bold' size='text-2xl' className='mb-7'>Bawaslu Update</Text>
      <div className='flex flex-col w-full md:flex-row'>
        <div className='w-full md:flex-auto md:w-96 h-[434px] mb-7 md:mb-0'>
          <img
            className='w-full h-full'
            src={'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'}
            alt={''}
          />
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
      <div className='flex flex-row w-full my-4'>
        <div className='flex flex-row items-center mr-4'>
          <EyeIcon className='w-5 h-5 mr-1' />
          <Text size='text-xs'>13 Melihat</Text>
        </div>
        <div className='flex flex-row items-center mr-4'>
          <HeartIcon className='w-5 h-5 mr-1' />
          <Text size='text-xs'>13 Menyukai</Text>
        </div>
        <div className='flex flex-row items-center mr-4'>
          <CustomIcon iconName='comment' className='w-5 h-5 mr-1' /> 
          <Text size='text-xs'>13 Komentar</Text>
        </div>
        <div className='flex flex-row items-center'>
          <CustomIcon iconName='share' className='w-5 h-5 mr-1' /> 
          <Text size='text-xs'>13 Dibagikan</Text>
        </div>
      </div>
      <div className='flex flex-col'>
        <Text size='text-xxs' className='mb-3'>12 September 2022</Text>
        <Text weight='font-bold' size='text-sm' className='mb-3'>
          Bawaslu-Pemantau Intensifkan Konsolidasi 20 Pemantau Terakreditasi dan Agendakan “MoU” Serentak
        </Text>
        <Text size='text-sm' className='mb-3'>
          Jumat, 9 September 2022 - 01:20 WIB
          Bawaslu resmi mengakreditasi 20 lembaga pemantau pemilu nasional, Rabu (7/9/2022). Untuk menguatkan partisipasi masyarakat dalam mengawasi pemilu, Bawaslu meningkatkan konsolidasi dengan pemantau pemilu secara intensif.
          Bawaslu menyambut baik isu yang menjadi fokus pemantauan lembaga-lembaga pemantau ini, yaitu pemilu akses bagi disabilitas, politisasi SARA, korupsi, politik uang, hoaks, literasi digital, netralitas ASN dan TNI/Polri. Pada pemilu-pemilu terdahulu, isu-isu ini belum menjadi fokus pemantauan.
        </Text>
      </div>
      <Card cardClassName='mb-2 bg-[#F6F9FB]' contentClassName='flex flex-row justify-around items-center' paddingVertical='p-3' paddingHorizontal='p-3'>
        <div className='flex-shrink-0 bg-gray-200 h-8 w-8 rounded-full'>
          <img
            className='h-8 w-8 rounded-full'
            src={'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
            alt={'Yudi Wahyudi'}
          />
        </div>
        <Input
          containerClassName='border border-solid border-[#E0E0E0] flex-auto mx-4'
          key={'title'}
          id={'title'}
          placeholder='Tambahkan Komentar'
        />
        <Button.ButtonPrimary
          href='/forum/create'
          spacing='py-2.5 px-5'
          fontSize='text-base'
        >
          Tambah Komentar
        </Button.ButtonPrimary>
      </Card>
      <Card cardClassName='mb-2' contentClassName='flex flex-row justify-around' paddingVertical='p-3' paddingHorizontal='p-3'>
        <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-11 w-11 rounded-full'>
          <img
            className='h-11 w-11 rounded-full'
            src={'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
            alt={'Yudi Wahyudi'}
          />
        </div>
        <div className='flex-auto'>
          <div className='flex flex-row justify-between'>
            <Text
              size='text-xs'
              weight='font-bold'
              lineClamp='line-clamp-1'
              cursor='cursor-pointer'
            >Yudi Wahyudi</Text>
            <Text
              size='text-xxs'
              color='text-grey-base'
              lineClamp='line-clamp-1'
              cursor='cursor-pointer'
            >27 September 2022 12:00</Text>
          </div>
          <Text size='text-sm' className='mb-1'>
          Bagus nih acara kayak gini harus dilauin biar generasi muda kita melek sama politik
          </Text>
        </div>
      </Card>
      <Text weight='font-bold' size='text-2xl' className='my-7'>Berita Lainnya</Text>
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

export default BawasluUpdateDetailPage