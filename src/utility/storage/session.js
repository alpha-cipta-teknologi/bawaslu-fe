export const setItem = (key, value) => {
  return sessionStorage.setItem(`${ key }`, JSON.stringify(value))
}

export const getItem = (key) => {
  const jsonValue = sessionStorage.getItem(`${ key }`)

  return jsonValue !== null ? JSON.parse(jsonValue) : null
}

export const clearItem = (key) => {
  return sessionStorage.removeItem(`${ key }`)
}

export const clearStorage = () => {
  return sessionStorage.clear()
}