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
    <div className="MainHeader">
        Mixify.AI
      <form onSubmit={analyzeSong}>
        <input className="MainForm"
          type="text"
          value={songQuery}
          onChange={(e) => setSongQuery(e.target.value)}
          placeholder="Enter song title"
        />
        <button className="MainFormButton" type="submit">Analyze</button>
      </form>

      {error && <p>{error}</p>}

      {songData && (
        <div>
          <h2>{songData.track_info.track_name} by {songData.track_info.artist_name}</h2>
          <img src={songData.track_info.track_image} className="InputAlbumCover" />
          <h3>Audio Features:</h3>
          <div className="InputDetail">
            <li>Danceability: {songData.audio_features.danceability}</li>
            <li>Energy: {songData.audio_features.energy}</li>
            <li>Tempo: {songData.audio_features.tempo} BPM</li>
            {/* Add other features here */}
          </div>
          <button onClick={fetchRecommendations}>Get Recommendations</button>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="Recommendations">
          <h3>Recommended Tracks:</h3>
          <div className="Songs">
            {recommendations.map((track, index) => (
              <div className="SongName" key={index}>
                <img src={track.album_image} className="AlbumCover" />
                <div className="TrackName">{track.track_name}  by {track.artist_name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SongAnalyzer;
