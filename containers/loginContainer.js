import { Alert } from 'react-native';
import React, { Component } from 'react';
import loginView from '../components/LoginView';
import token, { basicToken } from '../spotifyFunctionality/token';
import { AuthSession } from 'expo';
import * as spotifyActions from '../actions/spotifyActions';
import * as loginActions from '../actions/loginActions';
import sendbirdStore from '../stores/sendbirdStore';
import axios from 'axios';

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
    this.login = this.login.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.passwordReminder = this.passwordReminder.bind(this);
  }

  handleEmailChange = (emailText) => {
    console.log(emailText);
    this.setState({email: emailText.toLowerCase()})
  }

  handlePasswordChange = (passwordText) => {
    console.log(passwordText);
    this.setState({password: passwordText})
  }

  handleUsernameChange = (usernameText) => {
    console.log(usernameText);
    this.setState({username: usernameText.toLowerCase()})
  }

  registerUser = async() => {
    spotifyActions.setToken(await basicToken());
    if(this.state.username === '' || this.state.password === '' || this.state.email === ''){
      Alert.alert('Somethings not quite right:', 'Please check all fields have been filled');
    } else {
      loginActions.sendbirdLogin(this.state.username.replace(/\s/g,''), this.state.email, this.state.password);

      spotifyActions.setToken(await basicToken());
      this.props.navigation.navigate('AltLogin');
    }
  }

  login = () => {
    let currentUser = '';
    let pw = '';
    if(this.state.password === ''){
      Alert.alert('Attention:', 'please enter a password to continue')
    } else {
      if(this.state.email === '' && this.state.username === ''){
        Alert.alert('Attention:', 'please enter a valid email or username to login')
      }
      if(this.state.email === '' && this.state.username !== ''){
        currentUser = this.state.username;
        pw = this.state.password;
        axios.get('http://149.157.122.223:2018/users/username/' + currentUser, {})
        .then((res) => {
          if(res.data.length === 0){
            Alert.alert('Attention:', 'please register before attempting to log in')
          } else if(currentUser === res.data[0].user.username) {
              if(pw === res.data[0].user.password){
                this.props.navigation.navigate('ProfileScreen');
              } else {
                Alert.alert('Oh no!', 'invalid password entered')
              }
          }
        })
      }else if (this.state.email !== '' && this.state.username === ''){
        currentUser = this.state.email;
        pw = this.state.password
        axios.get('http://149.157.122.223:2018/users/email/' + currentUser, {})
        .then((res) => {
          if(res.data.length === 0){
            Alert.alert('Attention:', 'please register before attempting to log in')
          } else if(currentUser === res.data[0].user.email) {
              if(pw === res.data[0].user.password){
                this.props.navigation.navigate('ProfileScreen');
              } else {
                Alert.alert('Oh no!', 'invalid password entered')
              }
          }
        })
      }else{
        currentUser = this.state.username;
        pw = this.state.password;
        axios.get('http://149.157.122.223:2018/users/username/' + currentUser, {})
        .then((res) => {
          if(res.data.length === 0){
            Alert.alert('Attention:', 'please register before attempting to log in')
          } else if(currentUser === res.data[0].user.username) {
              if(pw === res.data[0].user.password){
                this.props.navigation.navigate('ProfileScreen');
                loginActions.sendbirdLogin(this.state.username.replace(/\s/g,''));
              } else {
                Alert.alert('Oh no!', 'invalid password entered')
              }
          }
        })
      }
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
    let scope = 'user-library-read user-top-read user-read-email user-read-private user-read-birthdate';
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
    .then(spotifyProfile => {
      loginActions.sendbirdLogin(spotifyProfile.display_name.toLowerCase(), spotifyProfile.email.toLowerCase(), 'handled_via_spotify');
    })
  }

  basicLogin = async() => {
    spotifyActions.setToken(await basicToken());
    this.props.navigation.navigate('AltLogin');
  }

  render() {
      return (
        <LoginView
          login={this.login}
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
