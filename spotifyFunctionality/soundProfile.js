import spotifyStore from '../stores/spotifyStore';
import whitelist from './genreWhitelist';

export function getUsersTop(token, offset, limit = '10') {
  let genres = [];
  let artists = [];
  return fetch(
    'https://api.spotify.com/v1/me/top/artists?limit=' +
      limit +
      '&offset=' +
      offset,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
  )
    .then(response => response.json())
    .then(res => {
      console.log('spotify res', res);
      res.items.forEach(artist => {
        console.log('artist genres', artist.genres);
        // Check if there is a genre associated with the artist that's in the whitelist,
        // if not use first one in array
        if (artist.genres.length > 0) {
          let genreItem =
            whitelist.inWhiteList(artist.genres) || artist.genres[0];
          const capatilisedGenre =
            genreItem.charAt(0).toUpperCase() + genreItem.slice(1);

          // Avoid duplication of genres on screen
          if (!genres.includes(capatilisedGenre)) genres.push(capatilisedGenre);

          artists.push(artist.name);
        }
        // let genreItem = whitelist.inWhiteList(artist.genres) || artist.genres[0];
        // const capatilisedGenre = genreItem.charAt(0).toUpperCase() + genreItem.slice(1);
        //
        // // Avoid duplication of genres on screen
        // if(!genres.includes(capatilisedGenre))
        //   genres.push(capatilisedGenre);
        //
        // artists.push(artist.name);
      });
      return { genres: genres, artists: artists };
    })
    .catch(err => {
      console.log('error in spotify API request', err);
    });
}

export function getGeneralTopGenres(token) {
  return fetch(
    'https://api.spotify.com/v1/recommendations/available-genre-seeds',
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
  )
    .then(response => response.json())
    .then(res => {
      function shuffle(array) {
        let randomIndex, temp;
        for (let i = array.length - 1; i > 0; i--) {
          randomIndex = Math.floor(Math.random() * (i + 1));
          temp = array[i];
          array[i] = array[randomIndex];
          array[randomIndex] = temp;
        }
        return array;
      }
      shuffle(res.genres);
      return res.genres;
    })
    .catch(err => console.log('err', err));
}

export function getRecommendations(genre) {
  return fetch(
    'https://api.spotify.com/v1/recommendations?limit=10&seed_genres=' +
      encodeURIComponent(genre),
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
  )
    .then(response => response.json())
    .then(res => {
      return res.tracks;
    })
    .catch(err => console.log('err', err));
}
