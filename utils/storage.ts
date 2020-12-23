export const storageUtils = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
    }
  },

  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key) || '')
    } catch (e) {
    }
  },

  remove(key) {
    localStorage.removeItem(key)
  },

  clear() {
    localStorage.clear()
  },

  clearPrefix(prefix: string) {
    for (const key in localStorage) {
      if (key.indexOf(prefix) === 0) {
        localStorage.removeItem(key)
      }
    }
  }
}
