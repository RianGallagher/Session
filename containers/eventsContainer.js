import React, { Component } from 'react';
import Events from '../components/Events';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ScrollView,
  Button,
  Image,
  ImageBackground,
  Alert
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import Hyperlink from 'react-native-hyperlink';
import Hr from 'react-native-hr-plus';

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
        let resNum = 10;
        axios.get('https://api.songkick.com/api/3.0/artists/' + artistId + '/calendar.json?apikey=ezyaPVFXDxEcDrXu&per_page=' + resNum)
          .then((res) => {
            for (i=0; i<resNum; i++){
              let artistName = res.data.resultsPage.results.event[i].performance[0].artist.displayName;
              let venue = res.data.resultsPage.results.event[i].venue.displayName;
              let location = res.data.resultsPage.results.event[i].location.city;
              let date = res.data.resultsPage.results.event[i].start.date;
              let uri = res.data.resultsPage.results.event[i].uri;
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
    console.log(this.state.artistInfo)
    return this.state.artistInfo.map((data, index) => {
      return (
        <View key={index}>
          <Text>{'\n'}</Text>
          <Text>{data.name},{'\n'}</Text>
          <Text>{data.venue},{'\n'}</Text>
          <Text>{data.location},{'\n'}</Text>
          <Text>{moment(data.date).format('do MMMM YYYY')}.{'\n'}</Text>
          <Hyperlink
            linkDefault={ true }
            linkStyle={ { color: '#2980b9' } }
            linkText={ url => url === data.uri ? 'Songkick' : url }
            >
            <Text>
              Get tickets via: {data.uri}{'\n'}
            </Text>
          </Hyperlink>
          <Text>{'\n'}</Text>
          <Hr/>
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
