import React, { Component } from 'react';
import sendbirdStore from '../stores/sendbirdStore';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { View, ListView, Image, Text, Platform } from 'react-native';
import {
    initChatScreen,
    createChatHandler,
    onSendButtonPress,
    getPrevMessageList,
    channelExit,
} from '../actions/chatActions';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Button } from 'react-native-elements';

import {
    sbGetOpenChannel,
    sbCreatePreviousMessageListQuery,
    sbAdjustMessageList
} from '../sendbirdActions';

export default class chatScreenContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
          previousMessageListQuery: null,
          textMessage: '',
          messageList: []
      }
    }

    componentDidMount() {
        sendbirdStore.on('message_list_update', () => {
          let newList = [];
          sendbirdStore.getMessageList().forEach((message) => {
            newList.push({
              _id: message.messageId,
              text: message.message,
              createdAt: message.createdAt,
              user: {
                _id: message._sender.userId,
                name: message._sender.userId,
                avatar: message._sender.profileUrl
              }
            });
          });
          this.setState({messageList: newList});
        });
        initChatScreen();

        const channelUrl = this.props.navigation.getParam('channelUrl');
        sbGetOpenChannel(channelUrl)
        .then((channel) => {
            this._componentInit();
        })
    }

    _componentInit = () => {
        const channelUrl = this.props.navigation.getParam('channelUrl');
        createChatHandler(channelUrl);
        this._getMessageList(true);
    }

    _onBackButtonPress = () => {
        const channelUr = this.props.navigation.getParam('channelUrl');
        channelExit(channelUrl);
    }

    componentWillReceiveProps(props) {
        const { exit } = props;
        if (exit) {
            this.props.navigation.goBack();
        }
    }

    _onTextMessageChanged = (textMessage) => {
        this.setState({ textMessage });
    }

    _getMessageList = (init) => {
        if (!this.state.previousMessageListQuery && !init) {
            return;
        }
        const channelUrl = this.props.navigation.getParam('channelUrl');
        if (init) {
            sbCreatePreviousMessageListQuery(channelUrl)
            .then((previousMessageListQuery) => {
                this.setState({ previousMessageListQuery }, () => {
                    getPrevMessageList(this.state.previousMessageListQuery);
                });
            })
            .catch((error) => this.props.navigation.goBack() );
        } else {
            getPrevMessageList(this.state.previousMessageListQuery);
        }
    }

    _onSendButtonPress = () => {
        if (this.state.textMessage) {
            const channelUrl = this.props.navigation.getParam('channelUrl');
            const { textMessage } = this.state;
            this.setState({ textMessage: '' }, () => {
                onSendButtonPress(channelUrl, textMessage);
            });
        }
    }

    renderSend(props){
      return (
        <Send {...props} >
          <View style={{marginRight: 10, marginBottom: 5}}>
            <Image style={{width:40, height:40}} source={{uri: 'https://cdn3.iconfinder.com/data/icons/mail-1-glyph/512/45-Send-512.png'}} />
          </View>
        </Send>
      );
    }

    render() {
        return (
          <View style={{flex: 1}}>
            <GiftedChat
              text={this.state.textMessage}
              onInputTextChanged={text => this._onTextMessageChanged(text)}
              messages={this.state.messageList}
              onSend={this._onSendButtonPress}
              user={{
                _id: sendbirdStore.getUserId(),
                avatar: sendbirdStore.getUser().profileUrl
              }}

              renderSend={this.renderSend}
              alwaysShowSend
            />
          {Platform.OS === 'android' ? <KeyboardSpacer topSpacing={25}/> : null }
          </View>
        )
    }
}

const styles = {
    renderTypingViewStyle: {
        flexDirection: 'row',
        marginLeft: 14,
        marginRight: 14,
        marginTop: 4,
        marginBottom: 0,
        paddingBottom: 0,
        height: 14
    },
    containerViewStyle: {
        backgroundColor: '#fff',
        flex: 1
    },
    messageListViewStyle: {
        flex: 10,
        transform: [{ scaleY: -1 }]
    },
    messageInputViewStyle: {
        flex: 1,
        marginBottom: 8,
        flexDirection: 'column',
        justifyContent: 'center'
    }
}
