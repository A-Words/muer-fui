import '@fontsource-variable/source-sans-3/index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

await document.body.requestFullscreen({
  'navigationUI': 'hide'
})