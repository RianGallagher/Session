import React, { Component } from 'react';
import SpotifyLoginInitial from '../components/SpotifyLoginInitial';
import spotifyStore from '../stores/spotifyStore';
import * as soundProfile from '../spotifyFunctionality/soundProfile';

export default class spotifyLoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: spotifyStore.getToken(),
      items: [],
      itemsOffset: 0
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  shuffle(array) {
    let randomIndex, temp;
    for (let i = array.length - 1; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

  async getSpotifySoundProfile() {
    // get users top listened to artists and genres
    // offset is how many more itmes to retrieve, it gets the next 10 each time
    const topItems = await soundProfile.getUsersTop(
      this.state.token,
      this.state.itemsOffset
    );
    let nextItems = [];

    topItems.artists.forEach(artist => {
      nextItems.push({ name: artist, code: '#f39c12', type: 'musicTile' });
    });
    topItems.genres.forEach(genre => {
      nextItems.push({ name: genre, code: '#3498db', type: 'musicTile' });
    });

    nextItems = this.shuffle(nextItems);
    if (this.state.itemsOffset === 0) {
      nextItems.unshift(
        {
          name: 'Based on your Spotify history, you seem to love...',
          code: '#666',
          type: 'info'
        },
        { name: '', code: '#666', type: 'info' }
      );
    }
    nextItems.push(
      { name: 'more', code: '#666', type: 'button' },
      { name: 'continue', code: '#666', type: 'button' }
    );

    // remove continue and more button (this last two elements) from original list
    const previousItems = this.state.items.slice(
      0,
      this.state.items.length - 2
    );
    this.setState({ items: previousItems.concat(nextItems) });
  }

  componentWillMount() {
    spotifyStore.on('token_updated', () => {
      this.setState({ token: spotifyStore.getToken() });
    });
    this.getSpotifySoundProfile();
  }

  handleUpdate() {
    this.setState(
      { itemsOffset: this.state.itemsOffset + 10 },
      this.getSpotifySoundProfile
    );
  }

  render() {
    return (
      <SpotifyLoginInitial
        items={this.state.items}
        navigation={this.props.navigation}
        handleUpdate={this.handleUpdate}
      />
    );
  }
}
