import React, { Component } from 'react';
import { ListView } from 'react-native';
import ChatList from '../components/ChatList';
import {
  sbCreateOpenChannelListQuery,
  sbGetOpenChannel
} from '../sendbirdActions';
import * as openChannelActions from '../actions/openChannelActions';
import sendbirdStore from '../stores/sendbirdStore';
import axios from 'axios';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class chatScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullList: [],
      list: [],
      openChannelListQuery: sbCreateOpenChannelListQuery()
    };
    this.navigateToChat = this.navigateToChat.bind(this);
    this.getMoreChannels = this.getMoreChannels.bind(this);
  }

  componentWillMount() {
    openChannelActions.getOpenChannelList(this.state.openChannelListQuery);
    sendbirdStore.on('open_channel_list_update', () => {
      const newList = [
        ...this.state.fullList,
        ...sendbirdStore.getOpenChannelList()
      ];

      this.setState({ fullList: newList }, () => {
        console.log('after set state', this.state.openChannelListQuery.hasNext);
        if (this.state.openChannelListQuery.hasNext) this.getMoreChannels();
        else {
          this.createPersonalList();
        }
      });
    });
  }

  createPersonalList() {
    const username = sendbirdStore.getUserId();
    axios
      .get('http://session-native.herokuapp.com/users/username/' + username)
      .then(res => {
        const tasteProfile = res.data[0].user.tasteProfile.genres;

        const newList = this.state.fullList.filter(elem => {
          console.log('elem name', elem.name, tasteProfile.includes(elem.name));
          return tasteProfile.includes(elem.name);
        });
        console.log('new list', newList);
        this.setState({ list: newList });
      });
  }

  getMoreChannels() {
    openChannelActions.getOpenChannelList(this.state.openChannelListQuery);
  }

  navigateToChat(channelUrl) {
    this.props.navigation.navigate('ChatScreen', { channelUrl: channelUrl });
  }

  render() {
    return (
      <ChatList
        channelList={this.state.list}
        getMoreChannels={this.getMoreChannels}
        navigateToChat={this.navigateToChat}
      />
    );
  }
}
