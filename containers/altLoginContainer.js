import React, { Component } from 'react';
import AltLogin from '../components/AltLogin';
import spotifyStore from '../stores/spotifyStore';
import * as soundProfile from '../spotifyFunctionality/soundProfile';

export default class altLoginContainer extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        showBands: { name: 'Band', code: '#f39c12' },
        items: []
      }
      this.addBandJson = this.addBandJson.bind(this);
    }

    getTopGenres = async() => {
      const genres = await soundProfile.getTopGenres(spotifyStore.getToken());
      let items = [];

      genres.forEach( genre => {
        items.push({name: genre, code: '#3498db'})
      })

      items.unshift({ name: 'Tell us what you love...', code: '#666', type: 'info'})
      items.push({ name: '', code: '#666', type: 'button'});

      this.setState({items: items});
    }

    async componentWillMount(){
      this.getTopGenres();
    }

    onClickListener = (viewId) => {
      Alert.alert("Alert", "Button pressed " + viewId);
    }

    addBandJson = () => {
      items.push(showBands);
    }

    render() {
      return (
          <AltLogin items={this.state.items} navigation={this.props.navigation} />
      )
    }
}
