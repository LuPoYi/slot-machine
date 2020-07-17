import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import SlotMachine from './components/SlotMachine'
import PrizeList from './components/PrizesList'


function App() {
  return (
    <div className="App">
      <Header />
      <SlotMachine />
      <PrizeList />
      <Footer />
    </div>
  );
}

export default App;
