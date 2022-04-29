import {useAuth} from "../state/auth";
import {Navigate, Outlet} from "react-router-dom";

const PrivateWrapper = () => {
    const auth = useAuth();

    if (!auth?.logged_in)
        return <Navigate to="/"/>

    return <Outlet />
};

export default PrivateWrapper;