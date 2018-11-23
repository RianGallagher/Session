import React, { Component } from 'react';
import SpotifyLoginInitial from '../components/SpotifyLoginInitial';
import spotifyStore from '../stores/spotifyStore';

export default class spotifyLoginContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: spotifyStore.getToken(),
      items: []
    }
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  getSpotifySoundProfile(){
    fetch('https://api.spotify.com/v1/me/top/artists?limit=10', {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      }
    })
    .then(response => response.json())
    .then(res => {
      let items = [
        { name: 'Based on your Spotify history, you seem to love...', code: '#666', type: 'info'},
        { name: '', code: '#666', type: 'info'}
      ];
      res.items.forEach((artist) => {
        items.push({name: artist.name, code: '#f39c12'});
        console.log('genres', artist.genres);
        items.push({name: artist.genres[0], code: '#3498db'});
      })
      items.push({ name: '', code: '#666', type: 'button'});
      this.setState({items: items});
    })
    .catch((err) => {
      console.log('err', err);
    })
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
