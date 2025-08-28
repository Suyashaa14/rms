import { createSlice,type PayloadAction } from '@reduxjs/toolkit'
import type { Category } from '../../../types/catalog'

interface CategoryUIState {
  editing: Category | null
  showForm: boolean
}
const initialState: CategoryUIState = { editing: null, showForm: false }

export const categorySlice = createSlice({
  name: 'categoryUI',
  initialState,
  reducers: {
    openCreate(state) {
      state.editing = null
      state.showForm = true
    },
    openEdit(state, action: PayloadAction<Category>) {
      state.editing = action.payload
      state.showForm = true
    },
    closeForm(state) {
      state.editing = null
      state.showForm = false
    },
  },
})

export const { openCreate, openEdit, closeForm } = categorySlice.actions
export default categorySlice.reducer
