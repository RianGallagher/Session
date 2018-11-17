import React, { Component } from 'react';
import AltLogin from '../components/AltLogin';

export default class altLoginContainer extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        showBands: { name: 'Band', code: '#f39c12' },
        items: [
          { name: 'Tell us what you love...', code: '#666', type: 'info'},
          { name: 'Genre', code: '#666' }, { name: 'Band', code: '#f39c12' },
          { name: 'Song', code: '#bdc3c7' },   { name: 'Genre', code: '#3498db', type: 'genreExpand' },
          // { name: 'Genre', code: '#3498db' }, { name: 'Band', code: '#f39c12' },
          // { name: 'Song', code: '#bdc3c7' },   { name: 'Genre', code: '#3498db' },
          // { name: 'Genre', code: '#3498db' }, { name: 'Band', code: '#f39c12' },
          // { name: 'Song', code: '#bdc3c7' },   { name: 'Genre', code: '#3498db' },
          // { name: '', code: '#666', type: 'button'},
        ]
      }
      this.addBandJson = this.addBandJson.bind(this);
    }
    onClickListener = (viewId) => {
      Alert.alert("Alert", "Button pressed " + viewId);
    }

    addBandJson = () => {
      items.push(showBands);
    }

    render() {
      console.log(this.state.items);
      return (
          <AltLogin items={this.state.items}/>
      )
    }
}
