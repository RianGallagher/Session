import dispatcher from '../dispatcher';

export function setToken(token){
  dispatcher.dispatch({
    token: token,
    type: 'SET_TOKEN'
  })
}
