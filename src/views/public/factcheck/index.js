import React, { useState, useEffect } from 'react'
import { Button } from 'core/components'

// Komponen untuk menampilkan artikel
const Article = ({ article }) => {
  const handleCardClick = () => {
    if (article.references) {
      window.open(article.references, '_blank', 'noopener,noreferrer') // Membuka referensi di tab baru
    }
  }
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-3 bg-white h-full" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{article.title}</h2>
      <p className="text-sm text-gray-600 mb-1"><strong>Penulis:</strong> {article.authors}</p>
      <p className="text-sm text-gray-600 mb-1"><strong>Status:</strong> {article.status}</p>
      <p className="text-sm text-gray-600 mb-1"><strong>Klasifikasi:</strong> {article.classification}</p>
      <p className="text-sm text-gray-600 mb-1"><strong>Tanggal:</strong> {article.tanggal}</p>

      {/* Potong konten yang panjang */}
      <p className="text-sm text-gray-600 mb-1 line-clamp-3">
        <strong>Konten:</strong> {article.content}
      </p>

      <p className="text-sm text-blue-500 mb-1">
        <strong>Sumber:</strong> <a href={article.source_link} className="hover:underline">{article.source_issue}</a>
      </p>

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
    try {
      const response = await fetch('https://yudistira.turnbackhoax.id/api/antihoax/search/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json'
        },
        body: new URLSearchParams({
          key: '528b20z21xcdd30b0ac2',
          method: 'content',
          value: keyword, // Kata kunci dari input pencarian
          limit: '5'
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      setArticles(data.data) // Menyimpan data artikel di state
      // setArticles(dummyData)
    } catch (error) {
      setError(error.message) // Menyimpan pesan error
    } finally {
      setLoading(false) // Mengatur status loading menjadi false
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
      {/* Buat div ini menggunakan flex agar tetap satu baris */}
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <h1 className="text-xl font-semibold text-gray-800 flex-none mr-6">Daftar Artikel</h1>

        {/* Buat elemen input dan tombol search tetap sejajar */}
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
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Tampilkan artikel jika sudah selesai memuat */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Article key={article.id} article={article} />
            ))
          ) : (
            <p>Search untuk memulai pencarian</p>
          )}
        </div>
      )}
    </div>
  )
}

export default FetchData
