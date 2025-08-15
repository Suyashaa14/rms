// Shared domain types for easy backend swap later

export type ID = string

export interface Category {
  id: ID
  name: string
  slug: string
  icon?: string
  active: boolean
  sort?: number
}

export interface Variant {
  id: ID
  name: string // e.g., Small, Medium, Large
  priceDiff: number // minor units (+/-)
}

export interface Modifier {
  id: ID
  name: string
  priceDiff: number // minor units
}

export interface ModifierGroup {
  id: ID
  name: string // e.g., "Extras"
  min: number
  max: number
  required?: boolean
  options: Modifier[]
}

export interface Item {
  id: ID
  categoryId: ID
  name: string
  slug: string
  desc: string
  image: string
  basePrice: number // minor units (e.g., paisa)
  rating?: number
  tags?: string[]
  variants?: Variant[] // optional
  modifierGroups?: ModifierGroup[] // optional
  active: boolean
  taxClass?: 'standard' | 'zero'
}

export type DeliveryMethod = 'pickup' | 'delivery'

export interface CartLine {
  id: ID
  itemId: ID
  name: string
  image: string
  basePrice: number
  variant?: Variant
  modifiers?: Modifier[]
  qty: number
  lineTotal: number // computed minor units
}

export interface Coupon {
  code: string
  type: 'percent' | 'fixed'
  value: number // if percent => 15 means 15%
}

export interface CartState {
  lines: CartLine[]
  deliveryMethod: DeliveryMethod
  fees: {
    delivery: number
    packaging: number
    service: number
  }
  taxRate: number // e.g., 13 for 13%
  coupon?: Coupon
  tip: number
  address?: {
    line1: string
    city: string
    note?: string
  }
}
