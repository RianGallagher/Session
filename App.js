import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import AltLogin from './components/AltLogin';
import SpotifyLoginInitial from './components/SpotifyLoginInitial';
import UserAssertion from './components/UserAssertion';
import ProfileScreen from './components/ProfileScreen';
import LoginView from './components/LoginView';
import ChatScreen from './components/ChatScreen';
import Events from './components/Events';
import SuggestedList from './components/SuggestedList';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: LoginView,
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
      screen: AltLogin,
      navigationOptions: {
        header: null,
      }
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
      }
    },
    ChatScreen: {
      screen: ChatScreen,
      navigationOptions: {
        header: null,
      }
    },
    Events: {
      screen: Events,
      navigationOptions: {
        header: null,
      }
    },
    SuggestedList: {
      screen: SuggestedList,
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
