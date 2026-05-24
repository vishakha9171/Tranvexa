import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StoreProvider } from './context/storeContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StoreProvider>
    <App />
  </StoreProvider>
    
  </BrowserRouter>,
)
