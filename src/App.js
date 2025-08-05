import React from 'react';
import './App.css';
import MainSection from './components/MainSection';
import CardGrid from './components/CardGrid';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <MainSection />
      <CardGrid />
      <Footer />
    </div>
  );
}

export default App;