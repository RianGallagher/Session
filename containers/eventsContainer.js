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
      artist: '',
      location: '',
      artistInfo: []
    };
    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.songkickSearch = this.songkickSearch.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
  }

  songkickSearch = (artist, location) => {
    this.state.artistInfo = [];
    let artistInfo = this.state.artistInfo;
    axios
      .get(
        'https://api.songkick.com/api/3.0/search/artists.json?apikey=ezyaPVFXDxEcDrXu&query=' +
          this.state.artist +
          '&per_page=1'
      )
      .then(res => {
        if (res.data.resultsPage.totalEntries !== 0) {
          let artistId = res.data.resultsPage.results.artist[0].id;
          let resNum = 30;
          axios
            .get(
              'https://api.songkick.com/api/3.0/artists/' +
                artistId +
                '/calendar.json?apikey=ezyaPVFXDxEcDrXu&per_page=' +
                resNum
            )
            .then(res => {
              if (res.data.resultsPage.results.event.length !== 0) {
                for (
                  i = 0;
                  i < res.data.resultsPage.results.event.length;
                  i++
                ) {
                  let artistName =
                    res.data.resultsPage.results.event[i].performance[0].artist
                      .displayName;
                  let venue =
                    res.data.resultsPage.results.event[i].venue.displayName;
                  let location =
                    res.data.resultsPage.results.event[i].location.city;
                  let date = res.data.resultsPage.results.event[i].start.date;
                  let uri = res.data.resultsPage.results.event[i].uri;
                  if (this.state.location !== '') {
                    if (
                      location.split(',')[0].toLowerCase() ===
                      this.state.location.toLowerCase()
                    ) {
                      artistInfo.push({
                        name: artistName,
                        venue: venue,
                        location: location,
                        date: date,
                        uri: uri
                      });
                    }
                  } else {
                    artistInfo.push({
                      name: artistName,
                      venue: venue,
                      location: location,
                      date: date,
                      uri: uri
                    });
                  }
                  this.setState({ artistInfo: artistInfo });
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderEvents = () => {
    if (this.state.artistInfo.length === 0) {
      return (
        <Text> {'\n'} No dates for current artist, Try a new search! </Text>
      );
    } else {
      return this.state.artistInfo.map((data, index) => {
        return (
          <View key={index}>
            <Text>{'\n'}</Text>
            {data.name.toLowerCase() === this.state.artist.toLowerCase() ? (
              <Text>
                {data.name},{'\n'}
              </Text>
            ) : null}
            <Text>
              {data.venue.toLowerCase() === 'unknown venue' ? (
                <Text>Festival,{'\n'}</Text>
              ) : (
                <Text>
                  {data.venue},{'\n'}
                </Text>
              )}
            </Text>
            <Text>
              {data.location},{'\n'}
            </Text>
            <Text>
              {moment(new Date(data.date)).format('Do MMMM YYYY')}.{'\n'}
            </Text>
            <Hyperlink
              linkDefault={true}
              linkStyle={{ color: '#2980b9' }}
              linkText={url => (url === data.uri ? 'Songkick' : url)}
            >
              <Text>
                Get tickets via: {data.uri}
                {'\n'}
              </Text>
            </Hyperlink>
            <Text>{'\n'}</Text>
            <Hr>
              <Text />
            </Hr>
          </View>
        );
      });
    }
  };

  handleArtistChange = artist => {
    this.setState({ artist: artist });
  };

  handleLocationChange = location => {
    this.setState({ location: location });
  };

  render() {
    return (
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
