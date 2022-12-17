import React from 'react'

import { Card, Text, Button, CustomIcon } from 'core/components'

const ForgotPasswordSuccessPage = () => {
  return (
    <div className='py-10 md:py-20 max-w-2xl mx-auto w-full h-screen flex justify-center items-center'>
      <Card cardClassName='w-full' paddingHorizontal='px-6' paddingVertical='py-8'>
        <div className='flex flex-col items-center justify-center gap-y-8'>
          <CustomIcon iconName='email_sent' />

          <Text size='text-lg' align='text-center' weight='font-semibold'>Link Reset Password Terkirim!</Text>

          <Text align='text-center'>Kami sudah mengirimkan link untuk mengubah password Anda. Cek di kotak masuk email Anda.</Text>

          <Button.ButtonPrimary
            href='/home'
            spacing='py-3.5 px-8'
          >Kembali ke Halaman Utama</Button.ButtonPrimary>
        </div>
      </Card>
    </div>
  )
}

export default ForgotPasswordSuccessPage
