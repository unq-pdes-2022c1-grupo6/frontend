import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from "../state/auth";

const PublicLayout = () => {
    const auth = useAuth();

    if (auth?.logged_in && auth?.role === "student")
        return <Navigate to="/solicitud" replace />

    if (auth?.logged_in && auth?.role === "director")
        return <Navigate to="/solicitudes" replace />

    return <Outlet />
};

export default PublicLayout;