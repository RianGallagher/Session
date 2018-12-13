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
      email: '',
      password: '',
      username: '',
      loggedIn: false
    };
    this.spotifyLogin = this.spotifyLogin.bind(this);
    this.basicLogin = this.basicLogin.bind(this);
    this.login = this.login.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.passwordReminder = this.passwordReminder.bind(this);
  }

  // componentDidMount(){
  //   sendbirdStore.on('login_success', () => {
  //     this.props.navigation.navigate('AltLogin');
  //   })
  // }

  handleEmailChange = emailText => {
    this.setState({ email: emailText.toLowerCase() });
  };

  handlePasswordChange = passwordText => {
    this.setState({ password: passwordText });
  };

  handleUsernameChange = usernameText => {
    this.setState({ username: usernameText.toLowerCase() });
  };

  registerUser = async () => {
    spotifyActions.setToken(await basicToken());
    if (
      this.state.username === '' ||
      this.state.password === '' ||
      this.state.email === ''
    ) {
      Alert.alert(
        'Somethings not quite right:',
        'Please check all fields have been filled'
      );
    } else {
      axios.get('http://session-native.herokuapp.com/users/username/' + this.state.username)
        .then(res => {
          if (res.data.length === 0) {
            loginActions.sendbirdLogin(
              this.state.username.replace(/\s/g, ''),
              this.state.email,
              this.state.password
            );
            this.props.navigation.navigate('AltLogin');
          } else {
            Alert.alert(
              'Oh no! Username already exists:',
              'please choose a different username'
            );
          }
        });
    }
  };

  login = () => {
    let currentUser = '';
    let pw = '';
    if (this.state.password === '') {
      Alert.alert('Attention:', 'please enter a password to continue');
    } else {
      if (this.state.email === '' && this.state.username === '') {
        Alert.alert(
          'Attention:',
          'please enter a valid email or username to login'
        );
      }
      if (this.state.email === '' && this.state.username !== '') {
        currentUser = this.state.username;
        pw = this.state.password;
        axios
          .get(
            'http://session-native.herokuapp.com/users/username/' + currentUser,
            {}
          )
          .then(res => {
            if (res.data.length === 0) {
              Alert.alert(
                'Attention:',
                'please register before attempting to log in'
              );
            } else if (currentUser === res.data[0].user.username) {
              if (pw === res.data[0].user.password) {
                this.props.navigation.navigate('ProfileScreen');
              } else {
                Alert.alert('Oh no!', 'invalid password entered');
              }
            }
          });
      } else if (this.state.email !== '' && this.state.username === '') {
        currentUser = this.state.email;
        pw = this.state.password;
        axios
          .get(
            'http://session-native.herokuapp.com/users/email/' + currentUser,
            {}
          )
          .then(res => {
            if (res.data.length === 0) {
              Alert.alert(
                'Attention:',
                'please register before attempting to log in'
              );
            } else if (currentUser === res.data[0].user.email) {
              if (pw === res.data[0].user.password) {
                this.props.navigation.navigate('ProfileScreen');
              } else {
                Alert.alert('Oh no!', 'invalid password entered');
              }
            }
          });
      } else {
        currentUser = this.state.username;
        pw = this.state.password;
        axios
          .get(
            'http://session-native.herokuapp.com/users/username/' + currentUser,
            {}
          )
          .then(res => {
            if (res.data.length === 0) {
              Alert.alert(
                'Attention:',
                'please register before attempting to log in'
              );
            } else if (currentUser === res.data[0].user.username) {
              if (pw === res.data[0].user.password) {
                this.props.navigation.navigate('ProfileScreen');
                loginActions.sendbirdLogin(
                  this.state.username.replace(/\s/g, '')
                );
              } else {
                Alert.alert('Oh no!', 'invalid password entered');
              }
            }
          });
      }
    }
  };

  passwordReminder = () => {
    if (this.state.email === '') {
      Alert.alert(
        'Oops, somethings not quite right: ',
        'Please enter your email to proceed'
      );
    } else {
      //TODO: implement axios get to confirm the user then send email with password
      Alert.alert(
        'Success!',
        'An email has been sent to your account to reset your password'
      );
    }
  };

  generateRandomString = length => {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  spotifyLogin = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let scope =
      'user-library-read user-top-read user-read-email user-read-private user-read-birthdate';
    let state = this.generateRandomString(16);

    let result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize?' +
        '&response_type=code' +
        '&client_id=' +
        client_id +
        (scope ? '&scope=' + encodeURIComponent(scope) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirectUrl) +
        '&state=' +
        state
    });

    if (result.type !== 'success') {
      Alert.alert('Spotify login unsuccessful');
      return;
    }
    const newToken = await token(result.params.code, redirectUrl);
    spotifyActions.setToken(newToken);
    let userName = fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + newToken
      }
    })
      .then(response => response.json())
      .then(spotifyProfile => {
        const spotifyUserName = spotifyProfile.display_name
          .toLowerCase()
          .replace(/ +/g, '');
        const email =
          spotifyProfile.email === null
            ? spotifyUserName
            : spotifyProfile.email;
        loginActions.sendbirdLogin(
          spotifyUserName,
          email.toLowerCase(),
          'handled_via_spotify'
        );
        axios
          .get(
            'http://session-native.herokuapp.com/users/username/' +
              spotifyUserName,
            {}
          )
          .then(res => {
            if (res.data.length === 0) {
              this.props.navigation.navigate('SpotifyInitial');
            } else {
              if (res.data[0].user.tasteProfile.length !== 0) {
                this.props.navigation.navigate('ProfileScreen');
              } else {
                this.props.navigation.navigate('SpotifyInitial');
              }
            }
          });
      });
  };

  basicLogin = async () => {
    spotifyActions.setToken(await basicToken());
    this.props.navigation.navigate('AltLogin');
  };

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
