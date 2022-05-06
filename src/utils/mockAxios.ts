import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const axiosMockInstance = axios.create();
const axiosLiveInstance = axios.create();

const axiosMockAdapterInstance= new AxiosMockAdapter(axiosMockInstance, { delayResponse: 0 });

axiosMockAdapterInstance.onPost("/login").reply(200,
    {role: "director", accessToken: "aslkjfh43oqueawilfjwk4"});

axiosMockAdapterInstance.onPost("/register").reply(200,
    {role: "student", accessToken: "2krjhefosdgdfgkljdfk"});

export default process.env.REACT_APP_AXIOS_MOCK? axiosMockInstance: axiosLiveInstance;
