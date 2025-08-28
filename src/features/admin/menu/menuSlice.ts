import { createSlice,type PayloadAction } from '@reduxjs/toolkit'
import type { MenuItem } from '../../../types/catalog'

interface MenuUIState {
  editing: MenuItem | null
  showForm: boolean
}
const initialState: MenuUIState = { editing: null, showForm: false }

export const menuSlice = createSlice({
  name: 'menuUI',
  initialState,
  reducers: {
    openCreate(state) {
      state.editing = null
      state.showForm = true
    },
    openEdit(state, action: PayloadAction<MenuItem>) {
      state.editing = action.payload
      state.showForm = true
    },
    closeForm(state) {
      state.editing = null
      state.showForm = false
    },
  },
})

export const { openCreate, openEdit, closeForm } = menuSlice.actions
export default menuSlice.reducer
