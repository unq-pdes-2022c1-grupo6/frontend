import React from "react";
import {theme} from "./assets/theme";
import {Box, Grommet} from 'grommet';
import {Outlet} from "react-router-dom";
import ResponsiveHeader from "./components/layouts/ResponsiveHeader";
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from 'react-query'
import {AxiosError} from "axios";
import GlobalNotificator from "./components/GlobalNotificator";
import {AuthProvider} from "./state/auth";
import {handleGlobally} from "./utils/validators";
import {useGlobalNotificator} from "./state/notificator";


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

    const onError = (error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.response &&
                error.response.status === 400 &&
                error.response.data && handleGlobally(error)) {
                const {error: err, message} = error.response.data;
                notificator?.setNotification(`${err} : ${message}`, "critical");
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
                <Box pad="large">
                </Box>
            </Grommet>
        </AuthProvider>
    );
};

export default App;
