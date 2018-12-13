import React, { Component } from 'react';
import SuggestedList from '../components/SuggestedList';

export default class suggestedListContainer extends React.Component {
  onClickListener = viewId => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

  render() {
    return <SuggestedList />;
  }
}
