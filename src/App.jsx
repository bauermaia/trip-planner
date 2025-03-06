import './App.css'
import { Header } from '../components/Header'
import { Searcher } from '../components/Searcher'
import { PositionProvider } from '../context/position'
import {Information} from '../components/Information'

function App() {

  return (
    <PositionProvider>
    <Header />
    <Searcher />
    <Information />
    </PositionProvider>
  )
}

export default App
