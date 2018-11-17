import React, { Component } from 'react';
import SpotifyLoginInitial from '../components/SpotifyLoginInitial';

export default class spotifyLoginContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }

  render() {
    return (
      <SpotifyLoginInitial items={this.state.items} navigation={this.props.navigation} />
    );
  }
}
