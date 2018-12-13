// import React, { Component } from 'react';
// import ChatScreen from '../components/ChatScreen';
//
// export default class chatScreenContainer extends React.Component{
//   constructor(){
//     super();
//   }
//
//   render(){
//     return(
//       <ChatScreen />
//     )
//   }
// }

import React, { Component } from 'react';
import sendbirdStore from '../stores/sendbirdStore';
import { View, ListView } from 'react-native';
import {
  initChatScreen,
  createChatHandler,
  onSendButtonPress,
  getPrevMessageList,
  channelExit
} from '../actions/chatActions';

import { Button } from 'react-native-elements';
import { TextItem } from '../components/messages/MessageItem';
import { MessageInput } from '../components/messages/MessageInput';
import { Message } from '../components/messages/Message';

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
      messageList: ds.cloneWithRows(
        sbAdjustMessageList(sendbirdStore.getMessageList())
      )
    };
  }

  componentDidMount() {
    sendbirdStore.on('message_list_update', () => {
      this.setState({
        messageList: ds.cloneWithRows(
          sbAdjustMessageList(sendbirdStore.getMessageList())
        )
      });
    });
    initChatScreen();
    const channelUrl = this.props.navigation.getParam('channelUrl');
    sbGetOpenChannel(channelUrl).then(channel => {
      this._componentInit();
    });
  }

  _componentInit = () => {
    const channelUrl = this.props.navigation.getParam('channelUrl');
    createChatHandler(channelUrl);
    this._getMessageList(true);
  };

  _onBackButtonPress = () => {
    const channelUr = this.props.navigation.getParam('channelUrl');
    channelExit(channelUrl);
  };

  componentWillReceiveProps(props) {
    const { exit } = props;
    if (exit) {
      this.props.navigation.goBack();
    }
  }

  _onTextMessageChanged = textMessage => {
    this.setState({ textMessage });
  };

  _getMessageList = init => {
    if (!this.state.previousMessageListQuery && !init) {
      return;
    }
    const channelUrl = this.props.navigation.getParam('channelUrl');
    if (init) {
      sbCreatePreviousMessageListQuery(channelUrl)
        .then(previousMessageListQuery => {
          this.setState({ previousMessageListQuery }, () => {
            getPrevMessageList(this.state.previousMessageListQuery);
          });
        })
        .catch(error => this.props.navigation.goBack());
    } else {
      getPrevMessageList(this.state.previousMessageListQuery);
    }
  };

  _onSendButtonPress = () => {
    if (this.state.textMessage) {
      const channelUrl = this.props.navigation.getParam('channelUrl');
      const { textMessage } = this.state;
      this.setState({ textMessage: '' }, () => {
        onSendButtonPress(channelUrl, textMessage);
        this.refs.chatSection.scrollTo({ y: 0 });
      });
    }
  };

  _renderList = rowData => {
    // const { channel } = this.state;
    if (rowData.isUserMessage()) {
      return (
        <Message
          key={rowData.messageId ? rowData.messageId : rowData.reqId}
          isShow={rowData.sender.isShow}
          isUser={rowData.isUser}
          profileUrl={rowData.sender.profileUrl.replace('http://', 'https://')}
          nickname={rowData.sender.nickname}
          time={rowData.time}
          message={
            <TextItem isUser={rowData.isUser} message={rowData.message} />
          }
        />
      );
    } else {
      // FileMessage/AdminMessage
      return <View />;
    }
  };

  render() {
    return (
      <View style={styles.containerViewStyle}>
        <View style={styles.messageListViewStyle}>
          <ListView
            ref="chatSection"
            enableEmptySections={true}
            renderRow={this._renderList}
            dataSource={this.state.messageList}
            onEndReachedThreshold={-100}
          />
        </View>
        <View style={styles.messageInputViewStyle}>
          <MessageInput
            onRightPress={this._onSendButtonPress}
            textMessage={this.state.textMessage}
            onChangeText={this._onTextMessageChanged}
          />
        </View>
      </View>
    );
  }
}

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

function mapStateToProps({ chat }) {
  const { exit } = chat;
  list = ds.cloneWithRows(sbAdjustMessageList(chat.list));
  return { list, exit };
}

// export default connect(
//     mapStateToProps,
//     {
//         initChatScreen,
//         createChatHandler,
//         onSendButtonPress,
//         getPrevMessageList,
//         channelExit
//     }
// )(chatScreenContainer);

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
};
