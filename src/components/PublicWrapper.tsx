import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from "../state/auth";
import {SUBJECTS_REQUEST_ROUTE, SUBJECTS_REQUESTS_ROUTE} from "../utils/routes";

const PublicWrapper = () => {
    const auth = useAuth();

    if (auth?.logged_in && auth?.role === "student")
        return <Navigate to={SUBJECTS_REQUEST_ROUTE}/>

    if (auth?.logged_in && auth?.role === "director")
        return <Navigate to={SUBJECTS_REQUESTS_ROUTE}/>

    return <Outlet />
};

export default PublicWrapper;