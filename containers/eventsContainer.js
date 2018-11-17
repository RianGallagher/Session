import React, { Component } from 'react';
import Events from '../components/Events';

export default class eventsContainer extends React.Component {

    onClickListener = (viewId) => {
      Alert.alert("Alert", "Button pressed " + viewId);
    }

    render(){
      return(
        <Events />
      );
    }
  }
