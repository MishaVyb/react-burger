export function saveToLocalStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn(e)
  }
  return value
}

export function loadFromLocalStorage(key: string, defaultValue: string | undefined = undefined) {
  try {
    const value = localStorage.getItem(key)
    if (value === null) return defaultValue
    return JSON.parse(value)
  } catch (e) {
    console.warn(e)
    return defaultValue
  }
}

export function removeFromLocalStorage(key: string) {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.warn(e)
  }
}
