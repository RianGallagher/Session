import spotifyStore from '../stores/spotifyStore';
import whitelist from './genreWhitelist';

export function getTop(token){
  let genres = [];
  let artists = [];
  return fetch('https://api.spotify.com/v1/me/top/artists?limit=10', {
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then(response => response.json())
  .then(res => {
    res.items.forEach((artist) => {
      // Check if there is a genre associated with the artist that's in the whitelist,
      // if not use first one in array
      let genreItem = whitelist.inWhiteList(artist.genres) || artist.genres[0];
      const capatilisedGenre = genreItem.charAt(0).toUpperCase() + genreItem.slice(1);

      // Avoid duplication of genres on screen
      if(!genres.includes(capatilisedGenre))
        genres.push(capatilisedGenre);

      artists.push(artist.name);
    })
    return {genres: genres, artists: artists}
  })
  .catch((err) => {
    console.log('error in spotify API request', err);
  })
}

export function getTopGenres(token){
  return fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then(response => response.json())
  .then(res => { return res.genres })
  .catch(err => console.log('err', err));
}
