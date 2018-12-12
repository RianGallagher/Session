import React, { Component } from 'react';
import { ListView } from 'react-native';
import ChatList from '../components/ChatList';
import { sbCreateOpenChannelListQuery } from '../sendbirdActions';
import * as openChannelActions from '../actions/openChannelActions';
import sendbirdStore from '../stores/sendbirdStore';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class chatScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.getOpenChats = this.getOpenChats.bind(this);
    this.navigateToChat = this.navigateToChat.bind(this);
  }

  componentWillMount() {
    openChannelListQuery = sbCreateOpenChannelListQuery();
    openChannelActions.getOpenChannelList(openChannelListQuery);
    sendbirdStore.on('open_channel_list_update', () => {
      const newList = [
        ...this.state.list,
        ...sendbirdStore.getOpenChannelList()
      ];
      this.setState({ list: newList });
    });
  }

  navigateToChat(channelUrl) {
    this.props.navigation.navigate('ChatScreen', { channelUrl: channelUrl });
  }

  getOpenChats = async () => {
    this.state.list.forEach(channel => {
      console.log(channel.name);
    });
  };

  render() {
    return (
      <ChatList
        channelList={this.state.list}
        navigateToChat={this.navigateToChat}
        getOpenChats={this.getOpenChats}
      />
    );
  }
}
