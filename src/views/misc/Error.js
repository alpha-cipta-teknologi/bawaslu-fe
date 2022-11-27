import React from 'react'

import { Button, Text } from 'core/components'

const ErrorPage = () => {
  const goBackHome = () => {
    if (window) {
      window.location.replace('/home')
    }
  }

  return (
    <div className='bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8'>
      <div className='max-w-max mx-auto'>
        <main className='sm:flex'>
          <Text
            size='text-4xl sm:text-5xl'
            weight='font-extrabold'
            color='text-primary'
          >404</Text>

          <div className='sm:ml-6'>
            <div className='sm:border-l sm:border-gray-200 sm:pl-6'>
              <Text
                type='h1'
                size='text-4xl sm:text-5xl'
                weight='font-extrabold'
                color='text-gray-900'
                className='tracking-tight'
              >Page not found</Text>
              <Text color='text-gray-500' className='mt-1'>Please check the URL in the address bar and try again.</Text>
            </div>
            <div className='mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6'>
              <Button.ButtonPrimary onClick={goBackHome}>Kembali ke Beranda</Button.ButtonPrimary>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ErrorPage