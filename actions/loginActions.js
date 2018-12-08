import dispatcher from '../sendbirdDispatcher';
import { sbConnect } from '../sendbirdActions';
import axios from 'axios';

export const sendbirdLogin = (userId, email, password) => {
  sbConnect(userId)
  .then((user) => {
    axios.get('http://192.168.0.43:2018/users/username/' + userId)
    .then((res) => {
      if(res.data.length === 0){
        axios.post('http://192.168.0.43:2018/users', {
            email: email,
            password: password,
            username: userId
        })
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
