import { useState, useEffect } from 'react'
import { storage } from '../utils/storage'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storage.get(key, initialValue)
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      storage.set(key, valueToStore)
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error)
    }
  }

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(storage.get(key, initialValue))
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, initialValue])

  return [storedValue, setValue] as const
}