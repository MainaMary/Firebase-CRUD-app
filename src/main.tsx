import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import AuthContextProvider from './context/authContext'
import CustomLoader from './components/CustomLoader'
import { Suspense } from 'react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthContextProvider>
    <Suspense fallback={<CustomLoader/>}>
    <App />
    </Suspense>
  
  </AuthContextProvider>,
)
