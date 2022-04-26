import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const axiosMockInstance = axios.create();
const axiosLiveInstance = axios.create();

export const axiosMockAdapterInstance= new AxiosMockAdapter(axiosMockInstance, { delayResponse: 0 });

axiosMockAdapterInstance.onPost("/login").reply(200, {
    token: {role: "student", accessToken: "aslkjfh43oqueawilfjwk4"},
});

export default process.env.REACT_APP_isAxiosMock? axiosMockInstance: axiosLiveInstance;
