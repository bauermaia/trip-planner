import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ItineraryProvider } from '../context/itinerary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ItineraryProvider>
    <App />
    </ItineraryProvider>
  </StrictMode>,
)
