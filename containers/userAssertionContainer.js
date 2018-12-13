import React, { Component } from 'react';
import UserAssertion from '../components/UserAssertion';
import * as soundProfile from '../spotifyFunctionality/soundProfile';
import spotifyStore from '../stores/spotifyStore';
import sendbirdStore from '../stores/sendbirdStore';
import axios from 'axios';

export default class userAssertionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: spotifyStore.getToken(),
      itemsOffset: 0
    };
    this.storeUserChoice = this.storeUserChoice.bind(this);
  }

  storeUserChoice = async () => {
    const userTasteProfile = await soundProfile.getUsersTop(
      this.state.token,
      this.state.itemsOffset,
      50
    );
    let username = await sendbirdStore.getUserId();
    username = username.toLowerCase();
    axios
      .put('http://session-native.herokuapp.com/users/username/' + username, {
        tasteProfile: userTasteProfile
      })
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
    this.props.navigation.navigate('ProfileScreen');
  };

  render() {
    return (
      <UserAssertion
        storeUserChoice={this.storeUserChoice}
        navigation={this.props.navigation}
      />
    );
  }
}
