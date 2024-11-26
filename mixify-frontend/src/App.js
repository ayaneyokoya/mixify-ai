import React from 'react';
import './App.css';
import SongAnalyzer from './components/SongAnalyzer';
import Background from './components/Background';
import AudioMixer from './components/AudioMixer';

function App() {
  return (
    <div className="App">
      <Background/>
      <SongAnalyzer/>
      <AudioMixer/>
    </div>
  );
}

export default App;
