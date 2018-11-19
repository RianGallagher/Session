import { eventEmitter } from 'events';
import dispatcher from '../dispatcher';

class exampleStore extends eventEmitter {
  constructer() {
    super();
    this.thing = {
      items: [{name: 'Rian', age: 21}]
    }
  }
  updateItems(data){
    this.thing.items = data;
  }
  getAll(){
    return this.thing;
  }
  handleActions(action){
    switch(action.type) {
      case: 'UPATE': this.updateItems(action.data); break;
      default: {
        console.log('Invalid action');
      }
    }
  }
}

const exampleStore = new exampleStore();
dispatcher.register(exampleStore.handleActions.bind(exampleStore));

export default exampleStore;
