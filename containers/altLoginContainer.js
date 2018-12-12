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
        min: 0,
        max: 25,
        allItems: [],
        items: [],
        artists: [],
        genres: []
      }
      this.getRecommendations = this.getRecommendations.bind(this);
      this.selectFavBands = this.selectFavBands.bind(this);
      this.addMoreBands = this.addMoreBands.bind(this);
      this.saveUserSelection = this.saveUserSelection.bind(this);
    }

    getTopGenres = async() => {
      const genres = await soundProfile.getGeneralTopGenres(spotifyStore.getToken());
      let allItems = this.state.allItems;

      genres.forEach( genre => {
        allItems.push({name: genre, code: '#3498db', type: 'genreExpand'})
      })

      allItems.unshift({ name: 'Tell us what you love, tap on a genre to expand it, tap on an artist to select it.', code: '#666', type: 'info'});
      this.setState({allItems: allItems});
      let items = [];
      for(i=this.state.min; i<=this.state.max; i++){
        items.push(allItems[i]);
      }
      items.push({ name: '', code: '#666', type: 'addMore'}, { name: '', code: '#666', type: 'button'});
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
        if(item.name === genre && item.code === '#3498db'){
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
      let artists = this.state.artists;
      let genres = this.state.genres
      let tempItems = this.state.items;
      let exists = false;
      artists.find(function(item, i){
        if(item === band){
          index = i;
          exists = true;
        }
      });
      tempItems.find(function(item, i){
        if(item.name === band){
          item.code = '#A65200';
        }
      });
      if(exists === false){
        artists.push(band);
        genres.push(genre);
        this.setState({artists: artists});
        this.setState({genres: genres});
      }
      console.log(artists, genres);
    }

    async addMoreBands(){
      let min = this.state.min + 26;
      let max = this.state.max + 26;
      const allItems = this.state.allItems;
      this.setState({min: this.state.min+25, max: this.state.max+25}, () => {
        let newItems = this.state.items.slice(0, this.state.items.length-2);
        for(i=min; i<=max; i++){
          newItems.push(allItems[i]);
        }
        newItems.push({ name: '', code: '#666', type: 'addMore'}, { name: '', code: '#666', type: 'button'});
        this.setState({items: newItems});
      });

    }

    saveUserSelection = async() => {
      const username = sendbirdStore.getUserId()
      const userTasteProfile = { 'artists': this.state.artists, 'genres': this.state.genres };
      axios.put('http://192.168.0.73:2018/users/username/' + (username.toLowerCase()), {'tasteProfile': userTasteProfile})
      .then(res => {console.log(res.data)})
      this.props.navigation.navigate('ProfileScreen')
    }

    render() {
      return (
          <AltLogin
            items={this.state.items}
            addMoreBands={this.addMoreBands}
            getRecommendations={this.getRecommendations}
            selectFavBands={this.selectFavBands}
            saveUserSelection={this.saveUserSelection}
            navigation={this.props.navigation}
          />
      )
    }
}
