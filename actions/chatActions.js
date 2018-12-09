import dispatcher from '../sendbirdDispatcher';
import SendBird from 'sendbird'
import {
    sbGetOpenChannel,
    sbOpenChannelEnter,
    sbGetMessageList,
    sbSendTextMessage,
    sbOpenChannelExit
} from '../sendbirdActions';

export const initChatScreen = () => {
    const sb = SendBird.getInstance();
    sb.removeAllChannelHandlers();
    return { type: 'INIT_CHAT_SCREEN' }
}

export const getPrevMessageList = (previousMessageListQuery) => {
  if (previousMessageListQuery.hasMore) {
      sbGetMessageList(previousMessageListQuery)
      .then((messages) => {
          dispatcher.dispatch({
              type: 'MESSAGE_LIST_SUCCESS',
              list: messages
          });
      })
      .catch( (error) => dispatcher.dispatch({ type: 'MESSAGE_LIST_FAIL' }) )
  } else {
      dispatcher.dispatch({ type: 'MESSAGE_LIST_FAIL' });
  }
}

export const createChatHandler = (channelUrl) => {
  sbGetOpenChannel(channelUrl)
  .then((channel) => {
      sbOpenChannelEnter(channel)
      .then((channel) => {
          // dispatcher.dispatch({ type: 'CREATE_CHAT_HANDLER_SUCCESS' });
          registerHandler(channelUrl);
      })
      .catch( (error) => dispatcher.dispatch({ type: 'CREATE_CHAT_HANDLER_FAIL' }) );
  })
  .catch( (error) => dispatcher.dispatch({ type: 'CREATE_CHAT_HANDLER_FAIL' }) );
}

const registerHandler = (channelUrl) => {
    const sb = SendBird.getInstance();
    let channelHandler = new sb.ChannelHandler();

    channelHandler.onMessageReceived = (channel, message) => {
        if (channel.url === channelUrl) {
            dispathcer.dispatch({
                type: 'MESSAGE_RECEIVED',
                payload: message
            })
        }
    }
    channelHandler.onMessageUpdated = (channel, message) => {
        if (channel.url === channelUrl) {
            dispathcer.dispatch({
                type: 'MESSAGE_UPDATED',
                payload: message
            })
        }
    }
    channelHandler.onMessageDeleted = (channel, messageId) => {
        if (channel.url === channelUrl) {
            dispathcer.dispatch({
                type: 'MESSAGE_DELETED',
                payload: messageId
            })
        }
    }

    sb.addChannelHandler(channelUrl, channelHandler);
}

export const onSendButtonPress = (channelUrl, textMessage) => {
  sbGetOpenChannel(channelUrl)
  .then((channel) => {
      const messageTemp = sbSendTextMessage(channel, textMessage, (message, error) => {
          if (error) {
              dispathcer.dispatch({ type: 'SEND_MESSAGE_FAIL' });
          } else {
              dispatcher.dispatch({
                  type: 'SEND_MESSAGE_SUCCESS',
                  message: message
              });
          }
      });
      dispatcher.dispatch({
          type: 'SEND_MESSAGE_TEMPORARY',
          message: messageTemp
      });
  })
  .catch( (error) => dispatcher.dispatch({ type: 'SEND_MESSAGE_FAIL' }) )
}

export const channelExit = (channelUrl) => {
  sbGetOpenChannel(channelUrl)
  .then((channel) => {
      sbOpenChannelExit(channel)
      .then((response) => dispatcher.dispatch({ type: 'CHANNEL_EXIT_SUCCESS' }))
      .catch((error) => dispatcher.dispatch({ type: 'CHANNEL_EXIT_FAIL' }))
  })
  .catch((error) => dispatcher.dispatch({ type: 'CHANNEL_EXIT_FAIL' }))
}
