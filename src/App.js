import React from 'react';
// import logo from './trivia.png';
import './App.css';
import PaginaInicial from './pages/PaginaInicial';
import Header from './components/Header';

export default function App() {
  return (
    <div className="App">
      <PaginaInicial />
      <Header />
    </div>
  );
}
