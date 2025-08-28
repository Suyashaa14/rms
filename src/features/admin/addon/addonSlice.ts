import { createSlice,type  PayloadAction } from '@reduxjs/toolkit'
import type { Addon } from '../../../types/catalog'

interface AddonUIState {
  editing: Addon | null
  showForm: boolean
}
const initialState: AddonUIState = { editing: null, showForm: false }

export const addonSlice = createSlice({
  name: 'addonUI',
  initialState,
  reducers: {
    openCreate(state) {
      state.editing = null
      state.showForm = true
    },
    openEdit(state, action: PayloadAction<Addon>) {
      state.editing = action.payload
      state.showForm = true
    },
    closeForm(state) {
      state.editing = null
      state.showForm = false
    },
  },
})

export const { openCreate, openEdit, closeForm } = addonSlice.actions
export default addonSlice.reducer
