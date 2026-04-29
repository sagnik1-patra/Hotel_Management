import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { MenuProvider } from './context/MenuContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MenuProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </MenuProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
