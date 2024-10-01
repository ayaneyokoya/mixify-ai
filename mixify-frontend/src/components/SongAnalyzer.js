import React, { useState } from 'react';
import axios from 'axios';

const SongAnalyzer = () => {
  const [songQuery, setSongQuery] = useState('');
  const [songData, setSongData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  const analyzeSong = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/analyze_song', {
        song: songQuery
      });
      setSongData(response.data);
      setError('');
    } catch (err) {
      setError('Song not found');
      setSongData(null);
    }
  };

  const fetchRecommendations = async () => {
    if (songData) {
      const response = await axios.post('http://localhost:5001/recommendations', {
        track_id: songData.track_info.track_id
      });
      setRecommendations(response.data);
    }
  };

  return (
    <div>
        <h2>Mixify.AI</h2>
      <form onSubmit={analyzeSong}>
        <input 
          type="text"
          value={songQuery}
          onChange={(e) => setSongQuery(e.target.value)}
          placeholder="Enter song title"
        />
        <button type="submit">Analyze</button>
      </form>

      {error && <p>{error}</p>}

      {songData && (
        <div>
          <h2>{songData.track_info.track_name} by {songData.track_info.artist_name}</h2>
          <img src={songData.track_info.track_image} alt="Album cover" />
          <h3>Audio Features:</h3>
          <ul>
            <li>Danceability: {songData.audio_features.danceability}</li>
            <li>Energy: {songData.audio_features.energy}</li>
            <li>Tempo: {songData.audio_features.tempo} BPM</li>
            {/* Add other features here */}
          </ul>
          <button onClick={fetchRecommendations}>Get Recommendations</button>
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <h3>Recommended Tracks:</h3>
          <ul>
            {recommendations.map((track, index) => (
              <li key={index}>
                <img src={track.album_image} alt="Album cover" />
                {track.track_name} by {track.artist_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SongAnalyzer;
