import { Alert } from 'react-native';
import React, { Component } from 'react';
import loginView from '../components/LoginView';
import token, { basicToken } from '../spotifyFunctionality/token';
import { AuthSession } from 'expo';
import * as spotifyActions from '../actions/spotifyActions';
import axios from 'axios';
import SendBird from 'sendbird';

const client_id = 'f7410f08c2064e4c9517603f56ed4089';

//Container component that manages state but renders no HTML
export default class loginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      username: '',
      loggedIn: false,
    }
    this.spotifyLogin = this.spotifyLogin.bind(this);
    this.basicLogin = this.basicLogin.bind(this);
    this.generateRandomString = this.generateRandomString.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.sb = new SendBird({ 'appId': 'DB1DDFB5-2EA6-44D1-AEAA-74E33BB11119' });
    this.passwordReminder = this.passwordReminder.bind(this);
  }

  handleEmailChange = (emailText) => {
    console.log(emailText);
    this.setState({email: emailText})
  }

  handlePasswordChange = (passwordText) => {
    console.log(passwordText);
    this.setState({password: passwordText})
  }

  handleUsernameChange = (usernameText) => {
    console.log(usernameText);
    this.setState({username: usernameText})
  }

  registerUser = async() => {
    spotifyActions.setToken(await basicToken());
    if(this.state.username === '' || this.state.password === '' || this.state.email === ''){
      Alert.alert('Somethings not quite right:', 'Please check all fields have been filled');
    } else {
      const USER_ID = (this.state.username.replace(/\s/g,''))
      this.sb.connect(USER_ID, function(user, error) {});
      axios.get('http://192.168.0.73:2018/users/username/' + USER_ID, {})
      .then((res) => {
        if(res.data.length === 0){
          axios.post('http://192.168.0.73:2018/users', {
              email: this.state.email,
              password: this.state.password,
              username: USER_ID
          })
          .then((res) => {
            console.log(res)
          })
          .catch((error) => {
            console.log(error);
          });
          this.props.navigation.navigate('AltLogin');
        } else {
          Alert.alert('Oh no! Username already exists:', 'please choose a different username')
        }
      })
    }
  }

  passwordReminder = () => {
    if(this.state.email === ''){
      Alert.alert('Oops, somethings not quite right: ', 'Please enter your email to proceed')
    } else {
      //TODO: implement axios get to confirm the user then send email with password
      Alert.alert('Success!', 'An email has been sent to your account to reset your password')
    }
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
    this.props.navigation.navigate('SpotifyInitial')
    const userName = fetch('https://api.spotify.com/v1/me', {
      headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + newToken
      }
    })
    .then(response => response.json())
    .then(res => {
        const spotifyUser = res.display_name;
        this.sb.connect(spotifyUser, function(user, error) {})
        axios.get('http://192.168.0.73:2018/users/username/' + spotifyUser, {})
        .then((res) => {
          if(res.data.length === 0){
            axios.post('http://192.168.0.73:2018/users', {
              email: spotifyUser + '@spotifyLogin',
              password: 'handled_via_spotify',
              username: spotifyUser
            })
            .then((res) => {
              console.log(res)
            })
            .catch((error) => {
              console.log(error);
            });
          }
        })
      })
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
          registerUser={this.registerUser}
          handleEmailChange={this.handleEmailChange}
          handlePasswordChange={this.handlePasswordChange}
          handleUsernameChange={this.handleUsernameChange}
          passwordReminder={this.passwordReminder}
          navigation={this.props.navigation}
        />
      );
  }
}
