import { images } from 'constant'
import CollaborationForm from './form_kerjasama'
import AudiensiForm from './form_audiensi' // Import AudiensiForm component
import LacakPengajuan from './lacak_pengajuan' // Import AudiensiForm component
import DataMou from './history_mou' // Import AudiensiForm component
import React, { useState, useEffect } from 'react'
import { Button, Text, Skeleton, VideoPlayer, Modal, ModalLoader, TextHTML } from 'core/components'

const LembagaPage = () => {
    const [activeForm, setActiveForm] = useState(null) // Track which form is active

    useEffect(() => {
        // Check local storage on mount and set the active form
        const savedForm = localStorage.getItem('activeForm')
        if (savedForm) {
            setActiveForm(savedForm)
        }
    }, [])

    // Update local storage and state when showing a form
    const showForm = (formName) => {
        setActiveForm(formName)
        localStorage.setItem('activeForm', formName)
    }

    const handleBackClick = () => {
        setActiveForm(null)
        localStorage.removeItem('activeForm')
    }

    return (
        <div className="min-h-screen p-4">
            {activeForm === 'CollaborationForm' ? (
                <CollaborationForm onBackClick={handleBackClick} />
            ) : activeForm === 'AudiensiForm' ? (
                <AudiensiForm onBackClick={handleBackClick} />
            ) : activeForm === 'LacakPengajuan' ? (
                <LacakPengajuan onBackClick={handleBackClick} />
            ) : activeForm === 'DataMou' ? (
                <DataMou onBackClick={handleBackClick} />
            ) : (
                // Show the rest of the content when `showForm` and `showAudiensiForm` are false
                <>
                    <header className="mb-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold">Layanan Pengajuan</h1>
                            <p className="text-lg text-gray-600">
                                Berikut adalah layanan pengajuan kerjasama dan audiensi kepada Bawaslu
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <Button.ButtonPrimary
                                spacing="py-3 px-5"
                                fontSize="text-sm"
                                onClick={() => showForm('LacakPengajuan')}
                            >
                                Lacak Pengajuan
                            </Button.ButtonPrimary>
                            <Button.ButtonPrimary
                                spacing="py-3 px-5"
                                fontSize="text-sm"
                                onClick={() => showForm('DataMou')}
                            >
                                Doc MOU
                            </Button.ButtonPrimary>
                        </div>
                    </header>

                    <div className="flex justify-center space-x-4">
                        {/* Layanan Pengajuan Kerjasama */}
                        <div className="bg-white mr-6 shadow-md rounded-lg p-6 max-w-4xl w-full border border-gray-300">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold">Layanan</h1>
                                    <p className="text-lg">Pengajuan Kerjasama</p>
                                </div>
                                <div>
                                    <img
                                        src={images.logo_bawaslu_3}
                                        alt="Bawaslu Logo"
                                        className="w-16"
                                    />
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold mb-4">
                                Persyaratan Kerjasama Lembaga Eksternal Kepada Bawaslu
                            </h2>
                            <ol className="list-decimal list-inside mb-6 space-y-2">
                                <li>
                                    Merupakan sebuah institusi, lembaga atau kementerian, lembaga negara
                                    non kementerian (LPNK), BUMN, instansi swasta, organisasi
                                    kemasyarakatan (ORMAS), lembaga swadaya masyarakat, organisasi
                                    kemasyarakatan pemuda (OKP), institusi pegiat pemilu, institusi
                                    perguruan tinggi negeri maupun swasta;
                                </li>
                                <li>Mengutamakan kepentingan yang sama (shared interest);</li>
                                <li>
                                    Mengirimkan surat permohonan kerjasama ditujukan kepada Ketua
                                    Bawaslu RI dengan alamat: Jl. M.H. Thamrin No. 14 Jakarta (surat
                                    digital diunggah pada sistem Si Jari Hubal Bawaslu);
                                </li>
                                <li>
                                    Surat permohonan kerjasama wajib melampirkan draft kerjasama dalam
                                    bentuk nota kesepahaman atau bentuk lainnya (legal drafting);
                                </li>
                                <li>
                                    Mengisi formulir pengajuan kerjasama pada laman Si Jari Hubal fitur
                                    layanan - Pengajuan Kerjasama
                                </li>
                            </ol>
                            <Button.ButtonPrimary
                                spacing='py-3 px-5'
                                fontSize='text-sm'
                                onClick={() => showForm('CollaborationForm')}
                            >Isi Formulir Kerjasama</Button.ButtonPrimary>
                        </div>

                        {/* Layanan Pengajuan Audiensi */}
                        <div className="bg-white mr-6 shadow-md rounded-lg p-6 max-w-4xl w-full border border-gray-300">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold">Layanan</h1>
                                    <p className="text-lg">Pengajuan Audiensi</p>
                                </div>
                                <div>
                                    <img
                                        src={images.logo_bawaslu_3}
                                        alt="Bawaslu Logo"
                                        className="w-16"
                                    />
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold mb-4">
                                Persyaratan Pengajuan Audiensi Kepada Bawaslu
                            </h2>
                            <ol className="list-decimal list-inside mb-6 space-y-2">
                                <li>
                                    Audiensi dapat diajukan oleh lembaga, organisasi, atau perseorangan
                                    yang memiliki kepentingan terkait pengawasan pemilu;
                                </li>
                                <li>
                                    Surat permohonan audiensi ditujukan kepada Ketua Bawaslu RI dengan
                                    alamat: Jl. M.H. Thamrin No. 14 Jakarta (surat digital diunggah pada
                                    sistem Si Jari Hubal Bawaslu);
                                </li>
                                <li>
                                    Surat permohonan wajib melampirkan tujuan audiensi dan daftar nama
                                    peserta yang akan hadir;
                                </li>
                                <li>
                                    Mengisi formulir pengajuan audiensi pada laman Si Jari Hubal fitur
                                    layanan - Pengajuan Audiensi;
                                </li>
                                <li>
                                    Mengutamakan kepentingan yang relevan dengan pengawasan atau edukasi
                                    terkait proses pemilu.
                                </li>
                            </ol>
                            <Button.ButtonPrimary
                                spacing='py-3 px-5'
                                fontSize='text-sm'
                                onClick={() => showForm('AudiensiForm')}
                            >Isi Formulir Audiensi</Button.ButtonPrimary>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default LembagaPage
