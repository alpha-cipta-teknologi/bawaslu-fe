import React from 'react'

import { styleHelper } from 'utility'

import Text from '../Text'

const Tabs = ({
  tabs,
  selectedTab,
  setSelectedTab,
  onClick,
  wrapperClassName,
  spacingText = 'pb-3 px-1',
  fontWeight = 'font-bold',
  keyName = 'name',
  itemClassName,
  textColor
}) => {
  const onClickTab = tab => {
    if (setSelectedTab) setSelectedTab(tab[keyName])

    if (onClick) onClick(tab)
  }

  return (
    <div className='pb-0'>
      <div className='block'>
        <nav className={styleHelper.classNames('-mb-px flex justify-start border-b border-gray-200', wrapperClassName)}>
          {tabs.map(tab => (
            <div
              key={tab[keyName]}
              className={styleHelper.classNames(
                selectedTab === tab[keyName]
                  ? 'border-primary'
                  : 'border-transparent hover:border-gray-200',
                'border-b-4 flex items-center justify-center cursor-pointer',
                itemClassName
              )}
              onClick={() => onClickTab(tab)}
            >
              <Text
                weight={fontWeight}
                align='text-center'
                color={selectedTab === tab[keyName] ? 'text-primary' : textColor}
                spacing={spacingText}
                whiteSpace='whitespace-nowrap'
                cursor='cursor-pointer'
                aria-current={selectedTab === tab[keyName] ? 'page' : undefined}
              >
                {tab.name}
              </Text>

              {tab.count && tab.count > 0
                ? (
                  <div className='relative w-5 h-5 flex items-center justify-center bg-grey-light-2 rounded-full mb-2 ml-1.5 cursor-pointer'>
                    <Text
                      size='text-xs'
                      color='text-grey-base'
                      weight='font-extrabold'
                      cursor='cursor-pointer'
                    >{tab.count}</Text>
                  </div>
                )
                : null}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Tabs
