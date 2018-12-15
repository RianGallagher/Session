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
      list: [],
      openChannelListQuery: {}
    };
    this.navigateToChat = this.navigateToChat.bind(this);
    this.getMoreChannels = this.getMoreChannels.bind(this);
  }

  componentWillMount() {
    openChannelListQuery = sbCreateOpenChannelListQuery();
    openChannelActions.getFullOpenChannelList(openChannelListQuery);
    sendbirdStore.on('open_channel_list_update', () => {
      const newList = [
        ...this.state.list,
        ...sendbirdStore.getOpenChannelList()
      ];
      this.setState({
        list: newList,
        openChannelListQuery: openChannelListQuery
      });
    });
  }

  // componentWillMount() {
  //   openChannelListQuery = sbCreateOpenChannelListQuery();
  //   openChannelActions.getOpenChannelList(openChannelListQuery);
  //   let tasteProfileList = [];
  //   sendbirdStore.on('open_channel_list_update', () => {
  //     const username = sendbirdStore.getUserId()
  //     axios.get('http://session-native.herokuapp.com/users/username/' + username)
  //     .then((res) => {
  //       const tasteProfile = res.data[0].user.tasteProfile.genres;
  //
  //       tasteProfile.forEach((genre) => {
  //         console.log(genre)
  //         sbGetOpenChannel(genre)
  //         .then(channel => tasteProfileList.push(channel));
  //       })
  //     })
  //   })
  //
  //
  //
  //
  //       // const openChannels = sendbirdStore.getOpenChannelList();
  //       // console.log('includes?', typeof tasteProfile.includes('Pop'));
  //       // const tasteProfileList = openChannels.filter((elem) => {
  //       //   console.log(elem.name)
  //       //   tasteProfile.includes(elem.name)
  //       // });
  //       // console.log('tasteProfile', tasteProfileList);
  //   const newList = [
  //     ...this.state.list,
  //     ...tasteProfileList
  //   ];
  //   this.setState({
  //     list: newList,
  //     openChannelListQuery: openChannelListQuery
  //   });
  // }

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
