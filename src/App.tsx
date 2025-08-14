// src/App.tsx
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './app/routes'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
