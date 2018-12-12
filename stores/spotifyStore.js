import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class SpotifyStore extends EventEmitter {
  constructor() {
    super();
    this.tokens = {
      token: '',
      refreshToken: ''
    };
  }
  setToken(token) {
    this.tokens.token = token;
    this.emit('token_updated');
  }
  getToken() {
    return this.tokens.token;
  }
  getAll() {
    return this.tokens;
  }
  handleActions(action) {
    switch (action.type) {
      case 'SET_TOKEN':
        this.setToken(action.token);
        break;
      default: {
        console.log(typeof action, 'Invalid action');
      }
    }
  }
}

const spotifyStore = new SpotifyStore();
dispatcher.register(spotifyStore.handleActions.bind(spotifyStore));

export default spotifyStore;
