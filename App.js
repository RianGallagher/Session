import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import AltLogin from './components/AltLogin';
import SpotifyLoginInitial from './components/SpotifyLoginInitial';
import UserAssertion from './components/UserAssertion';
import ProfileScreen from './components/ProfileScreen';
import loginContainer from './containers/loginContainer';
import altLoginContainer from './containers/altLoginContainer';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: loginContainer,
      navigationOptions: {
        header: null,
      }
    },
    SpotifyInitial: {
      screen: SpotifyLoginInitial,
      navigationOptions: {
        header: null,
      }
    },
    UserAssertion: {
      screen: UserAssertion,
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
