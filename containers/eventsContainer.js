import React, { Component } from 'react';
import Events from '../components/Events';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Button,
  Image,
  ImageBackground,
  Alert
} from 'react-native';
import axios from 'axios';

export default class eventsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist   : '',
      location: '',
      artistInfo: []
    }
    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.songkickSearch = this.songkickSearch.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
  }

  songkickSearch = (artist, location) => {
    let artistInfo = this.state.artistInfo;
    axios.get('https://api.songkick.com/api/3.0/search/artists.json?apikey=ezyaPVFXDxEcDrXu&query=' + this.state.artist + '&per_page=1')
      .then((res) => {
        let artistId = res.data.resultsPage.results.artist[0].id;
        let resNum = 5;
        axios.get('https://api.songkick.com/api/3.0/artists/' + artistId + '/calendar.json?apikey=ezyaPVFXDxEcDrXu&per_page=' + resNum)
          .then((res2) => {
            for (i=0; i<resNum; i++){
              let artistName = res2.data.resultsPage.results.event[i].performance[0].artist.displayName;
              let venue = res2.data.resultsPage.results.event[i].venue.displayName;
              let location = res2.data.resultsPage.results.event[i].location.city;
              let date = res2.data.resultsPage.results.event[i].start.date;
              let uri = res2.data.resultsPage.results.event[i].uri;
              artistInfo.push({name: artistName, venue: venue, location: location, date: date, uri: uri});
              this.setState({artistInfo: artistInfo});
            }

          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        console.log(error);
      })
    }

  renderEvents = () => {
    // console.log(this.state.artistInfo)
    return this.state.artistInfo.map((data, index) => {
      return (
        <View key={index}>
          <Text>{data.name}, {data.venue}, {data.location}, {data.data}, {data.uri}</Text>
        </View>
      )
    });
  }

  handleArtistChange = (artist) => {
    this.setState({artist: artist})
  }

  handleLocationChange = (location) => {
    this.setState({location: location})
  }

    onClickListener = (viewId) => {
      Alert.alert("Alert", "Button pressed " + viewId);
    }

    render(){
      return(
        <Events
        renderEvents={this.renderEvents}
        handleArtistChange={this.handleArtistChange}
        handleLocationChange={this.handleLocationChange}
        songkickSearch={this.songkickSearch}
        artistInfo={this.state.artistInfo}
        />
      );
    }
  }
