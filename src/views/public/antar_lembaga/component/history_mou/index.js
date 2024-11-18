import React, { useEffect, useState } from 'react'
import { actions } from 'store'
import { Button, Input, Skeleton } from 'core/components'
import { hooks, toastify } from 'utility'
import { getProvince, getRegency } from '../../store/action'
import AsyncSelect from 'react-select/async'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'

const DataMou = ({ onBackClick }) => {
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedRegency, setSelectedRegency] = useState('')
    const [provinces, setDataProvince] = useState([])
    const [regencies, setRegencies] = useState([])
    const [results, setResults] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const getDocMou = hooks.useCustomDispatch(actions.antarlembaga.getDocMou)
    const getDataProvinces = hooks.useCustomDispatch(actions.areas.getDataProvinces)
    const getDataRegenciesByProvince = hooks.useCustomDispatch(actions.areas.getDataRegenciesByProvince)

    const handleSearch = (page = 1) => {
        const queryParams = {
            q: searchTerm,
            area_province_id: selectedProvince,
            area_regencies_id: selectedRegency,
            date: selectedDate,
            page,
            perPage: 10
        }

        getDocMou(queryParams, (values, total) => {
            if (values) {
                setResults(values || [])
                const pages = Math.ceil(total / queryParams.perPage)
                setTotalPages(pages)
            } else {
                setResults([])
                setTotalPages(1)
            }
        })
    }

    useEffect(() => {
        dispatch(getProvince((d) => {
            if (d.status) {
                const provinces = d.data.map(r => ({
                    label: r.name,
                    value: r.id
                }))
                setDataProvince(provinces)
            }
        }))

        handleSearch()
    }, [dispatch])

    const loadProvinces = (inputValue) => {
        return new Promise((resolve) => {
            const filteredProvinces = provinces.filter((province) => province.label.toLowerCase().includes(inputValue.toLowerCase()))
            resolve(filteredProvinces)
        })
    }

    const loadRegencies = (inputValue) => {
        return new Promise((resolve) => {
            if (selectedProvince) {
                dispatch(getRegency(selectedProvince.value, (d) => {
                    if (d.status) {
                        const regencies = d.data.map(r => ({
                            label: r.name,
                            value: r.id
                        }))
                        setRegencies(regencies)
                        const filteredRegencies = regencies.filter((regency) => regency.label.toLowerCase().includes(inputValue.toLowerCase()))
                        resolve(filteredRegencies)
                    }
                }))
            } else {
                resolve([])
            }
        })
    }

    const handleProvinceChange = (data) => {
        setSelectedProvince(data ? data.value : '')
        setRegencies([])

        dispatch(getRegency(data.value, (d) => {
            if (d.status) {
                const regencies = d.data.map(r => ({
                    label: r.name,
                    value: r.id
                }))
                setRegencies(regencies)
            }
        }))
    }

    // useEffect(() => {
    //     handleSearch()
    // }, [searchTerm, selectedProvince, selectedRegency, selectedDate])

    const handlePageChange = (selectedItem) => {
        const newPage = selectedItem.selected + 1
        setCurrentPage(newPage)
        handleSearch(newPage)
    }

    const downloadDocMou = (docMou) => {
        if (docMou) {
            const fullUrl = `${process.env.REACT_APP_BASE_URL}${docMou}`
            window.open(fullUrl, "_blank")
        } else {
            alert("Dokumen tidak tersedia.")
        }
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <Button.ButtonSecondary onClick={onBackClick} className="mb-4">Kembali</Button.ButtonSecondary>
            <h1 className="text-3xl font-semibold mb-8 text-center">Dokumen MOU</h1>

            <div className="flex flex-row w-full max-w-6xl space-x-8">
                {/* Results Section */}
                <div className="flex-grow bg-white p-4 rounded-lg shadow-md min-h-[200px]">
                    {
                        results.map((result, index) => {
                            const hasMasaBerlaku = result.masa_berlaku && result.masa_berlaku.trim() !== ''
                            const isValid = hasMasaBerlaku ? new Date(result.masa_berlaku) >= new Date() : null

                            return (
                                <div
                                    key={index}
                                    className={`mb-6 ${index < results.length - 1 ? ' pb-4' : ''}`}
                                >
                                    <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 text-lg font-semibold">
                                        {result.title}
                                    </a>
                                    <p className="text-green-600 text-sm">{result.nama_lembaga}</p>
                                    <p className="text-gray-700 text-sm">{result.description}</p>
                                    <p className="text-gray-500 text-xs mt-1">{result.masa_berlaku}</p>

                                    {/* Tambahkan status Berlaku atau Tidak Berlaku jika masa_berlaku tidak kosong */}
                                    {hasMasaBerlaku ? (
                                        <p className={`mt-2 ${isValid ? 'text-gray-400' : 'text-red-500'}`}>
                                            {isValid ? 'Berlaku' : 'Tidak Berlaku'}
                                        </p>
                                    ) : (
                                        <p className="text-gray-400 mt-2">Masa berlaku tidak tersedia</p>
                                    )}

                                    {result.doc_mou ? (
                                        <Button.BasicButton onClick={() => downloadDocMou(result.doc_mou)} className="mt-4">Download MOU</Button.BasicButton>
                                    ) : (
                                        <p className="text-red-500 mt-2">-</p>
                                    )}
                                </div>
                            )
                        })
                    }

                    {/* Pagination Controls using ReactPaginate */}
                    <ReactPaginate
                        pageCount={totalPages}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageChange}
                        containerClassName="flex justify-center items-center space-x-2 mt-4"
                        activeClassName="bg-blue-500 text-white px-4 py-2 rounded"
                        disabledClassName="bg-gray-300 text-gray-500 cursor-not-allowed"
                        breakClassName="text-gray-700 font-semibold px-4 py-2"
                        previousLabel={<span className="text-blue-500 font-bold">Previous</span>}
                        nextLabel={<span className="text-blue-500 font-bold">Next</span>}
                        pageClassName="text-gray-700 font-semibold px-4 py-2 rounded hover:bg-blue-100 cursor-pointer"
                        previousClassName="text-gray-700 font-semibold px-4 py-2 rounded hover:bg-blue-100 cursor-pointer"
                        nextClassName="text-gray-700 font-semibold px-4 py-2 rounded hover:bg-blue-100 cursor-pointer"
                        breakLabel="..."
                    />
                </div>

                {/* Filter Section */}
                <div className="w-full max-w-[360px] bg-white p-4 rounded-lg shadow-md space-y-8 h-[500px]">
                    {/* Search Filters */}
                    <div className="space-y-1">
                        <label htmlFor="search" className="text-gray-700 font-semibold">Cari</label>
                        <input id="search" type="text" placeholder="Cari..." className="w-full p-3 border border-gray-300 rounded-lg" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>

                    {/* Province Select */}
                    <div className="space-y-1">
                        <label htmlFor="province_id">Provinsi</label>
                        <AsyncSelect cacheOptions loadOptions={loadProvinces} onChange={handleProvinceChange} defaultOptions={provinces} />
                    </div>

                    {/* Regency Select */}
                    <div className="space-y-1">
                        <label htmlFor="regency">Kabupaten</label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={loadRegencies}
                            onChange={(data) => setSelectedRegency(data ? data.value : '')}
                            defaultOptions={regencies}
                            isDisabled={!selectedProvince} // Disable if no province is selected
                            placeholder="Pilih Kabupaten"
                        />
                    </div>

                    {/* Date Input */}
                    <div className="space-y-1">
                        <label htmlFor="date">Tanggal</label>
                        <Input id="date" type="date" className="w-full p-3 border border-gray-300 rounded-lg" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                    </div>

                    <Button.ButtonPrimary onClick={() => handleSearch(currentPage)} className="w-full mt-4">Cari</Button.ButtonPrimary>
                </div>
            </div>
        </div>
    )
}

export default DataMou
