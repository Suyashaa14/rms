import { createSlice,type PayloadAction } from '@reduxjs/toolkit'
import type { CartLine, CartState, DeliveryMethod, Modifier, Variant } from '../lib/types'
import { nanoid } from 'nanoid'

const initial: CartState = {
  lines: [],
  deliveryMethod: 'pickup',
  fees: { delivery: 5000, packaging: 1500, service: 0 },
  taxRate: 13,
  tip: 0,
}

const computeLineTotal = (base: number, variant?: Variant, mods?: Modifier[], qty = 1) => {
  const v = variant ? variant.priceDiff : 0
  const m = mods?.reduce((s, x) => s + x.priceDiff, 0) ?? 0
  return (base + v + m) * qty
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initial,
  reducers: {
    addLine: (state, action: PayloadAction<{
      itemId: string
      name: string
      image: string
      basePrice: number
      variant?: Variant
      modifiers?: Modifier[]
      qty?: number
    }>) => {
      const { itemId, name, image, basePrice, variant, modifiers, qty = 1 } = action.payload
      const id = nanoid()
      const lineTotal = computeLineTotal(basePrice, variant, modifiers, qty)
      state.lines.push({ id, itemId, name, image, basePrice, variant, modifiers, qty, lineTotal })
    },
    removeLine: (state, action: PayloadAction<string>) => {
      state.lines = state.lines.filter(l => l.id !== action.payload)
    },
    setQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const line = state.lines.find(l => l.id === action.payload.id)
      if (!line) return
      line.qty = Math.max(1, action.payload.qty)
      line.lineTotal = computeLineTotal(line.basePrice, line.variant, line.modifiers, line.qty)
    },
    setDeliveryMethod: (state, action: PayloadAction<DeliveryMethod>) => {
      state.deliveryMethod = action.payload
      // Simple fee logic for MVP
      state.fees.delivery = action.payload === 'delivery' ? 5000 : 0
    },
    setTip: (state, action: PayloadAction<number>) => {
      state.tip = Math.max(0, action.payload)
    },
    applyCoupon: (state, action: PayloadAction<{ code: string; type: 'percent' | 'fixed'; value: number }>) => {
      // store only; calculation happens in selector
      state.coupon = action.payload
    },
    clearCoupon: (state) => {
      state.coupon = undefined
    },
    clearCart: (state) => {
      state.lines = []
      state.tip = 0
      state.coupon = undefined
    }
  }
})

export const {
  addLine, removeLine, setQty, setDeliveryMethod, setTip, applyCoupon, clearCoupon, clearCart
} = cartSlice.actions

// SELECTORS
export const selectCart = (s: any) => s.cart as CartState
export const selectCartTotals = (s: any) => {
  const cart = selectCart(s)
  const subtotal = cart.lines.reduce((sum, l) => sum + l.lineTotal, 0)
  const discount = cart.coupon
    ? (cart.coupon.type === 'percent'
        ? Math.floor((subtotal * cart.coupon.value) / 100)
        : cart.coupon.value)
    : 0
  const taxedBase = Math.max(0, subtotal - discount)
  const tax = Math.floor((taxedBase * cart.taxRate) / 100)
  const fees = cart.fees.delivery + cart.fees.packaging + cart.fees.service
  const grandTotal = taxedBase + tax + fees + cart.tip
  return { subtotal, discount, tax, fees, grandTotal }
}

export default cartSlice.reducer
