export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn(e)
  }
  return value
}

export function loadFromLocalStorage(key, defaultValue = undefined) {
  try {
    const value = localStorage.getItem(key)
    if (value === null) return defaultValue
    return JSON.parse(value)
  } catch (e) {
    console.warn(e)
    return defaultValue
  }
}

export function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.warn(e)
  }
}
