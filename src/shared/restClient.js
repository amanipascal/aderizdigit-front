import feathers from '@feathersjs/client';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client';
import axios from 'axios';

export const feathersClient = feathers();

const restClient = rest('https://aderizdigit-backend.onrender.com');
// const restClient = rest("https://aderiz-digit.herokuapp.com");

feathersClient.configure(restClient.axios(axios));

feathersClient.configure(feathers.authentication());

feathersClient.configure(auth({ storage: window.localStorage, storageKey: "feathers-react-jwt" }));

export const loggedOut = async () => {
    const result = await feathersClient.get('authentication');
    return result ?  false : true
}

// export default feathersClient;