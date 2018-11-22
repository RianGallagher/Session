import React, { Component } from 'react';
import SpotifyLoginInitial from '../components/SpotifyLoginInitial';
import spotifyStore from '../stores/spotifyStore';

export default class spotifyLoginContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: spotifyStore.getToken(),
<<<<<<< HEAD
      items: []
=======
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
>>>>>>> master
    }
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  getSpotifySoundProfile(){
<<<<<<< HEAD
    fetch('https://api.spotify.com/v1/me/top/artists?limit=10', {
=======
    fetch('https://api.spotify.com/v1/me/albums', {
>>>>>>> master
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      }
<<<<<<< HEAD
    })
    .then(response => response.json())
    .then(res => {
      let items = [{ name: 'Based on your Spotify history, you seem to love...', code: '#666', type: 'info'}];
      res.items.forEach((artist) => {
        items.push({name: artist.name, code: '#f39c12'})
      })
      this.setState({items: items});
    })
=======
    }).then(response => response.json())
      .then(res => console.log(JSON.stringify(res)))
>>>>>>> master
  }

  componentWillMount(){
    spotifyStore.on('token_updated', () => {
      this.setState({token: spotifyStore.getToken()});
    })
<<<<<<< HEAD
    this.getSpotifySoundProfile();
=======
>>>>>>> master
  }

  handleUpdate(){
    this.getSpotifySoundProfile();
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }

  render() {
    return (
<<<<<<< HEAD
      <SpotifyLoginInitial
        items={this.state.items}
        navigation={this.props.navigation}
        handleUpdate={this.handleUpdate}
      />
=======
      <SpotifyLoginInitial items={this.state.items} navigation={this.props.navigation} handleUpdate={this.handleUpdate} />
>>>>>>> master
    );
  }
}
