import React, { Component } from 'react';
import ProfileScreen from '../components/ProfileScreen';

export default class profileScreenContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickListener = viewId => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

  _onPressButton() {
    Alert.alert('You tapped the button!');
  }

  render() {
    return <ProfileScreen navigation={this.props.navigation} />;
  }
}
