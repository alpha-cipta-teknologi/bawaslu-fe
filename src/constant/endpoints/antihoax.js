// endpoints/antihoax.js
export default {
    getLatestAntihoax: () => ({
        path: `${process.env.REACT_APP_NEW_API_BASE_URL}/antihoax/latest/5/${process.env.REACT_APP_API_KEY}`,
        method: 'GET'
    })
}
