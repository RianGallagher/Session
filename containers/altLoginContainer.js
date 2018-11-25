import React, { Component } from 'react';
import AltLogin from '../components/AltLogin';
import spotifyStore from '../stores/spotifyStore';
import * as soundProfile from '../spotifyFunctionality/soundProfile';

export default class altLoginContainer extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        items: [],
        favBands: []
      }
      this.getRecommendations = this.getRecommendations.bind(this);
      this.selectFavBands = this.selectFavBands.bind(this);
    }

    getTopGenres = async() => {
      const genres = await soundProfile.getGeneralTopGenres(spotifyStore.getToken());
      let items = [];

      genres.forEach( genre => {
        items.push({name: genre, code: '#3498db', type: 'genreExpand'})
      })

      items.unshift({ name: 'Tell us what you love...', code: '#666', type: 'info'})
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
        }
      });

      const maxRecommendations = recommendations.length < 3 ? recommendations.length : 3;
      for(let i = 0; i < maxRecommendations; i++)
        tempItems.splice(index+1, 0, {name: recommendations[i].artists[0].name, code: '#f39c12', genre: genre, type: 'selectBand'});
        tempItems.join();
        this.setState({items: tempItems});
    }

    async selectFavBands(band, genre){
      let favBands = this.state.favBands;
      favBands.push({name: band, genre: genre});
      this.setState({favBands: favBands});
      console.log(favBands);
    }



    onClickListener = (viewId) => {
      Alert.alert("Alert", "Button pressed " + viewId);
    }

    render() {
      return (
          <AltLogin
            items={this.state.items}
            getRecommendations={this.getRecommendations}
            selectFavBands={this.selectFavBands}
            navigation={this.props.navigation}
          />
      )
    }
}
