import { sbGetOpenChannel } from './openChannel';
import SendBird from 'sendbird';

export const sbCreatePreviousMessageListQuery = channelUrl => {
  return new Promise((resolve, reject) => {
    sbGetOpenChannel(channelUrl)
      .then(channel => resolve(channel.createPreviousMessageListQuery()))
      .catch(error => reject(error));
  });
};

export const sbGetMessageList = previousMessageListQuery => {
  const limit = 30;
  const reverse = true;
  return new Promise((resolve, reject) => {
    previousMessageListQuery.load(limit, reverse, (messages, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(messages);
      }
    });
  });
};

export const sbSendTextMessage = (channel, textMessage, callback) => {
  return channel.sendUserMessage(textMessage, (message, error) => {
    callback(message, error);
  });
};

export const sbAdjustMessageList = list => {
  return list.map((message, i) => {
    message['time'] = sbUnixTimestampToDate(message.createdAt);
    message.sender['isShow'] = true;
    if (message.isUserMessage() || message.isFileMessage()) {
      message['isUser'] =
        message.sender.userId === SendBird.getInstance().getCurrentUserId();
    } else {
      message['isUser'] = false;
    }

    if (i < list.length - 1) {
      let prevMessage = list[i + 1];
      if (message.isUserMessage() || message.isFileMessage()) {
        if (prevMessage.isUserMessage() || prevMessage.isFileMessage()) {
          if (prevMessage.sender.userId === message.sender.userId) {
            message.sender.isShow = false;
          }
        }
      }
    }
    return message;
  });
};

export const sbUnixTimestampToDate = unixTimestamp => {
  const today = new Date();
  const date = new Date(unixTimestamp);

  if (
    today.getMonth() !== date.getMonth() ||
    today.getDay() !== date.getDay()
  ) {
    return date.getMonth() + '/' + date.getDay();
  } else {
    const hour = '0' + date.getHours();
    const minute = '0' + date.getMinutes();
    return hour.substr(-2) + ':' + minute.substr(-2);
  }
};
