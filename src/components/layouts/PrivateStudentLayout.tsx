import {useAuth} from "../../state/auth";
import {Navigate, Outlet, useOutletContext} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/routes";
import {RequestDTO} from "../../services/dtos/requestDTO";
import {useState} from "react";


const PrivateStudentLayout = () => {
    const [request, setRequest] = useState<RequestDTO| undefined>();
    const auth = useAuth();

    if (auth?.isLogged && auth?.rol === "Alumno")
        return <Outlet context={[request, setRequest]}/>

    return <Navigate to={LOGIN_ROUTE}/>

};

export const useRequest = () => {
    return useOutletContext<[RequestDTO | undefined, (requestDTO: RequestDTO | undefined) => void]>();
}

export default PrivateStudentLayout;
