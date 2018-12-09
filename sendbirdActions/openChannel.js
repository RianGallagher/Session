import SendBird from 'sendbird';

export const sbCreateOpenChannelListQuery = () => {
    const sb = SendBird.getInstance();
    return sb.OpenChannel.createOpenChannelListQuery();
}

export const sbGetOpenChannel = (channelUrl) => {
  const sb = SendBird.getInstance();
  return new Promise((resolve, reject) => {
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if(error) {
        reject(error);
      }
      else {
        resolve(channel);
      }
    });
  });
}

export const sbOpenChannelEnter = (channel) => {
  const sb = SendBird.getInstance();
  return new Promise((resolve, reject) => {
    channel.enter((response, error) => {
      if(error) {
        reject(error);
      }
      else{
        resolve(response);
      }
    })
  });
}

export const sbGetOpenChannelList = (openChannelListQuery) => {
    return new Promise((resolve, reject) => {
        openChannelListQuery.next((channels, error) => {
            if (error) {
                reject(error);
            } else {
                resolve(channels);
            }
        });
    });
}
