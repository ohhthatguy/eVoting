import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { AuthContextProvider } from './context/auth.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
 
  <BrowserRouter>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </BrowserRouter>
 ,
)
