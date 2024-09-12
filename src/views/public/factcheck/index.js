// Import React and useState if needed
import React, { useState } from 'react'

// Your functional component
const FetchData = () => {
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const response = await fetch('https://yudistira.turnbackhoax.id/api/antihoax/search/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'text/html'
        },
        body: new URLSearchParams({
          key: '528b20z21xcdd30b0ac2',
          method: 'content',
          value: 'jokowi',
          limit: '5',
          total: '1'
        }).toString()
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      setResponseData(data)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {error && <p>Error: {error}</p>}
      {responseData && (
        <div>
        <h3>Response Data:</h3>
        <div dangerouslySetInnerHTML={{ __html: responseData }} />
      </div>
      )}
    </div>
  )
}

export default FetchData
