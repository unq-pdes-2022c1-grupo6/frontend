import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import {availableSubjectsDTO, DNI, requestDTO2} from "./fake-data";
import {GET_AVAILABLE_SUBJECTS_URL, GET_REQUEST_URL, POST_REQUEST_FORM_URL} from "./routes";

const axiosMockInstance = axios.create();
const axiosLiveInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

axiosLiveInstance.interceptors.request.use(request => {
    console.log(request);
    const token = JSON.parse(localStorage.getItem('loginStudent') || "null");
    const isStudentPrivateRoute = request?.url?.startsWith("/alumno");
    if (isStudentPrivateRoute && token) {
        request.headers = {
            ...request.headers,
            'Authorization': token
        }
    }
    return request;
});

const axiosMockAdapterInstance= new AxiosMockAdapter(axiosMockInstance, { delayResponse: 0 });

axiosMockAdapterInstance.onPost("/login").reply(200,
    {role: "director", accessToken: "aslkjfh43oqueawilfjwk4"});

axiosMockAdapterInstance.onPost("/register").reply(200,
    {role: "student", accessToken: "2krjhefosdgdfgkljdfk"});

axiosMockAdapterInstance.onGet(GET_AVAILABLE_SUBJECTS_URL + DNI).reply(200,
    availableSubjectsDTO);

axiosMockAdapterInstance.onGet(GET_REQUEST_URL + DNI).reply(200,
    requestDTO2);

axiosMockAdapterInstance.onPost(POST_REQUEST_FORM_URL + DNI).reply(200,
    requestDTO2);

export default process.env.REACT_APP_AXIOS_MOCK? axiosLiveInstance: axiosMockInstance;
