import React, { Component } from 'react';
import UserAssertion from '../components/UserAssertion';
import * as soundProfile from '../spotifyFunctionality/soundProfile';
import spotifyStore from '../stores/spotifyStore';
import sendbirdStore from '../stores/sendbirdStore';
import axios from 'axios';

export default class userAssertionContainer extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        token: spotifyStore.getToken(),
        itemsOffset: 0
      }
      this.storeUserChoice = this.storeUserChoice.bind(this);
  }

  storeUserChoice = async() => {
    console.log(this.state.token, this.state.itemsOffset)
    const userTasteProfile =  await soundProfile.getUsersTop(this.state.token, this.state.itemsOffset, 50);
    const username = sendbirdStore.getUserId()
    axios.put('http://149.157.122.223:2018/users/username/' + (username.toLowerCase()), {'tasteProfile': userTasteProfile})
    .then(res => {console.log(res.data)})
    this.props.navigation.navigate('ProfileScreen');
  }

  render(){
    return(
      <UserAssertion
        storeUserChoice={this.storeUserChoice}
        navigation={this.props.navigation}
      />
    );
  }
}
