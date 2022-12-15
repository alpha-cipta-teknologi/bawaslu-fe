import React from 'react'

import { Card, Text, Button, CustomIcon } from 'core/components'

const ResetPasswordSuccessPage = () => {
  return (
    <div className='py-10 md:py-20 max-w-2xl mx-auto w-full h-screen flex justify-center items-center'>
      <Card cardClassName='w-full' paddingVertical='py-10 md:py-20'>
        <div className='flex flex-col items-center justify-center gap-y-8'>
          <CustomIcon iconName='check_circle' />

          <Text size='text-lg' align='text-center'>Kata Sandi Baru Berhasil Dibuat</Text>

          <Button.ButtonPrimary
            href='/home'
            fontSize='text-lg'
            spacing='py-3.5 px-8'
          >Kembali ke Halaman Utama</Button.ButtonPrimary>
        </div>
      </Card>
    </div>
  )
}

export default ResetPasswordSuccessPage
