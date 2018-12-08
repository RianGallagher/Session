import dispatcher from '../sendbirdDispatcher';
import { sbGetOpenChannelList } from '../sendbirdActions';

export const getOpenChannelList = (openChannelListQuery) => {
  if (openChannelListQuery.hasNext) {
      sbGetOpenChannelList(openChannelListQuery)
      .then((channels) => {
        dispatcher.dispatch({
          type: 'OPEN_CHANNEL_LIST_SUCCESS',
          list: channels
        })
      })
      .catch((error) => dispatcher.dispatch({ type: 'OPEN_CHANNEL_LIST_FAIL' }))
  } else {
      dispatch({ type: OPEN_CHANNEL_LIST_FAIL });
  }
}
