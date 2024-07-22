import React from 'react'
import { Link } from 'react-router-dom'

import { Spinner, Text } from 'core/components'
import { momentHelper, utils } from 'utility'

const TopArticles = ({
  mainArticle,
  sideArticleList,
  isOverlayMainArticle,
  loading,
  isPageDetail
}) => {
  const renderSpinner = () => {
    return (
      <div className='w-full my-12.5 flex justify-center items-center'>
        <Spinner sizing='w-7.5 h-7.5' />
      </div>
    )
  }

  const renderTopArticles = () => {
    if (loading && !isPageDetail) {
      return renderSpinner()
    }

    return (
      <div className='grid flex-col w-full md:flex-row md:grid-cols-12 md:gap-x-7'>
        <div className='w-full h-[434px] relative mb-7 md:mb-0 md:col-span-8 md:row-span-5'>
          <Link to={`/bawaslu-update/${mainArticle?.slug}`}>
            <div className='w-full h-full bg-gray-200'>
              <img
                className='w-full h-full object-cover'
                src={utils.getImageAPI(mainArticle?.path_image)}
                alt={mainArticle?.title}
              />
            </div>

            {isOverlayMainArticle && (
              <>
                <span className='absolute inset-x-0 bottom-0 h-4/5 bg-gradient1' />

                <div className='flex flex-col absolute inset-x-0 bottom-4 px-6 gap-y-1'>
                  <Text size='text-sm' color='text-white' cursor='cursor-pointer'>{momentHelper.formatDateFull(mainArticle?.created_date)}</Text>
                  <Text weight='font-bold' size='text-lg' color='text-white' cursor='cursor-pointer' lineClamp='line-clamp-2'>
                    {mainArticle?.title}
                  </Text>
                </div>
              </>
            )}
          </Link>
        </div>

        <div className='w-full h-full flex flex-col md:col-span-4 gap-y-3'>
          {isPageDetail && loading
            ? renderSpinner()
            : (
              <>
                {sideArticleList.map((data) => {
                  return (
                    <div className='w-full flex flex-row items-center gap-x-3' key={data.id}>
                      <Link to={`/bawaslu-update/${data.slug}`} className='w-full'>
                        <img
                          className='h-28 sm:h-[140px] sm:max-w-[200px] md:h-[76px] w-full md:max-w-[120px] object-cover'
                          src={utils.getImageAPI(data.path_thumbnail)}
                          alt={data.title}
                        />
                      </Link>
                      <div className='flex flex-col gap-y-1'>
                        <Text size='text-xs' color='text-grey-light-7'>{momentHelper.formatDateFull(data.created_date)}</Text>
                        <Text weight='font-bold' size='text-sm' lineClamp='line-clamp-2' href={`/bawaslu-update/${data.slug}`} underlineOnHover>
                          {data.title}
                        </Text>
                      </div>
                    </div>
                  )
                }).slice(0, 5)}
              </>
            )}
        </div>
      </div>
    )
  }

  return renderTopArticles()
}

export default TopArticles