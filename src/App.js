import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import { Game, Welcome, Wheel, SlotMachine, QrcodeList } from './pages/Game'
import Footer from './components/Footer'

import Pick from './pages/Pick'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Route path="/" exact>
          <Welcome count={6} />
        </Route>

        <Route path="/game/:gameDoc">
          <Game />
        </Route>

        <Footer />

        <Route path="/pick/:gameDoc/:cardDoc">
          <Pick />
        </Route>
        <Route path="/game/wheel">
          <Wheel />
        </Route>
        <Route path="/game/slotMachine">
          <SlotMachine />
        </Route>
      </div>
    </Router>
  )
}

export default App
