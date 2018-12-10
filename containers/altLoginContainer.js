import React, { Component } from 'react';
import AltLogin from '../components/AltLogin';
import spotifyStore from '../stores/spotifyStore';
import * as soundProfile from '../spotifyFunctionality/soundProfile';
import sendbirdStore from '../stores/sendbirdStore';
import axios from 'axios';

export default class altLoginContainer extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        items: [],
        favBands: []
      }
      this.getRecommendations = this.getRecommendations.bind(this);
      this.selectFavBands = this.selectFavBands.bind(this);
      this.saveUserSelection = this.saveUserSelection.bind(this);
    }

    getTopGenres = async() => {
      const genres = await soundProfile.getGeneralTopGenres(spotifyStore.getToken());
      let items = [];

      genres.forEach( genre => {
        items.push({name: genre, code: '#3498db', type: 'genreExpand'})
      })

      items.unshift({ name: 'Tell us what you love, tap on a genre to expand it, tap on an artist to select it.', code: '#666', type: 'info'})
      items.push({ name: '', code: '#666', type: 'button'});

      this.setState({items: items});
    }

    componentWillMount(){
      this.getTopGenres();
    }

    async getRecommendations(genre){
      let index;
      const recommendations = await soundProfile.getRecommendations(genre);

      tempItems = this.state.items;
      tempItems.find(function(item, i){
        if(item.name === genre){
          index = i;
          item.code = '#000080'
        }
      });

      const maxRecommendations = recommendations.length < 3 ? recommendations.length : 3;
      for(let i = 0; i < maxRecommendations; i++)
        tempItems.splice(index+1, 0, {name: recommendations[i].artists[0].name, code: '#f39c12', genre: genre, type: 'selectBand'});
        tempItems.join();
        this.setState({items: tempItems});
    }

    async selectFavBands(band, genre, code){
      let favBands = this.state.favBands;
      let tempItems = this.state.items;
      let exists = false;
      favBands.find(function(item, i){
        if(item.name === band){
          index = i;
          exists = true;
        }
      });
      tempItems.find(function(item, i){
        if(item.name === band){
          index = i;
          item.code = '#A65200';
        }
      });
      if(exists === false){
        favBands.push({name: band, genre: genre, code:'#A65200'});
        this.setState({favBands: favBands});
      }
    }

    saveUserSelection = async() => {
      const username = sendbirdStore.getUserId()
      const userTasteProfile = this.state.favBands;
      axios.put('http://192.168.0.73:2018/users/username/' + (username.toLowerCase()), {'tasteProfile': userTasteProfile})
      .then(res => {console.log(res.data)})
      this.props.navigation.navigate('ProfileScreen')
    }

    render() {
      return (
          <AltLogin
            items={this.state.items}
            getRecommendations={this.getRecommendations}
            selectFavBands={this.selectFavBands}
            saveUserSelection={this.saveUserSelection}
            navigation={this.props.navigation}
          />
      )
    }
}
