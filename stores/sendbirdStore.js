import { EventEmitter } from 'events';
import dispatcher from '../sendbirdDispatcher';
import spotifyStore from './spotifyStore';

class SendbirdStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      error: '',
      user: null,
      list: [],
      messageList: []
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
  setMessageList(list){
    this.state = {...this.state, messageList: list}
    this.emit('message_list_update');
  }
  setSuccessMessage(newMessage){
    this.state = {...this.state, messageList: [...[newMessage], ...this.state.messageList]}
    this.emit('message_list_update');
  }
  setReceiveMessage(newMessage){
    this.state = {...this.state, messageList: [...[newMessage]], ...this.state.messageList};
    this.emit('message_list_update');
  }
  setUpdateMessage(updatedMessage){
    const updatedList = this.state.messageList.map((message) => {
      if (message.messageId === updatedMessage.messageId) {
          message = updatedMessage
      }
      return message
    });
    this.state = {...this.state, messageList: updatedList};
    this.emit('message_list_update');
  }
  setDeleteMessage(deletedMessage){
    const deletedList = this.state.messageList.filter((message) => {
      return message.messageId.toString() !== deletedMessage.toString();
    });
    this.state = {...this.state, messageList: deletedList};
    this.emit('message_list_update');
  }

  getUser(){
    return this.state.user;
  }
  getUserId(){
    return this.state.user.userId;
  }
  getOpenChannelList(){
    return this.state.list;
  }
  getMessageList(){
    return this.state.messageList;
  }
  getAll(){
    return this.state;
  }

  handleActions(action){
    switch(action.type) {
      case 'LOGIN_SUCCESS': this.setUser(action.payload); break;
      case 'OPEN_CHANNEL_LIST_SUCCESS': this.setOpenChannels(action.list); break;
      case 'MESSAGE_LIST_SUCCESS': this.setMessageList(action.list); break;
      case 'SEND_MESSAGE_SUCCESS': this.setSuccessMessage(action.message); break;
      case 'MESSAGE_RECEIVED': this.setReceiveMessage(action.payload); break;
      case 'MESSAGE_UPDATED': this.setUpdateMessage(action.payload); break;
      case 'MESSAGE_DELETED': this.setDeleteMessage(action.payload); break;
      default: {
        console.log(typeof action, 'Invalid action: ', action.type, ' error: ', action.error);
      }
    }
  }
}

const sendbirdStore = new SendbirdStore();
dispatcher.register(sendbirdStore.handleActions.bind(sendbirdStore));

export default sendbirdStore;
