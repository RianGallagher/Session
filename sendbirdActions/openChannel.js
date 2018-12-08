import SendBird from 'sendbird';

export const sbCreateOpenChannelListQuery = () => {
    const sb = SendBird.getInstance();
    return sb.OpenChannel.createOpenChannelListQuery();
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
