import React, { Component } from 'react';
import SpotifyLoginInitial from '../components/SpotifyLoginInitial';
import spotifyStore from '../stores/spotifyStore';
import * as soundProfile from '../spotifyFunctionality/soundProfile';

export default class spotifyLoginContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: spotifyStore.getToken(),
      items: []
    }
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

  async getSpotifySoundProfile(){
    const topItems = await soundProfile.getTop(this.state.token);
    let items = [];

    topItems.artists.forEach((artist) => {
      items.push({name: artist, code: '#f39c12'})
    });
    topItems.genres.forEach((genre)=> {
      items.push({name: genre, 'code': '#3498db'})
    })

    items = this.shuffle(items);
    items.unshift(
      { name: 'Based on your Spotify history, you seem to love...', code: '#666', type: 'info'},
      { name: '', code: '#666', type: 'info'}
    );
    items.push({ name: '', code: '#666', type: 'button'});

    this.setState({items: items});
  }

  componentWillMount(){
    spotifyStore.on('token_updated', () => {
      this.setState({token: spotifyStore.getToken()});
    })
    this.getSpotifySoundProfile();
  }

  handleUpdate(){
    this.getSpotifySoundProfile();
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
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
