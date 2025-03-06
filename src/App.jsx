import './App.css'
import { Header } from '../components/Header'
import { Searcher } from '../components/Searcher'
import { PositionProvider } from '../context/position'
import {Information} from '../components/Information'
import { Recomendations } from '../components/Recomendations'

function App() {

  return (
    <PositionProvider>
    <Header />
    <Searcher />
    <Information />
    <Recomendations />
    </PositionProvider>
  )
}

export default App
