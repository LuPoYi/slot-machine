import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import Pick from './Pick'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact>
          <Header />
          <Content />
          <Footer />
        </Route>

        <Route path="/pick/:gameDoc/:token">
          <Pick />
        </Route>
      </div>
    </Router>
  )
}

export default App
