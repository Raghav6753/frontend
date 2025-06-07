import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { BrowserRouter } from 'react-router'
createRoot(document.getElementById('root')).render(

          <StrictMode>
              <AuthContextProvider>
  <BrowserRouter>
             <App />
            </BrowserRouter>
   
              </AuthContextProvider>
          
  </StrictMode>,

)
