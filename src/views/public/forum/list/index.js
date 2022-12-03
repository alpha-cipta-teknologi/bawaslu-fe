import React from 'react'

import { Text, Card, Button, CustomIcon, Input } from 'core/components'
import { HeartIcon } from '@heroicons/react/24/outline'

const ForumListPage = () => {
  return (
    <div className='py-5 md:py-11'>
      <div className='flex flex-col w-full md:flex-row'>
        <div className='w-full md:flex-1 md:w-20'>
          <Card cardClassnames='flex-row'>
            <Text weight='font-bold'>Trending</Text>
            <ul className="list-disc pl-3 pr-3">
              <li><Text size='text-sm'>Bawaslu Lakukan Penyuluhan ke SMA se jabodetabek.</Text></li>
              <li><Text size='text-sm'>Bawaslu Lakukan Penyuluhan ke SMA se jabodetabek.</Text></li>
              <li><Text size='text-sm'>Bawaslu Lakukan Penyuluhan ke SMA se jabodetabek.</Text></li>
              <li><Text size='text-sm'>Bawaslu Lakukan Penyuluhan ke SMA se jabodetabek.</Text></li>
              <li><Text size='text-sm'>Bawaslu Lakukan Penyuluhan ke SMA se jabodetabek.</Text></li>
            </ul>
          </Card>
        </div>
        <div className='flex flex-col w-full md:flex-auto md:w-60'>
          <Card cardClassName='mt-1 mb-2 md:mt-0 md:ml-2 md:mr-2' contentClassName='flex flex-col'>
            <span className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'>
              <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
                <img
                  className='h-8 w-8 rounded-full'
                  src={'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                  alt={'Yudi Wahyudi'}
                />
              </div>
              <div className='flex-1'>
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
                >27 September 2022</Text>
              </div>
            </span>
            <Text weight='font-bold' size='text-sm'>
              Bawaslu Lakukan Penyuluhan ke SMA se jabodetabek.
            </Text>
            <Text size='text-sm' className='mb-1'>
              Komunitas Digital Pengawasan Partisipatif adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid u (lanjut)
            </Text>
            <img
              className='w-full'
              src={'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'}
              alt={''}
            />
            <div className='flex flex-row w-full mt-2'>
              <div className='flex flex-row items-center mr-4'>
                <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
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
          </Card>
          <Card cardClassName='mb-2 bg-[#F6F9FB] md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around items-center' paddingVertical='p-3' paddingHorizontal='p-3'>
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
             Komentar
            </Button.ButtonPrimary>
          </Card>
          <Card cardClassName='mb-2 md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around' paddingVertical='p-3' paddingHorizontal='p-3'>
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
              <div className='flex flex-row w-full mt-2 mb-1'>
                <div className='flex flex-row items-center mr-4'>
                  <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
                </div>
                <div className='flex flex-row items-center mr-4'>
                  <CustomIcon iconName='comment' className='w-5 h-5 mr-1' /> 
                  <Text size='text-xs'>Balas</Text>
                </div>
              </div>
              <Card cardClassName='mb-2 bg-[#F6F9FB] md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around items-center' paddingVertical='p-3' paddingHorizontal='p-3'>
                <Input
                  containerClassName='border border-solid border-[#E0E0E0] flex-auto mr-4'
                  key={'title'}
                  id={'title'}
                  placeholder='Balas'
                />
                <Button.ButtonPrimary
                  href='/forum/create'
                  spacing='py-2.5 px-5'
                  fontSize='text-base'
                >
                Balas
                </Button.ButtonPrimary>
              </Card>
            </div>
          </Card>
          <Card cardClassName='mb-2 md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around' paddingVertical='p-3' paddingHorizontal='p-3'>
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
                TOP BGT ya
              </Text>
              <div className='flex flex-row w-full mt-2 mb-1'>
                <div className='flex flex-row items-center mr-4'>
                  <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
                </div>
                <div className='flex flex-row items-center mr-4'>
                  <CustomIcon iconName='comment' className='w-5 h-5 mr-1' /> 
                  <Text size='text-xs'>Balas</Text>
                </div>
              </div>
              <Card cardClassName='mb-2 md:ml-2 md:mr-2' contentClassName='flex flex-row justify-around' paddingVertical='p-3' paddingHorizontal='p-3' border='border-0'>
                <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
                  <img
                    className='h-8 w-8 rounded-full'
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
                    >Samsul Anwar</Text>
                    <Text
                      size='text-xxs'
                      color='text-grey-base'
                      lineClamp='line-clamp-1'
                      cursor='cursor-pointer'
                    >27 September 2022 12:00</Text>
                  </div>
                  <Text size='text-sm' className='mb-1'>
                    Kamu naenya?
                  </Text>
                  <div className='flex flex-row w-full mt-2'>
                    <div className='flex flex-row items-center mr-4'>
                      <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
                    </div>
                    <div className='flex flex-row items-center mr-4'>
                      <CustomIcon iconName='comment' className='w-5 h-5 mr-1' /> 
                      <Text size='text-xs'>Balas</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
          <Card cardClassName='mt-1 mb-2 md:mt-0 md:ml-2 md:mr-2' contentClassName='flex flex-col'>
            <span className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'>
              <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
                <img
                  className='h-8 w-8 rounded-full'
                  src={'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                  alt={'Yudi Wahyudi'}
                />
              </div>
              <div className='flex-1'>
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
                >27 September 2022</Text>
              </div>
            </span>
            <Text weight='font-bold' size='text-sm'>
              Bawaslu Lakukan Penyuluhan ke SMA se jabodetabek.
            </Text>
            <Text size='text-sm' className='mb-1'>
              Komunitas Digital Pengawasan Partisipatif adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid u (lanjut)
            </Text>
            <img
              className='w-full'
              src={'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'}
              alt={''}
            />
            <div className='flex flex-row w-full mt-2'>
              <div className='flex flex-row items-center mr-4'>
                <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
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
          </Card>
          <Card cardClassName='mt-1 mb-2 md:mt-0 md:ml-2 md:mr-2' contentClassName='flex flex-col'>
            <span className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'>
              <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
                <img
                  className='h-8 w-8 rounded-full'
                  src={'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                  alt={'Yudi Wahyudi'}
                />
              </div>
              <div className='flex-1'>
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
                >27 September 2022</Text>
              </div>
            </span>
            <Text weight='font-bold' size='text-sm'>
              Bawaslu Lakukan Penyuluhan ke SMA se jabodetabek.
            </Text>
            <Text size='text-sm' className='mb-1'>
              Komunitas Digital Pengawasan Partisipatif adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid u (lanjut)
            </Text>
            <img
              className='w-full'
              src={'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'}
              alt={''}
            />
            <div className='flex flex-row w-full mt-2'>
              <div className='flex flex-row items-center mr-4'>
                <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
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
          </Card>
          <Card cardClassName='mt-1 mb-2 md:mt-0 md:ml-2 md:mr-2' contentClassName='flex flex-col'>
            <span className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'>
              <div className='flex-shrink-0 mr-2.5 bg-gray-200 h-8 w-8 rounded-full'>
                <img
                  className='h-8 w-8 rounded-full'
                  src={'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                  alt={'Yudi Wahyudi'}
                />
              </div>
              <div className='flex-1'>
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
                >27 September 2022</Text>
              </div>
            </span>
            <Text weight='font-bold' size='text-sm'>
              Bawaslu Lakukan Penyuluhan ke SMA se jabodetabek.
            </Text>
            <Text size='text-sm' className='mb-1'>
              Komunitas Digital Pengawasan Partisipatif adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid u (lanjut)
            </Text>
            <img
              className='w-full'
              src={'https://dummyimage.com/550x320/d9ced9/010103.jpg&text=ini+dummy'}
              alt={''}
            />
            <div className='flex flex-row w-full mt-2'>
              <div className='flex flex-row items-center mr-4'>
                <HeartIcon className='w-5 h-5 mr-1 fill-[#EB5757] stroke-[#EB5757]' />
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
          </Card>
        </div>
        <div className='w-full md:flex-1 md:w-20'>
          <Card>
            <Text weight='font-bold'>Buat Thread</Text>
            <Button.ButtonPrimary
              href='/forum/create'
              spacing='py-2.5 px-5'
              fontSize='text-base'
              sizing='w-full'
            >
              Buat
            </Button.ButtonPrimary>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ForumListPage