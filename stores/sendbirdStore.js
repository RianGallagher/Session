import { EventEmitter } from 'events';
import dispatcher from '../sendbirdDispatcher';

class SendbirdStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      error: '',
      user: null
    }
  }
  setUser(user){
    this.state = {...this.state, user: user};
    this.emit('user_updated');
  }
  getToken() {
    return this.tokens.token;
  }
  getAll(){
    return this.tokens;
  }
  handleActions(action){
    switch(action.type) {
      case 'LOGIN_SUCCESS': this.setUser(action.payload); break;
      default: {
        console.log(typeof action, 'Invalid action');
      }
    }
  }
}

const sendbirdStore = new SendbirdStore();
dispatcher.register(sendbirdStore.handleActions.bind(sendbirdStore));

export default sendbirdStore;
