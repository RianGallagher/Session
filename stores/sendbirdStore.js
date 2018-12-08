import { EventEmitter } from 'events';
import dispatcher from '../sendbirdDispatcher';

class SendbirdStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      error: '',
      user: null,
      list: []
    }
  }
  setUser(user){
    this.state = {...this.state, user: user};
    this.emit('user_update');
  }
  setOpenChannels(list){
    this.state = {...this.state, list: list}
    this.emit('open_channel_list_update');
  }

  getUserId(){
    return this.state.user.userId;
  }
  getOpenChannelList(){
    return this.state.list;
  }
  getAll(){
    return this.state;
  }

  handleActions(action){
    switch(action.type) {
      case 'LOGIN_SUCCESS': this.setUser(action.payload); break;
      case 'OPEN_CHANNEL_LIST_SUCCESS': this.setOpenChannels(action.list); break;
      default: {
        console.log(typeof action, 'Invalid action: ', action.type, ' error: ', action.error);
      }
    }
  }
}

const sendbirdStore = new SendbirdStore();
dispatcher.register(sendbirdStore.handleActions.bind(sendbirdStore));

export default sendbirdStore;
