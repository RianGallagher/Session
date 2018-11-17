import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import loginContainer from './containers/loginContainer';
import altLoginContainer from './containers/altLoginContainer';
import spotifyLoginContainer from './containers/spotifyLoginContainer';
import userAssertionContainer from './containers/userAssertionContainer';
import profileScreenContainer from './containers/profileScreenContainer';
import ChatScreen from './components/ChatScreen';
import Events from './components/Events';
import SuggestedList from './components/SuggestedList';

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
      screen: profileScreenContainer,
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
