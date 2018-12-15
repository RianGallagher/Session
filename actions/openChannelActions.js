import dispatcher from '../sendbirdDispatcher';
import { sbGetOpenChannelList } from '../sendbirdActions';

export const getOpenChannelList = openChannelListQuery => {
  if (openChannelListQuery.hasNext) {
    sbGetOpenChannelList(openChannelListQuery)
      .then(channels => {
        dispatcher.dispatch({
          type: 'OPEN_CHANNEL_LIST_SUCCESS',
          list: channels
        });
      })
      .catch(error =>
        dispatcher.dispatch({ type: 'OPEN_CHANNEL_LIST_FAIL', error: error })
      );
  } else {
    dispatcher.dispatch({ type: OPEN_CHANNEL_LIST_FAIL });
  }
};

export const getFullOpenChannelList = openChannelListQuery => {
  hasNext = true;
  while (hasNext) {
    console.log('loop');
    sbGetOpenChannelList(openChannelListQuery)
      .then(channels => {
        dispatcher.dispatch({
          type: 'OPEN_CHANNEL_LIST_SUCCESS',
          list: channels
        });
        hasNext = openChannelListQuery.hasNext;
      })
      .catch(error =>
        dispatcher.dispatch({ type: 'OPEN_CHANNEL_LIST_FAIL', error: error })
      );
  }
};
