import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input } from 'core/components'
import { hooks, toastify } from 'utility'
import AsyncSelect from 'react-select/async'
import { toast, ToastContainer } from 'react-toastify' // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'
import { actions } from 'store'
import { images } from 'constant'
import { getProvince, getRegency } from '../../store/action'
import { getPengajuanKe } from '../../../../../store/actions/params'


const initialSelect = {
    value: '',
    label: ''
}

const AudienciForm = ({ onBackClick }) => {
    const getDataProvinces = hooks.useCustomDispatch(actions.areas.getDataProvinces)
    const getOTP = hooks.useCustomDispatch(actions.auth.getOTP)
    const verificationOTP = hooks.useCustomDispatch(actions.auth.verificationOTP)
    const getDataRegencies = hooks.useCustomDispatch(actions.areas.getDataRegencies)
    const getDataRegenciesByProvince = hooks.useCustomDispatch(actions.areas.getDataRegenciesByProvince)
    const formAudience = hooks.useCustomDispatch(actions.antarlembaga.formAudience)
    const getPengajuanKe = hooks.useCustomDispatch(actions.params.getPengajuanKe)

    const allProvinces = useSelector(state => state.areas.allProvinces)
    const dataRegencies = useSelector(state => state.areas.dataRegencies)
    const pengajuanKe = useSelector(state => state.params.pengajuanKe)
    const [isOtpVerified, setIsOtpVerified] = useState(false)
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [options, setOptions] = useState([])

    const [selectedFile, setSelectedFile] = useState(null)

    const [formData, setFormData] = useState({
        nama_lembaga: '',
        pic_name: '',
        pic_phone: '',
        pic_email: '',
        perihal_audiensi: '',
        waktu_audiensi: '',
        konfirmasi_waktu_audiensi: '',
        province_id: initialSelect,
        regency_id: initialSelect,
        keterangan_attach: [],
        attachs: null,
        pengajuan_ke: '',
        otp: ''
    })

    const [showErrorInput, setShowErrorInput] = useState(false)
    // State for OTP button timer
    const [otpTimer, setOtpTimer] = useState(0)
    const [isOtpDisabled, setIsOtpDisabled] = useState(false)

    useEffect(() => {
        getDataProvinces()
    }, [])

    useEffect(() => {
        console.log("Regencies data:", dataRegencies) // Check if regencies data is updated
    }, [dataRegencies])

    useEffect(() => {
        // Memanggil action ketika komponen di-mount
        getPengajuanKe(responseData => {
            // Callback untuk menangani data jika diperlukan
            console.log(responseData)

        })
        console.log("TES", pengajuanKe)
    }, [getPengajuanKe])


    useEffect(() => {
        if (+formData.province_id.value > 0) {
            const province_id = +formData.province_id.value
            getDataRegenciesByProvince(province_id)
        }
    }, [formData.province_id.value])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files) // Konversi ke array untuk pemrosesan lebih lanjut
        const allowedTypes = [
            'application/pdf',
            'application/vnd.ms-excel', // .xls
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            'application/msword', // .doc
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
            'application/vnd.ms-powerpoint', // .ppt
            'application/vnd.openxmlformats-officedocument.presentationml.presentation' // .pptx
        ]

        // Filter file yang sesuai dengan tipe yang diizinkan
        const filteredFiles = files.filter(file => allowedTypes.includes(file.type))

        if (filteredFiles.length < files.length) {
            toast.error("Hanya file PDF, Excel, Word, dan PowerPoint yang diperbolehkan.")
        }

        setSelectedFile(filteredFiles) // Menyimpan hanya file yang sesuai ke state
        console.log(filteredFiles) // Debugging, memastikan hanya file yang sesuai
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!isOtpVerified) {
            alert("Please verify your OTP before submitting the form.")
            return
        }

        // Validasi form seperti sebelumnya
        const requiredFields = ['nama_lembaga', 'pic_name', 'pic_phone', 'pic_email', 'perihal_audiensi', 'waktu_audiensi', 'province_id', 'regency_id']
        const isEmpty = requiredFields.some(field => {
            if (field === 'province_id' || field === 'regency_id') {
                return !formData[field].value // Menggunakan value untuk cek
            }
            return !formData[field]
        })

        if (isEmpty) {
            alert("Please fill in all required fields")
            setShowErrorInput(true)
            return
        }

        // Membuat FormData untuk file dan data lainnya
        const formDataToSubmit = new FormData()
        formDataToSubmit.append('nama_lembaga', formData.nama_lembaga)
        formDataToSubmit.append('pic_name', formData.pic_name)
        formDataToSubmit.append('pic_phone', formData.pic_phone)
        formDataToSubmit.append('pic_email', formData.pic_email)
        formDataToSubmit.append('perihal_audiensi', formData.perihal_audiensi)
        formDataToSubmit.append('waktu_audiensi', formData.waktu_audiensi)
        formDataToSubmit.append('otp', formData.otp)
        formDataToSubmit.append('pengajuan_ke', formData.pengajuan_ke)

        // Mengirimkan province_id dan regency_id dalam format yang diinginkan
        formDataToSubmit.append('province_id', JSON.stringify({ value: formData.province_id.value, label: formData.province_id.label }))
        formDataToSubmit.append('regency_id', JSON.stringify({ value: formData.regency_id.value, label: formData.regency_id.label }))

        // Cek apakah file sudah dipilih dan hanya lakukan loop jika selectedFile ada
        if (selectedFile) {
            const keteranganArray = [] // Array untuk menampung semua keterangan

            Array.from(selectedFile).forEach((file, index) => {
                console.log(`File ${index}:`, file)
                formDataToSubmit.append('attachs', file) // Menambahkan file ke FormData
                keteranganArray.push(file.name) // Menambahkan nama file ke array keterangan
            })

            // Setelah loop, tambahkan `keterangan_attach` sebagai JSON string
            formDataToSubmit.append('keterangan_attach', JSON.stringify(keteranganArray))
        }

        // Kirim formData ke server
        formAudience(formDataToSubmit, (success) => {
            if (success) {
                onBackClick()
                toast.success("Data Berhasil Dikirim. Silahkan cek email untuk mengambil no register pelacakan")
            }
        })
    }

    const onChangeSelect = (option, keyName) => {
        setFormData(prev => ({
            ...prev,
            [keyName]: option ? { value: option.value, label: option.label } : initialSelect
        }))
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

    const startOtpTimer = () => {
        setOtpTimer(180) // Set timer for 3 minutes (180 seconds)
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

        const formOTP = { email: formData.pic_email }
        console.log("Fetching OTP for email:", formData.pic_email)

        getOTP(formOTP, (response) => {
            console.log("OTP response:", response) // Log the full response to see the structure
            const { status, message } = response

            if (status || message === 'send otp success') {
                toast.success("OTP Sukses Dikirim. Silahkan cek email yang di daftarkan")
                startOtpTimer() // Start the timer after successfully sending the OTP
                setIsOtpSent(true)
            } else {
                toast.error(message || "Failed to send OTP")  // Show error message
            }
        })
    }

    const verifyOTP = () => {
        if (!formData.pic_email || !formData.otp) {
            toast.error("Please enter your email and OTP to verify.")
            return
        }

        const otpVerificationData = {
            email: formData.pic_email,
            otp: formData.otp
        }

        verificationOTP(otpVerificationData, (response) => {
            const { status, message } = response
            if (status || message === "verify otp success") {
                toast.success("OTP successfully verified!")
                setIsOtpVerified(true) // Set status verifikasi OTP ke true
            } else {
                toast.error(message || "OTP verification failed.")
                setIsOtpVerified(false) // Reset status verifikasi jika gagal
            }
        })
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
                            []} // Use options instead of defaultOptions
                />
            )
        }

        return (
            <Input
                key={keyName}
                id={keyName}
                value={formData[keyName]}
                onChange={handleChange}
                labelClassName='flex'
                showError={showErrorInput}
                setShowError={setShowErrorInput}
                {...inputProps}
            />
        )
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-300">
            <div className='flex justify-between items-center mb-6'>
                <h2 className="text-2xl font-bold mb-4">Formulir Pengajuan Audiensi</h2>
                <div>
                    <img
                        src={images.logo_bawaslu_3}
                        alt="Bawaslu Logo"
                        className="w-16"
                    />
                </div>
            </div>

            {/* Nama Lembaga */}
            <div className="mb-4">
                <label htmlFor="nama_lembaga" className="block text-sm font-medium text-gray-700 mb-2">Nama Lembaga</label>
                <input
                    type="text"
                    name="nama_lembaga"
                    id="nama_lembaga"
                    value={formData.nama_lembaga}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                />
            </div>

            {/* Nama PIC */}
            <div className="mb-4">
                <label htmlFor="pic_name" className="block text-sm font-medium text-gray-700 mb-2">Nama PIC</label>
                <input
                    type="text"
                    name="pic_name"
                    id="pic_name"
                    value={formData.pic_name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                />
            </div>

            {/* PIC Phone */}
            <div className="mb-4">
                <label htmlFor="pic_phone" className="block text-sm font-medium text-gray-700 mb-2">NO. Telp / Whatsapp</label>
                <input
                    type="text"
                    name="pic_phone"
                    id="pic_phone"
                    value={formData.pic_phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                />
            </div>

            {/* PIC Email */}
            <div className="mb-4">
                <label htmlFor="pic_email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                    type="email"
                    name="pic_email"
                    id="pic_email"
                    value={formData.pic_email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                />
            </div>

            {/* Dropdown Provinsi */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
                {renderInput({ name: 'province_id', type: 'async-select' })}
            </div>

            {/* Dropdown Regency */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Kabupaten</label>
                {renderInput({ name: 'regency_id', type: 'async-select' })}
            </div>

            {/* Perihal Audienci */}
            <div className="mb-4">
                <label htmlFor="perihal_audiensi" className="block text-sm font-medium text-gray-700 mb-2">Perihal Audiensi</label>
                <input
                    type="text"
                    name="perihal_audiensi"
                    id="perihal_audiensi"
                    value={formData.perihal_audiensi}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                />
            </div>

            {/* Pemgajuan ke */}
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

            {/* Date and Time Input */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="waktu_audiensi">
                    Tanggal dan Waktu Audiensi
                </label>
                <input
                    type="datetime-local"
                    id="waktu_audiensi"
                    name="waktu_audiensi"
                    value={formData.waktu_audiensi}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Upload File*/}
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
                    {!isOtpVerified && ( // Only show "Get OTP" button if OTP is not verified
                        <button onClick={handleGetOTP} disabled={isOtpDisabled} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            {isOtpDisabled ? `Resend OTP in ${Math.floor(otpTimer / 60)}:${(otpTimer % 60).toString().padStart(2, '0')}` : "Get OTP"}
                        </button>
                    )}
                    {isOtpSent && !isOtpVerified && ( // Only show "Verify OTP" button if OTP is sent but not verified
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

            {/* Submit Button */}
            <div className='flex justify-center space-x-4'>
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

export default AudienciForm
