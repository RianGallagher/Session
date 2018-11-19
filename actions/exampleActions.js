import dispatcher from '../dispatcher';

export function updateItems(data){
  dispatcher.dispatch({
    data: data,
    type: 'UPDATE'
  })
}
