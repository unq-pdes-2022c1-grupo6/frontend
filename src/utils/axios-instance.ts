import axios from 'axios';

const axiosLiveInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

axiosLiveInstance.interceptors.request.use(request => {
    const login = JSON.parse(localStorage.getItem('login') || "null");
    const isStudentPrivateRoute = request?.url?.startsWith("/alumno/");
    const isDirectorPrivateRoute = !request?.url?.startsWith("/auth") && !isStudentPrivateRoute;
    if (((isStudentPrivateRoute && login?.rol === "Alumno") ||
        (isDirectorPrivateRoute && login?.rol === "Directivo"))
        && login?.token) {
        request.headers = {
            ...request.headers,
            'Authorization': login.token
        }
    }
    return request;
});


export default axiosLiveInstance;
