import {useAuth} from "../state/auth";
import {Navigate, Outlet} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/routes";

const PrivateWrapper = () => {
    const auth = useAuth();

    if (!auth?.logged_in)
        return <Navigate to={LOGIN_ROUTE}/>

    return <Outlet />
};

export default PrivateWrapper;