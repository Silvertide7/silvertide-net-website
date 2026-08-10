import { useState, useEffect } from 'react'
import type { ContentType, MortalBoonsFormValues } from './fieldConfig'
import { deriveFileName } from './output'

export type SavedItem = {
  key: string
  content_type: ContentType
  values: MortalBoonsFormValues
  savedAt: number
}

const STORAGE_KEY = 'mortal-boons-saved-items'

export const itemKey = (namespace: string, contentType: ContentType, displayName: string) =>
  `${namespace.trim()}/${contentType}/${deriveFileName(displayName)}`

const readFromStorage = (): SavedItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as SavedItem[]
  } catch {
    return []
  }
}

export const useSavedItems = () => {
  const [items, setItems] = useState<SavedItem[]>(readFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const save = (values: MortalBoonsFormValues) => {
    const key = itemKey(values.namespace, values.content_type, values.display_name)
    setItems((prev) => {
      const without = prev.filter((i) => i.key !== key)
      return [
        ...without,
        { key, content_type: values.content_type, values, savedAt: Date.now() },
      ].sort((a, b) => a.key.localeCompare(b.key))
    })
  }

  const remove = (key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key))
  }

  const find = (key: string): SavedItem | undefined => items.find((i) => i.key === key)

  return { items, save, remove, find }
}
