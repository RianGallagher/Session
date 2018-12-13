import { Alert } from 'react-native';
import dispatcher from '../sendbirdDispatcher';
import { sbConnect } from '../sendbirdActions';
import axios from 'axios';

export const sendbirdLogin = (userId, email='', password='') => {
  sbConnect(userId)
  .then((user) => {
    axios.get('http://session-native.herokuapp.com/users/username/' + userId)
    .then((res) => {
      if(res.data.length === 0){
        axios.post('http://session-native.herokuapp.com/users', {
            email: email,
            password: password,
            username: userId,
            tasteProfile: []
        })
      }
      else if(password !== 'handled_via_spotify' && (email !== '' || password!=='')) {
        Alert.alert('Oh no! Username already exists:', 'please choose a different username');
      }
    })
    dispatcher.dispatch({
      type: 'LOGIN_SUCCESS',
      payload: user
    })
  })
  .catch((error) => {
    dispatcher.dispatch({
      type: 'LOGIN_FAIL',
      payload: error
    })
  })
}
