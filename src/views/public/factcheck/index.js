import React, { useState } from 'react'
import axios from 'axios'
import { Button } from 'core/components'

// Komponen untuk menampilkan artikel
const Article = ({ article }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-3 bg-white h-full" style={{ cursor: 'pointer' }}>
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{article.title}</h2>
      <p className="text-sm text-gray-600 mb-1"><strong>Penulis:</strong> {article.authors}</p>
      <p className="text-sm text-gray-600 mb-1"><strong>Status:</strong> {article.status}</p>
      <p className="text-sm text-gray-600 mb-1"><strong>Klasifikasi:</strong> {article.classification}</p>
      <p className="text-sm text-gray-600 mb-1"><strong>Tanggal:</strong> {article.tanggal}</p>
      <p className="text-sm text-gray-600 mb-1 line-clamp-3"><strong>Konten:</strong> {article.content}</p>
      <p className="text-sm text-blue-500 mb-1"><strong>Sumber:</strong> <a href={article.source_link} className="hover:underline">{article.source_issue}</a></p>
      {article.picture1 && (
        <img
          src={article.picture1}
          alt="Gambar Artikel"
          className="w-full h-40 object-cover mt-2 rounded-lg"
        />
      )}
      <p className="text-sm text-gray-600 mt-2 line-clamp-2"><strong>Kesimpulan:</strong> {article.conclusion}</p>
      <p className="text-sm text-blue-500 mt-1">
        <strong>Referensi:</strong> <a href={article.references} target="_blank" rel="noopener noreferrer" className="hover:underline">Baca selengkapnya</a>
      </p>
    </div>
  )
}

// Komponen untuk mengambil dan menampilkan data
const FetchData = () => {
  const [articles, setArticles] = useState([]) // Menyimpan daftar artikel
  const [searchTerm, setSearchTerm] = useState("") // Menyimpan kata pencarian
  const [loading, setLoading] = useState(false) // Menyimpan status loading
  const [error, setError] = useState(null) // Menyimpan pesan error

  // Fungsi untuk mengambil data dari API berdasarkan kata kunci pencarian
  const fetchData = async (keyword) => {
    setLoading(true)
    setError(null) // Reset error saat memulai fetch
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/fe/antihoax/search`, {
        params: {
          limit: 10,
          keyword // Kata kunci dari input pencarian
        }
      })

      console.log(response.data) // Tambahkan log untuk memeriksa respons
      setArticles(response.data.data.values) // Perbarui untuk menggunakan 'values'
    } catch (error) {
      setError(error.message) // Menyimpan pesan error
    } finally {
      setLoading(false)
    }
  }

  // Fungsi untuk menangani pencarian ketika tombol ditekan
  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchData(searchTerm)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <h1 className="text-xl font-semibold text-gray-800 flex-none mr-6">Daftar Artikel</h1>
        <div className="flex flex-grow space-x-2">
          <input
            type="text"
            placeholder="Cari artikel..."
            className="border border-gray-300 rounded-md p-2 w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button.ButtonPrimary fontSize="text-sm" spacing="py-2 px-4" onClick={handleSearch}>
            Search
          </Button.ButtonPrimary>
        </div>
      </div>

      {/* Tampilkan status loading atau error jika ada */}
      {loading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="ml-2">Loading data, please wait...</p>
        </div>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Tampilkan artikel jika sudah selesai memuat */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Article key={article.id} article={article} />
            ))
          ) : (
            <p className="text-gray-600 text-center">Silakan lakukan pencarian untuk melihat artikel yang relevan.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default FetchData
