import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Game from './pages/Game'
import Footer from './components/Footer'
import Wheel from './pages/Game/Wheel'
import Pick from './pages/Pick'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact>
          <Header />
          <Game count={6} />
          <Footer />
        </Route>

        <Route path="/pick/:gameDoc/:cardDoc">
          <Pick />
        </Route>
        <Route path="/game">
          <Wheel />
        </Route>
      </div>
    </Router>
  )
}

export default App
