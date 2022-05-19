import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import {availableSubjectsDTO, DNI} from "./fake-data";
import {GET_AVAILABLE_SUBJECTS_URL} from "./constants";

const axiosMockInstance = axios.create();
const axiosLiveInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const axiosMockAdapterInstance= new AxiosMockAdapter(axiosMockInstance, { delayResponse: 0 });

axiosMockAdapterInstance.onPost("/login").reply(200,
    {role: "director", accessToken: "aslkjfh43oqueawilfjwk4"});

axiosMockAdapterInstance.onPost("/register").reply(200,
    {role: "student", accessToken: "2krjhefosdgdfgkljdfk"});

axiosMockAdapterInstance.onGet(GET_AVAILABLE_SUBJECTS_URL + DNI).reply(200,
    availableSubjectsDTO);

export default process.env.REACT_APP_AXIOS_MOCK? axiosLiveInstance: axiosMockInstance;
