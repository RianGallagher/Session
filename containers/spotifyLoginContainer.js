import React, { Component } from 'react';
import SpotifyLoginInitial from '../components/SpotifyLoginInitial';
import spotifyStore from '../stores/spotifyStore';

export default class spotifyLoginContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: spotifyStore.getToken(),
      items: [
        { name: 'Based on your Spotify history, you seem to love...', code: '#666', type: 'info'},
        { name: 'Genre', code: '#3498db' }, { name: 'Band', code: '#f39c12' },
        { name: 'Song', code: '#bdc3c7' },   { name: 'Genre', code: '#3498db' },
        { name: 'Genre', code: '#3498db' }, { name: 'Band', code: '#f39c12' },
        { name: 'Song', code: '#bdc3c7' },   { name: 'Genre', code: '#3498db' },
        { name: 'Genre', code: '#3498db' }, { name: 'Band', code: '#f39c12' },
        { name: 'Song', code: '#bdc3c7' },   { name: 'Genre', code: '#3498db' },
        { name: '', code: '#666', type: 'button'},
      ]
    }
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  getSpotifySoundProfile(){
    fetch('https://api.spotify.com/v1/me/albums', {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      }
    }).then(response => response.json())
      .then(res => console.log(JSON.stringify(res)))
  }

  componentWillMount(){
    spotifyStore.on('token_updated', () => {
      this.setState({token: spotifyStore.getToken()});
    })
  }

  handleUpdate(){
    this.getSpotifySoundProfile();
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }

  render() {
    return (
      <SpotifyLoginInitial items={this.state.items} navigation={this.props.navigation} handleUpdate={this.handleUpdate} />
    );
  }
}
