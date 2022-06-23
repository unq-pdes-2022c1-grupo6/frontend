import {useAuth} from "../../state/auth";
import {Navigate, Outlet, useOutletContext} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/routes";
import {useRequestQuery} from "../../services/requestService";
import {RequestDTO} from "../../services/dtos/requestDTO";
import {UseQueryResult} from "react-query";


const PrivateStudentLayout = () => {
    const auth = useAuth();
    const requestQuery = useRequestQuery(auth?.isStudentLogged);

    if (!auth?.isStudentLogged)
        return <Navigate to={LOGIN_ROUTE}/>

    return <Outlet context={{requestQuery}}/>

};

export const useRequest = () => {
    return useOutletContext<{ request: UseQueryResult<RequestDTO, unknown> }>();
}

export default PrivateStudentLayout;
