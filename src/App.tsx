import React from "react";
import {theme} from "./assets/theme";
import {Box, Grommet} from 'grommet';
import {Outlet, useNavigate} from "react-router-dom";
import ResponsiveHeader from "./components/layouts/ResponsiveHeader";
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from 'react-query'
import {AxiosError} from "axios";
import GlobalNotificator from "./components/GlobalNotificator";
import {AuthProvider} from "./state/auth";
import {useGlobalNotificator} from "./state/notificator";
import {handle400Errors, handle401or403Errors, handleGlobally} from "./utils/axios-error-handler";


const createQueryClient = (onError: (error: unknown) => void) => {
    return new QueryClient({
        queryCache: new QueryCache({
            onError: (error) => onError(error)
        }),
        mutationCache: new MutationCache({
            onError: (error) => onError(error)
        }),
    })
}


const App = () => {
    const notificator = useGlobalNotificator();
    const navigate = useNavigate();

    const onError = (error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.response && handleGlobally(error)) {
                handle400Errors(error.response, notificator?.setNotification, navigate);
                handle401or403Errors(error.response, notificator?.setNotification, navigate);
            } else if (error.request) {
                notificator?.setNotification("La petición fue hecha pero no se recibió respuesta",
                    "warning")
            } else {
                notificator?.setNotification(`Algo paso al preparar la petición que lanzo un error:
                 ${error.message}`,
                    "critical")
            }
        }
    }

    return (
        <AuthProvider>
            <Grommet theme={theme} full>
                <ResponsiveHeader/>
                <GlobalNotificator
                    notification={notificator?.notification}
                    onCloseNotification={notificator?.deleteNotification}
                />
                <QueryClientProvider client={createQueryClient(onError)}>
                    <Outlet/>
                </QueryClientProvider>
                <Box pad="small">
                </Box>
            </Grommet>
        </AuthProvider>
    );
};

export default App;
