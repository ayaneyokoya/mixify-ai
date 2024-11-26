import React from 'react';
import './App.css';
import SongAnalyzer from './components/SongAnalyzer';
import Background from './components/Background';

function App() {
  return (
    <div className="App">
      <Background/>
      <SongAnalyzer/>
    </div>
  );
}

export default App;
