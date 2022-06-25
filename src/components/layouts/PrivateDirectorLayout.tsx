import {Navigate, Outlet} from "react-router-dom";
import {DIRECTOR_ROUTE} from "../../utils/routes";
import {useAuth} from "../../state/auth";

const PrivateDirectorLayout = () => {
    const auth = useAuth();

    if (auth?.isLogged && auth?.rol === "Directivo")
        return <Outlet/>

    return <Navigate to={"/" + DIRECTOR_ROUTE}/>

};

export default PrivateDirectorLayout;