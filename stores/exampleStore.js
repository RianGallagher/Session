import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class ExampleStore extends EventEmitter {
  constructor() {
    super();
    this.thing = {
      items: [{name: 'Rian', age: 21}]
    }
  }
  updateItems(data){
    this.thing.items = data;
    this.emit('update');
  }
  getAll(){
    return this.thing;
  }
  handleActions(action){
    switch(action.type) {
      case 'UPDATE': this.updateItems(action.data); break;
      default: {
        console.log('Invalid action example');
      }
    }
  }
}

const exampleStore = new ExampleStore();
dispatcher.register(exampleStore.handleActions.bind(exampleStore));

export default exampleStore;
