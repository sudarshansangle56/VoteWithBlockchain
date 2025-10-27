// src/index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FpjsProvider
      loadOptions={{
        apiKey: "F7m07Mw7k10zNMuk3B1H", // Your public API key
        region: "ap" // ap = Asia Pacific (set based on your region)
      }}
    >
      <App />
    </FpjsProvider>
  </React.StrictMode>
)
