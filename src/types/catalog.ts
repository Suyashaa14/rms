// src/types/catalog.ts
export type Status = 'active' | 'inactive'

export interface Category {
  id: number
  name: string
  description: string
  image: string | number
  status: Status
}
export interface CategoryCreate {
  name: string
  description: string
  image: number
  status: Status
}

export interface Addon {
  id: number
  title: string
  description: string
  price: string | number
  status: Status
}
export interface AddonCreate {
  title: string
  description: string
  price: number
  status: Status
}

export interface MenuItem {
  id: number
  title: string
  description: string
  image: string | number
  size: string
  price: number
  category_id: number
  badge?: string
  status: Status
  addon: number[]
}
export interface MenuCreate {
  title: string
  description: string
  image: number
  size: string
  price: number
  category_id: number
  badge?: string
  status: Status
  addon: number[]
}

export interface Paginated<T> {
  items: T[]
  meta: {
    perPage: number
    currentPage: number
    from: number
    to: number
    total: number
    lastPage: number
    prevPage: number | null
    nextPage: number | null
  }
}
