import React, { Component } from 'react';
import ProfileScreen from '../components/ProfileScreen';

export default class profileScreenContainer extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <ProfileScreen navigation={this.props.navigation} />
    );
  }
}
