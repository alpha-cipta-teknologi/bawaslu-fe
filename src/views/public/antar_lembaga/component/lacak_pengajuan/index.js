import React, { useState } from 'react'
import { Button, Input, Skeleton } from 'core/components'
import { actions } from 'store'
import { hooks, toastify } from 'utility'

const LacakPengajuan = () => {
    const lacakPengajuan = hooks.useCustomDispatch(actions.antarlembaga.lacakPengajuan)

    const [searchQuery, setSearchQuery] = useState('')
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSearchClick = () => {
        setLoading(true)
        lacakPengajuan({ no_register: searchQuery }, (success, response) => {
            setLoading(false)
            if (success && response) {
                setResults(response.data)
            } else {
                setResults(null)
                toastify.error('Gagal mengambil data. Silakan coba lagi.')
                console.error('Failed to fetch results')
            }
        })
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Lacak Pengajuan Anda</h2>

            <div className="flex flex-grow space-x-3">
                <input
                    type="text"
                    placeholder="Masukkan nomor atau kata kunci pengajuan"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-md p-3 w-full text-base"
                />
                <Button.ButtonPrimary
                    onClick={handleSearchClick}
                    disabled={loading}
                    className="p-2 px-4 rounded-r-md"
                >
                    {loading ? 'Mencari...' : 'Cari'}
                </Button.ButtonPrimary>
            </div>

            {results && (
                <div className="results flex flex-wrap gap-8 mt-5">
                    <div className="general-info flex-1 p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Informasi Pengajuan</h3>
                        <p className="text-base font-medium text-gray-700">
                            <strong>No. Register:</strong> <span className="font-normal">{results.no_register}</span>
                        </p>
                        <p className="text-base font-medium text-gray-700">
                            <strong>Nama Lembaga:</strong> <span className="font-normal">{results.nama_lembaga}</span>
                        </p>
                        <p className="text-base font-medium text-gray-700">
                            <strong>Nama PIC:</strong> <span className="font-normal">{results.pic_name}</span>
                        </p>
                        <p className="text-base font-medium text-gray-700">
                            <strong>Email PIC:</strong> <span className="font-normal">{results.pic_email}</span>
                        </p>
                        <p className="text-base font-medium text-gray-700">
                            <strong>No. Telepon PIC:</strong> <span className="font-normal">{results.pic_phone}</span>
                        </p>
                        {results.nama_kerjasama && (
                            <p className="text-base font-medium text-gray-700">
                                <strong>Jenis Kerjasama:</strong> <span className="font-normal">{results.nama_kerjasama}</span>
                            </p>
                        )}
                        {results.perihal_audiensi && (
                            <p className="text-base font-medium text-gray-700">
                                <strong>Perihal Audiensi:</strong> <span className="font-normal">{results.perihal_audiensi}</span>
                            </p>
                        )}
                        {results.waktu_audiensi && (
                            <p className="text-base font-medium text-gray-700">
                                <strong>Waktu Audiensi:</strong> <span className="font-normal">{new Date(results.waktu_audiensi).toLocaleString()}</span>
                            </p>
                        )}
                        {results.konfirmasi_waktu_audiensi !== null && (
                            <p className="text-base font-medium text-gray-700">
                                <strong>Konfirmasi Waktu Audiensi:</strong> <span className={`font-normal ${results.konfirmasi_waktu_audiensi ? 'text-green-600' : 'text-red-600'}`}>
                                    {results.konfirmasi_waktu_audiensi ? 'Sudah dikonfirmasi' : 'Belum dikonfirmasi'}
                                </span>
                            </p>
                        )}
                        <p className="text-base font-medium text-gray-700">
                            <strong>Provinsi:</strong> <span className="font-normal">{results.province.name}</span>
                        </p>
                        <p className="text-base font-medium text-gray-700">
                            <strong>Kabupaten/Kota:</strong> <span className="font-normal">{results.regency.name}</span>
                        </p>
                        {/* <p className="text-base font-medium text-gray-700">
                            <strong>Status Pengajuan:</strong> <span className="font-normal">{results.status}</span>
                        </p> */}
                        <p className="text-base font-medium text-gray-700">
                            <strong>Tanggal Dibuat:</strong> <span className="font-normal">{new Date(results.created_date).toLocaleDateString()}</span>
                        </p>
                    </div>

                    <div className="history-status flex-1 p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Riwayat Status</h3>
                        {results.history_status.length > 0 ? (
                            results.history_status.map((history, index) => (
                                <div key={index} className="status-card mb-4 p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
                                    {/* <p className="text-base font-medium text-gray-800">
                                        <strong>Status:</strong> <span className="font-normal">{history.status}</span>
                                    </p> */}
                                    <p className="text-base font-medium text-gray-800">
                                        <strong>Keterangan:</strong> <span className="font-normal">{history.keterangan || 'Tidak ada keterangan'}</span>
                                    </p>
                                    <p className="text-base font-medium text-gray-800">
                                        <strong>Tanggal:</strong> <span className="font-normal">{new Date(history.created_date).toLocaleDateString()}</span>
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Tidak ada riwayat status</p>
                        )}
                    </div>

                    {results.attachment.length > 0 && (
                        <div className="attachments p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
                            <h3 className="text-2xl font-semibold text-primary mb-4">Lampiran</h3>
                            {results.attachment.map((attachment, index) => (
                                <p key={index} className="text-sm text-blue-600 underline hover:text-blue-800 transition-colors duration-200">
                                    <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                                        {attachment.file_name}
                                    </a>
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {!loading && results === null && (
                <p className="text-center text-gray-500 mt-4">Data tidak ditemukan. Silakan coba kata kunci lain.</p>
            )}
        </div>
    )
}

export default LacakPengajuan
