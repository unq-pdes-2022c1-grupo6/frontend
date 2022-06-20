import {useAuth} from "../../state/auth";
import {Navigate, Outlet} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/routes";


const PrivateStudentLayout = () => {
    const auth = useAuth();

    if (!auth?.isStudentLogged)
        return <Navigate to={LOGIN_ROUTE}/>

    return <Outlet />

};

export default PrivateStudentLayout;
