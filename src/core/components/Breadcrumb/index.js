import React from 'react'
import PropTypes from 'prop-types'
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/solid'

import { styleHelper } from 'utility'

import Text from '../Text'

const Breadcrumb = ({ breadcrumbs, onClick }) => {
  const renderBreadcrumbMobile = () => {
    if (breadcrumbs && breadcrumbs.length) {
      const nextIdx = (breadcrumbs?.length || 0) - 2
      const nextBreadcrumb = nextIdx >= 0
        ? breadcrumbs[nextIdx]
        : { name: 'Home', current: !(breadcrumbs && breadcrumbs?.length) }

      return <div className='flex sm:hidden' onClick={() => onClick && onClick(nextBreadcrumb)}>
        <div className='group inline-flex space-x-3 cursor-pointer'>
          <ArrowLeftIcon
            className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-drcGreen'
            aria-hidden='true'
          />
          <Text
            type='span'
            size='text-sm'
            weight='font-medium'
            cursor='cursor-pointer'
            color='text-gray-500 hover:text-drcGreen group-hover:text-drcGreen'
          >Back to {nextBreadcrumb?.name || 'Home'}</Text>
        </div>
      </div>
    }

    return null
  }

  return (
    <div className='border-t border-gray-200 py-3'>
      <nav className='flex' aria-label='Breadcrumb'>
        {renderBreadcrumbMobile()}

        <div className='hidden sm:block'>
          <ol role='list' className='flex items-center space-x-4'>
            <li>
              <div>
                <div
                  className={styleHelper.classNames(
                    breadcrumbs && breadcrumbs?.length ? 'text-gray-400' : 'text-drcGreen',
                    'hover:text-drcGreen cursor-pointer'
                  )}
                  onClick={() => onClick && onClick({ name: 'Home', current: !(breadcrumbs && breadcrumbs?.length) })}
                >
                  <HomeIcon className='flex-shrink-0 h-5 w-5' aria-hidden='true' />
                  <span className='sr-only'>Home</span>
                </div>
              </div>
            </li>

            {breadcrumbs?.map((item) => (
              <li key={item.name}>
                <div className='flex items-center'>
                  <svg
                    className='flex-shrink-0 h-5 w-5 text-gray-300'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    aria-hidden='true'
                  >
                    <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                  </svg>

                  <div className='ml-4 cursor-pointer' onClick={() => onClick && onClick(item)}>
                    <Text
                      size='text-sm'
                      weight='font-medium'
                      color={styleHelper.classNames(
                        item.current ? 'text-drcGreen' : 'text-gray-500',
                        'hover:text-drcGreen'
                      )}
                      cursor='cursor-pointer'
                    >{item.name}</Text>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </div>
  )
}

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.array,
  onClick: PropTypes.func
}

export default Breadcrumb