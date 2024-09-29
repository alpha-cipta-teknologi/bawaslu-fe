import React, { useState } from 'react'
import axios from 'axios'
import { Button } from 'core/components'
import { format } from 'date-fns'

const ArticleThumbnail = ({ article, onClick }) => {
  const formattedDate = format(new Date(article.tanggal), 'd MMM yyyy') // Format tanggal

  return (
    <div onClick={onClick} className="border border-gray-200 rounded-lg shadow-sm p-3 bg-white h-full cursor-pointer">
      {article.picture1 && (
        <img
          src={article.picture1}
          alt="Gambar Artikel"
          className="w-full h-40 object-cover rounded-lg mb-2"
        />
      )}
      <h2 className="text-lg font-semibold text-gray-800">{article.title}</h2>
      <p className="text-sm text-gray-600 mt-2">{formattedDate}</p> {/* Tanggal yang diformat */}
    </div>
  )
}

const FullArticleView = ({ article, onBack }) => (
  <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <Button.ButtonSecondary onClick={onBack} className="mb-4">Kembali</Button.ButtonSecondary>
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{article.title}</h2>
    <p className="text-sm text-gray-600 mb-2"><strong>Penulis:</strong> {article.authors}</p>
    <p className="text-sm text-gray-600 mb-2"><strong>Status:</strong> {article.status}</p>
    <p className="text-sm text-gray-600 mb-2"><strong>Klasifikasi:</strong> {article.classification}</p>
    <p className="text-sm text-gray-600 mb-2"><strong>Tanggal:</strong> {article.tanggal}</p>
    <p className="text-sm text-gray-600 mb-2"><strong>Konten:</strong> {article.content}</p>
    <p className="text-sm text-blue-500 mb-2"><strong>Sumber:</strong> <a href={article.source_link} className="hover:underline">{article.source_issue}</a></p>
    {article.picture1 && (
      <img
        src={article.picture1}
        alt="Gambar Artikel"
        className="w-full h-60 object-cover mt-4 rounded-lg"
      />
    )}
    {article.picture2 && (
      <img
        src={article.picture2}
        alt="Gambar Artikel"
        className="w-full h-60 object-cover mt-4 rounded-lg"
      />
    )}
    <p className="text-sm text-gray-600 mt-4"><strong>Kesimpulan:</strong> {article.conclusion}</p>
    <p className="text-sm text-blue-500 mt-2">
      <strong>Referensi:</strong> <a href={article.references} target="_blank" rel="noopener noreferrer" className="hover:underline">Baca selengkapnya</a>
    </p>
  </div>
)

const FetchData = () => {
  const [articles, setArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [noArticlesMessage, setNoArticlesMessage] = useState("")
  const [selectedArticle, setSelectedArticle] = useState(null) // New state to handle selected article

  const fetchData = async (keyword) => {
    setLoading(true)
    setError(null)
    setNoArticlesMessage("")
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/fe/antihoax/search`, {
        params: {
          limit: 10,
          keyword
        }
      })

      console.log(response.data)
      setArticles(response.data.data.values)

      if (response.data.data.total === 0) {
        setNoArticlesMessage("Oops! Tidak ada artikel ditemukan. Cobalah menggunakan kata kunci yang berbeda.")
      }
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchData(searchTerm)
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cek Kebenaran Informasi: Fakta atau Hoax?</h3>
      {!selectedArticle ? (
        <>
          <div className="flex justify-between items-center mb-8 flex-wrap">
            {/* <div className="w-full md:w-auto mb-4 md:mb-0">
              <h1 className="text-xl font-bold text-gray-800">Daftar Artikel</h1>
            </div> */}
            <div className="flex flex-grow space-x-3">
              <input
                type="text"
                placeholder="Cari artikel..."
                className="border border-gray-300 rounded-md p-3 w-full text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button.ButtonPrimary fontSize="text-base" spacing="py-3 px-5" onClick={handleSearch}>
                Search
              </Button.ButtonPrimary>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center h-full mt-12">
              <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
              <p className="text-lg text-gray-700 text-center">Memuat data, harap tunggu...</p>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center col-span-full">
              <div className="text-center bg-red-100 p-8 rounded-lg border border-red-300 shadow-md">
                <h2 className="text-xl font-semibold text-red-600 mb-4">Error!</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button.ButtonPrimary onClick={() => setError(null)} spacing="py-3 px-5" className="mt-4">
                  Coba Lagi
                </Button.ButtonPrimary>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <ArticleThumbnail key={article.id} article={article} onClick={() => setSelectedArticle(article)} />
                ))
              ) : (
                <div className="flex items-center justify-center col-span-full">
                  <div className="text-center bg-gray-100 p-8 rounded-lg border border-gray-300 shadow-md">
                    {noArticlesMessage ? (
                      <>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Tidak ada artikel ditemukan.</h2>
                        <p className="text-gray-600 mb-4">
                          Cobalah untuk menggunakan kata kunci yang berbeda atau periksa kembali ejaan Anda.
                        </p>
                        <Button.ButtonPrimary onClick={() => setSearchTerm("")} spacing="py-3 px-5" className="mt-4">
                          Coba Lagi
                        </Button.ButtonPrimary>
                      </>
                    ) : (
                      <p className="text-gray-600">
                        Silakan lakukan pencarian untuk melihat artikel yang relevan.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <FullArticleView article={selectedArticle} onBack={() => setSelectedArticle(null)} />
      )}
    </div>
  )
}

export default FetchData
