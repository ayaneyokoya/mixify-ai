from flask import Flask, request, jsonify
from flask_cors import CORS
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up Spotify API client credentials
SPOTIPY_CLIENT_ID = '0947bc27d44642798de47b02a81ff62a'
SPOTIPY_CLIENT_SECRET = 'a777fd6470524496b34e6840eb8f8dad'

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=SPOTIPY_CLIENT_ID,
                                                           client_secret=SPOTIPY_CLIENT_SECRET))

@app.route('/analyze_song', methods=['POST'])
def analyze_song():
    data = request.json
    song_query = data.get('song', '')

    # Search for the song on Spotify
    search = sp.search(q='track:' + song_query, type='track')

    if not search['tracks']['items']:
        return jsonify({'error': 'Song not found'}), 404

    song_data = search['tracks']['items'][0]

    track_info = {
        'track_name': song_data['name'],
        'artist_name': song_data['artists'][0]['name'],
        'album_name': song_data['album']['name'],
        'track_image': song_data['album']['images'][0]['url'],
        'track_id': song_data['id'],
        'preview_url': song_data.get('preview_url', None)
    }

    # Get audio features
    audio_features = sp.audio_features(track_info['track_id'])[0]

    features = {
        'danceability': audio_features['danceability'],
        'energy': audio_features['energy'],
        'acousticness': audio_features['acousticness'],
        'tempo': audio_features['tempo'],
        'valence': audio_features['valence'],
        'liveness': audio_features['liveness'],
        'speechiness': audio_features['speechiness']
    }

    return jsonify({
        'track_info': track_info,
        'audio_features': features
    }), 200

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    data = request.json
    track_id = data.get('track_id')

    # Get recommendations based on the track
    recommendations = sp.recommendations(seed_tracks=[track_id], limit=10)

    recommended_tracks = []
    for track in recommendations['tracks']:
        recommended_tracks.append({
            'track_name': track['name'],
            'artist_name': track['artists'][0]['name'],
            'album_image': track['album']['images'][0]['url']
        })

    return jsonify(recommended_tracks), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)