import React, { Component } from 'react';
import loginView from '../components/LoginView';
import token, { basicToken } from '../spotifyFunctionality/token';
import { AuthSession } from 'expo';
import * as spotifyActions from '../actions/spotifyActions';

const client_id = 'f7410f08c2064e4c9517603f56ed4089';

//Container component that manages state but renders no HTML
export default class loginContainer extends React.Component {
  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
      loggedIn: false
    }
    this.spotifyLogin = this.spotifyLogin.bind(this);
    this.basicLogin = this.basicLogin.bind(this);
    this.generateRandomString = this.generateRandomString.bind(this);
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }

  generateRandomString = (length) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  spotifyLogin = async() => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let scope = 'user-library-read user-top-read';
    let state = this.generateRandomString(16);

    let result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize?' +
        '&response_type=code' +
        '&client_id=' + client_id +
        (scope ? '&scope=' + encodeURIComponent(scope) : '') +
        '&redirect_uri=' + encodeURIComponent(redirectUrl) +
        '&state=' + state
    });

    if(result.type !== 'success'){
      Alert.alert('Spotify login unsuccessful');
      return;
    }
    const newToken = await token(result.params.code, redirectUrl);
    spotifyActions.setToken(newToken);
    this.props.navigation.navigate('SpotifyInitial');
  }

  basicLogin = async() => {
    spotifyActions.setToken(await basicToken());
    this.props.navigation.navigate('AltLogin');
  }

  render() {
      return (
        <LoginView
          spotifyLogin={this.spotifyLogin}
          basicLogin={this.basicLogin}
          navigation={this.props.navigation}/>
      );
  }
}
