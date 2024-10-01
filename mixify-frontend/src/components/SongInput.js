import axios from 'axios';
import React, { useState } from 'react';

const SongInput = () => {
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      // Send the Spotify URL to the Flask API
      const response = await axios.post('http://localhost:5000/analyze_song', { spotify_url: spotifyUrl });
      setAnalysisResult(response.data);
    } catch (err) {
      setError('Error analyzing song. Please check the URL and try again.');
    }
  };

  return (
    <div>
        <h1>Mixify.AI - Song Analysis</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={spotifyUrl}
          onChange={(e) => setSpotifyUrl(e.target.value)}
          placeholder="Enter Spotify URL"
        />
        <button type="submit">Analyze</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {analysisResult && (
        <div>
          <div>
          <h2>Analysis Result</h2>
          <p><strong>Song Name:</strong> {analysisResult.song_name}</p>
          <p><strong>Tempo (BPM):</strong> {analysisResult.tempo}</p>
          <p><strong>Key:</strong> {analysisResult.key}</p>
        </div>
        </div>
      )}
    </div>
  );
};

export default SongInput;