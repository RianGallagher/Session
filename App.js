import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import ProfileScreen from './components/ProfileScreen';
import loginContainer from './containers/loginContainer';
import altLoginContainer from './containers/altLoginContainer';
import spotifyLoginContainer from './containers/spotifyLoginContainer';
import userAssertionContainer from './containers/userAssertionContainer';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: loginContainer,
      navigationOptions: {
        header: null,
      }
    },
    SpotifyInitial: {
      screen: spotifyLoginContainer,
      navigationOptions: {
        header: null,
      }
    },
    UserAssertion: {
      screen: userAssertionContainer,
      navigationOptions: {
        header: null,
      }
    },
    AltLogin: {
      screen: altLoginContainer,
      navigationOptions: {
        header: null,
      }
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
