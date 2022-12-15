import React, { useCallback, useEffect, useState } from 'react'

import { CustomIcon, OtpInput, Spinner, Text } from 'core/components'

import { CardPassword } from '../components'
import { hooks, utils } from 'utility'

const OtpPage = () => {
  const query = hooks.useQuery()

  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(0)
  const [showResendOtp, setShowResendOtp] = useState(false)

  useEffect(() => {
    if (timer === 0) {
      utils.setCountdownTimer(
        60000,
        (timeLeft) => setTimer(timeLeft),
        () => setShowResendOtp(true)
      )
    }
  }, [])

  const onClickResendOtp = () => {
    if (timer === 0) {
      setShowResendOtp(false)
      utils.setCountdownTimer(60000, (timeLeft) => setTimer(timeLeft))

      // dispatch resend otp
    }
  }

  const onChangeOtp = useCallback((value) => setOtp(value), [])

  return (
    <CardPassword title='Verifikasi OTP' alignTitle='text-center'>
      <Text
        type='span'
        weight='font-medium'
        align='text-center'
      >Masukkan OTP yang dikirim ke <Text type='span' weight='font-semibold'>{query?.get('send')}</Text>
      </Text>

      {/* loading ketika verifikasi otp */}
      {/* <div className='h-15 sm:h-[70px] flex items-center justify-center'>
        <Spinner color='text-secondary' />
      </div> */}
      <OtpInput
        value={otp}
        valueLength={4}
        onChange={onChangeOtp}
      />

      {timer > 0 && !showResendOtp
        ? <Text weight='font-medium' align='text-center'>Tunggu {timer} detik untuk mengirim ulang kode</Text>
        : (
          <div className='flex items-center justify-center gap-2 cursor-pointer' onClick={onClickResendOtp}>
            <CustomIcon iconName='swap' className='cursor-pointer' />

            <Text
              color='text-blue-midnight'
              weight='font-semibold'
              cursor='cursor-pointer'
            >Kirim Ulang Kode</Text>
          </div>
        )}

    </CardPassword>
  )
}

export default OtpPage
