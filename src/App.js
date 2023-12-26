import React from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import Top from '../src/components/Top'
import Body from '../src/components/Body'

function App() {
  return (
    <div className="App">
      <Top/>
      <Body/>
    </div>
  );
}

export default App;
