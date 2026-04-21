import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Drop the pre-React splash the moment we mount.
const splash = document.getElementById('boot-splash')
if (splash) splash.remove()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
