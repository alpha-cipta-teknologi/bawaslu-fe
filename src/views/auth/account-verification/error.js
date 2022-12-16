import React from 'react'

import { Button, Card, CustomIcon, Text } from 'core/components'

const AccountVerificationErrorPage = () => {
  return (
    <div className='py-10 md:py-20 max-w-2xl mx-auto min-h-screen'>
      <Card paddingHorizontal='px-6' paddingVertical='py-6'>
        <div className='flex flex-col gap-y-5 items-center justify-center'>
          <CustomIcon iconName='empty_data' />
          <Text align='text-center'>Verifikasi akun gagal. Silakan cek kembali email Anda. Atau buat akun kembali</Text>
          <Button.ButtonPrimary href='/register'>Buat Akun</Button.ButtonPrimary>
        </div>
      </Card>
    </div>
  )
}

export default AccountVerificationErrorPage
