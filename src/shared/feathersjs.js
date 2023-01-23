import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';


console.log('process.env.REACT_APP_API_URL : ', process.env.REACT_APP_API_URL)
const socket = io('https://aderizdigit-backend.onrender.com', {
  transports: ['websocket'],
  forceNew: true
});

export const client = feathers();

client.configure(socketio(socket));
client.configure(authentication({
  storage: window.localStorage
}));


export const authenticated = async () => {
  const auth = await client.authenticate()
  localStorage.setItem('auth', JSON.stringify(auth))
  return auth ? true : false
}



