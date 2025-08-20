import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type Role = "admin" | "user"

export interface User {
  id: string
  name?: string
  email: string
  role: Role
}

interface AuthState {
  token: string | null
  user: User | null
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload
      if (action.payload) localStorage.setItem("token", action.payload)
      else localStorage.removeItem("token")
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload
      if (action.payload) localStorage.setItem("user", JSON.stringify(action.payload))
      else localStorage.removeItem("user")
    },
    logout(state) {
      state.token = null
      state.user = null
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
  },
})

export const { setToken, setUser, logout } = authSlice.actions
export default authSlice.reducer
