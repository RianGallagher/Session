import React, { Component } from 'react';
import ChatScreen from '../components/ChatScreen';
import { sbCreateOpenChannelListQuery } from '../sendbirdActions';
import * as openChannelActions from '../actions/openChannelActions';
import sendbirdStore from '../stores/sendbirdStore';

export default class chatScreenContainer extends React.Component {

  constructor(props) {
    super(props);
    state = {
      openChannelList: []
    }
    this.getOpenChats = this.getOpenChats.bind(this);
  }

  componentWillMount(){
    openChannelListQuery= sbCreateOpenChannelListQuery();
    openChannelActions.getOpenChannelList(openChannelListQuery);
    sendbirdStore.on('open_channel_list_update', () => {
      this.setState({openChannelList: sendbirdStore.getOpenChannelList()})
    })
  }

  getOpenChats = async() => {
    this.state.openChannelList.forEach((channel) => {
      console.log(channel.name);
    })
  }

  render() {
      return (
        <ChatScreen
          getOpenChats={this.getOpenChats}
        />
      );
  }
}
