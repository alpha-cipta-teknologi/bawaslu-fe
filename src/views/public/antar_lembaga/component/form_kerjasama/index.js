import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input } from 'core/components'
import { hooks, toastify } from 'utility'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { actions } from 'store'
import { images } from 'constant'
import AsyncSelect from 'react-select/async'
import { CheckIcon } from '@heroicons/react/24/outline'

const initialSelect = {
  value: '',
  label: ''
}

const FormKerjasama = ({ onBackClick }) => {
  const getDataProvinces = hooks.useCustomDispatch(actions.areas.getDataProvinces)
  const getDataRegenciesByProvince = hooks.useCustomDispatch(actions.areas.getDataRegenciesByProvince)
  const formCollaboration = hooks.useCustomDispatch(actions.antarlembaga.formCollaboration)
  const getBentukKerjasama = hooks.useCustomDispatch(actions.antarlembaga.getBentukKerjasama)
  const getOTP = hooks.useCustomDispatch(actions.auth.getOTP)
  const verificationOTP = hooks.useCustomDispatch(actions.auth.verificationOTP)
  const getPengajuanKe = hooks.useCustomDispatch(actions.params.getPengajuanKe)

  const allProvinces = useSelector(state => state.areas.allProvinces)
  const dataRegencies = useSelector(state => state.areas.dataRegencies)
  const listKerjasama = useSelector(state => state.antarlembaga).listKerjasama
  const pengajuanKe = useSelector(state => state.params.pengajuanKe)

  const [formData, setFormData] = useState({
    nama_lembaga: '',
    pic_name: '',
    pic_phone: '',
    pic_email: '',
    bentuk_kerjasama: initialSelect,
    province_id: initialSelect,
    regency_id: initialSelect,
    keterangan_attach: [],
    attachs: [],
    pengajuan_ke: '',
    otp: ''
  })

  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)
  const [isOtpDisabled, setIsOtpDisabled] = useState(false)

  const [showErrorInput, setShowErrorInput] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    getDataProvinces()
    getBentukKerjasama()
  }, [])

  useEffect(() => {
    if (+formData.province_id.value > 0) {
      const province_id = +formData.province_id.value
      getDataRegenciesByProvince(province_id)
    }
  }, [formData.province_id.value])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)  // Menandakan bahwa data sedang diambil
        const data = await getPengajuanKe()  // Memanggil API atau fungsi asinkron
        setOptions(data)  // Menyimpan data pada state
      } catch (error) {
        console.error("Error fetching data: ", error)
      } finally {
        setLoading(false)  // Menghentikan loading setelah data diterima atau error
      }
    }

    fetchData()  // Panggil fungsi fetchData
  }, [getPengajuanKe])

  const startOtpTimer = () => {
    setOtpTimer(180)
    setIsOtpDisabled(true)
    const interval = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsOtpDisabled(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleGetOTP = () => {
    if (!formData.pic_email) {
      toast.error("Please enter your email to receive OTP.")
      return
    }

    getOTP({ email: formData.pic_email }, (response) => {
      const { status, message } = response

      if (status || message === 'send otp success') {
        toast.success("OTP Sukses Dikirim. Silahkan cek email yang di daftarkan")
        startOtpTimer()
        setIsOtpSent(true)
      } else {
        toast.error(message || "Failed to send OTP")
      }
    })
  }

  const verifyOTP = () => {
    if (!formData.pic_email || !formData.otp) {
      toast.error("Harap isi email terlebih dahulu sebelum melakukan get OTP.")
      return
    }

    verificationOTP({ email: formData.pic_email, otp: formData.otp }, (response) => {
      const { status, message } = response
      if (status || message === "verify otp success") {
        toast.success("OTP successfully verified!")
        setIsOtpVerified(true)
      } else {
        toast.error(message || "OTP verification failed.")
        setIsOtpVerified(false)
      }
    })
  }

  const promiseSelect = (inputValue, keyName) => {
    return new Promise((resolve) => {
      if (keyName === 'province_id') {
        resolve(allProvinces.filter(province => province.label.toLowerCase().includes(inputValue.toLowerCase())))
      } else if (keyName === 'regency_id') {
        resolve(dataRegencies.filter(regency => regency.label.toLowerCase().includes(inputValue.toLowerCase())))
      }
    })
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isOtpVerified) {
      alert("Harap verifikasi OTP dahulu sebelum submit.")
      return
    }

    const requiredFields = ['nama_lembaga', 'pic_name', 'pic_phone', 'province_id', 'regency_id', 'bentuk_kerjasama']
    const isEmpty = requiredFields.some(field => {
      if (field === 'province_id' || field === 'regency_id' || field === 'bentuk_kerjasama') {
        return !formData[field]?.value
      }
      return !formData[field]
    })

    if (isEmpty) {
      toast.error("Harap isi semua field yang diperlukan")
      setShowErrorInput(true)
      return
    }

    const dataToSubmit = new FormData()

    // Append regular form fields
    dataToSubmit.append('nama_lembaga', formData.nama_lembaga)
    dataToSubmit.append('pic_name', formData.pic_name)
    dataToSubmit.append('pic_phone', formData.pic_phone)
    dataToSubmit.append('pic_email', formData.pic_email)
    dataToSubmit.append('otp', formData.otp)
    dataToSubmit.append('pengajuan_ke', formData.pengajuan_ke)

    // Append select fields as JSON strings
    const appendSelectField = (key) => {
      const selectData = JSON.stringify({
        value: formData[key]?.value,
        label: formData[key]?.label
      })
      dataToSubmit.append(key, selectData)
    }

    appendSelectField('bentuk_kerjasama')
    appendSelectField('province_id')
    appendSelectField('regency_id')

    // Append files and descriptions only if selectedFile is not empty
    if (selectedFile && selectedFile.length > 0) {
      const keteranganArray = selectedFile.map(file => file.name)
      selectedFile.forEach((file) => {
        dataToSubmit.append('attachs', file) // Append each file
      })
      dataToSubmit.append('keterangan_attach', JSON.stringify(keteranganArray)) // Append descriptions as JSON array
    }

    // Submit form data
    formCollaboration(dataToSubmit, (success) => {
      if (success) {
        onBackClick()
        toast.success("Data Berhasil Dikirim.")
      }
    })
  }

  const onChangeSelect = (option, keyName) => {
    setFormData(prev => ({
      ...prev,
      [keyName]: option
    }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files) // Ubah ke array untuk pemrosesan lebih lanjut
    const allowedTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

    // Filter file yang sesuai dengan tipe yang diizinkan
    const filteredFiles = files.filter(file => allowedTypes.includes(file.type))

    if (filteredFiles.length < files.length) {
      // alert("Hanya file PDF dan Excel yang diperbolehkan.")
      toast.error("Hanya file PDF dan Excel yang diperbolehkan.")
    }

    setSelectedFile(filteredFiles)
  }

  const renderInput = (inputProps) => {
    const keyName = inputProps.name || ''

    if (inputProps.type === 'async-select') {
      return (
        <AsyncSelect
          key={keyName}
          label={inputProps.label}
          value={formData[keyName]}
          onChange={value => onChangeSelect(value, keyName)}
          loadOptions={inputValue => promiseSelect(inputValue, keyName)}
          defaultOptions={keyName === 'province_id' ? allProvinces :
            keyName === 'regency_id' ? dataRegencies :
              []}
        />
      )
    }

    if (keyName === 'bentuk_kerjasama') {
      return (
        <div>
          <label htmlFor="bentuk_kerjasama" className="block text-sm font-medium text-gray-700 mb-2">{inputProps.label}</label>
          <select
            id="bentuk_kerjasama"
            name="bentuk_kerjasama"
            value={formData.bentuk_kerjasama.value}
            onChange={(e) => onChangeSelect({ value: e.target.value, label: e.target.options[e.target.selectedIndex].text }, 'bentuk_kerjasama')}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Pilih Bentuk Kerjasama</option>
            {listKerjasama?.data?.length > 0 ? (
              listKerjasama.data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama_kerjasama}
                </option>
              ))
            ) : (
              <option disabled>Data tidak tersedia</option>
            )}

          </select>
        </div>
      )
    }

    return (
      <Input
        key={keyName}
        id={keyName}
        value={formData[keyName]}
        onChange={handleChange}
        showError={showErrorInput}
        setShowError={setShowErrorInput}
        {...inputProps}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-300">
      <div className='flex justify-between items-center mb-6'>
        <h2 className="text-2xl font-bold mb-4">Formulir Pengajuan Kerjasama</h2>
        <img src={images.logo_bawaslu_3} alt="Bawaslu Logo" className="w-16" />
      </div>

      <div className="mb-4">
        <label htmlFor="nama_lembaga" className="block text-sm font-medium text-gray-700 mb-2">Nama Lembaga</label>
        {renderInput({ name: 'nama_lembaga' })}
      </div>

      <div className="mb-4">
        <label htmlFor="pic_name" className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
        {renderInput({ name: 'pic_name' })}
      </div>

      <div className="mb-4">
        <label htmlFor="pic_phone" className="block text-sm font-medium text-gray-700 mb-2">NO. Telp / Whatsapp</label>
        {renderInput({ name: 'pic_phone' })}
      </div>

      <div className="mb-4">
        <label htmlFor="pic_email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        {renderInput({ name: 'pic_email' })}
      </div>

      <div className="mb-4">
        <label htmlFor="pengajuan_ke" className="block text-sm font-medium text-gray-700 mb-2">Pengajuan Kepada</label>
        <select
          name="pengajuan_ke"
          id="pengajuan_ke"
          value={formData.pengajuan_ke}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md"
          required // Menonaktifkan select saat data sedang dimuat
        >
          <option value="">Pilih Pengajuan Kepada</option>
          {
            pengajuanKe.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))
          }
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="bentuk_kerjasama" className="block text-sm font-medium text-gray-700 mb-2">Bentuk kerjasama</label>
        {renderInput({ name: 'bentuk_kerjasama' })}
      </div>

      <div className="mb-4">
        <label htmlFor="province_id" className="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
        {renderInput({ name: 'province_id', type: 'async-select' })}
      </div>

      <div className="mb-4">
        <label htmlFor="regency_id" className="block text-sm font-medium text-gray-700 mb-2">Kabupaten</label>
        {renderInput({ name: 'regency_id', type: 'async-select' })}
      </div>

      <div className="mb-4">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
          Lampirkan Dokumen
        </label>
        <input
          type="file"
          id="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf, .xls, .xlsx, .doc, .docx, .ppt, .pptx"
        />
        <small className="text-gray-500 mt-1 block">
          Hanya file PDF, Excel (.xls, .xlsx), Word (.doc, .docx), dan PowerPoint (.ppt, .pptx) yang diperbolehkan.
        </small>
      </div>

      {/* OTP */}
      {/* OTP Section */}
      <div className="mb-4">
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
        <div className="flex space-x-2">
          <input
            type="text"
            name="otp"
            id="otp"
            value={formData.otp}
            onChange={handleChange}
            maxLength="4"
            className="w-24 border border-gray-300 p-2 text-center rounded-md"
            required
          />

          {!isOtpVerified && (
            <button onClick={handleGetOTP} disabled={isOtpDisabled} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              {isOtpDisabled ? `Resend OTP in ${Math.floor(otpTimer / 60)}:${(otpTimer % 60).toString().padStart(2, '0')}` : "Get OTP"}
            </button>
          )}

          {isOtpSent && !isOtpVerified && ( // Tampilkan tombol hanya jika OTP berhasil dikirim
            <button
              type="button"
              onClick={verifyOTP}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Verify OTP
            </button>
          )}
          {isOtpVerified && (
            <p className="text-green-500 mt-2 text-sm">Verifikasi OTP berhasil</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button.BasicButton
          spacing='py-3 px-5'
          fontSize='text-sm'
          type='submit'
        >Konfirmasi</Button.BasicButton>
        <Button.ButtonSecondary
          spacing='py-3 px-5'
          fontSize='text-sm'
          onClick={onBackClick}
        >Back</Button.ButtonSecondary>
      </div>
    </form>
  )
}

export default FormKerjasama
