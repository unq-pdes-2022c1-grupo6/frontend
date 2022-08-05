import React, {useState} from "react";
import {theme} from "./assets/theme";
import {Box, Grommet} from 'grommet';
import {Outlet} from "react-router-dom";
import ResponsiveHeader from "./components/layouts/ResponsiveHeader";
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AxiosError} from "axios";
import {useAuth} from "./state/auth";
import {useGlobalNotificator} from "./state/notificator";
import {handle400Errors, handle401or403Errors, handleGlobally} from "./utils/axios-error-handler";
import ErrorBoundary from "./state/ErrorBoundary";
import GlobalNotificator from "./components/GlobalNotificator";


const App = () => {
    const notificator = useGlobalNotificator();
    const auth = useAuth();

    const onError = (error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.response) {
                if (handleGlobally(error)) {
                    handle400Errors(error.response, notificator?.setNotification, auth?.logout);
                    handle401or403Errors(error.response, notificator?.setNotification, auth?.logout);
                }
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
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
        queryCache: new QueryCache({ onError: onError }),
        mutationCache: new MutationCache({ onError: onError }),
    }));


    return (
        <ErrorBoundary>
                <Grommet theme={theme} full>
                    <ResponsiveHeader/>
                    <GlobalNotificator {...notificator?.props}
                                       onClose={notificator?.deleteNotification}/>
                    <QueryClientProvider client={queryClient}>
                        <Outlet/>
                    </QueryClientProvider>
                    <Box pad="small">
                    </Box>
                </Grommet>
            </ErrorBoundary>
    );
};

export default App;
