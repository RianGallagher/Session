import React, { Component } from 'react';
import UserAssertion from '../components/UserAssertion';

export default class userAssertionContainer extends React.Component {
  constructor(props){
    super(props);
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }

  render(){
    return(
      <UserAssertion navigation={this.props.navigation} />
    );
  }
}
