import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
// const auth = require('@feathersjs/authentication-client');

const socket = io(process.env.REACT_APP_API_URL, {transports: ['websocket'], forceNew: true });

const client = feathers();

client.configure(socketio(socket));

client.configure(feathers.authentication({
    storage: window.localStorage,
}));

const authenticated = async () => {
  const auth = await client.authenticate()
  return auth ? true : false
}

export default {client, authenticated }

