import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'

const container = document.getElementById('root')

if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  )
} else {
  console.error('No se encontró el elemento root en index.html')
}