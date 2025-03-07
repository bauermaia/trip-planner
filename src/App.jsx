import './App.css'
import { Header } from '../components/Header'
import { Searcher } from '../components/Searcher'
import { PositionProvider } from '../context/position'
import {Information} from '../components/Information'
import { Recomendations } from '../components/Recomendations'
import {Itinerary} from '../components/Itinerary'



function App() {

  return (
    <PositionProvider>
   
    <Header />
    <Itinerary />
    <Searcher />
    <Information />
    <Recomendations />
    </PositionProvider>
  )
}

export default App
