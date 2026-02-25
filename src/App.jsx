import './App.css'
import EnvelopeReveal from './components/EnvelopeReveal'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter basename='/SaveTheDate'>
      <EnvelopeReveal />
    </BrowserRouter>
  )
}


export default App
