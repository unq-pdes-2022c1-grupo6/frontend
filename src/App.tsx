import React, {useState} from "react";
import {theme} from "./assets/theme";
import {Box, Footer, Grommet, Text} from 'grommet';
import {Outlet} from "react-router-dom";
import ResponsiveHeader from "./components/ResponsiveHeader";
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from 'react-query'
import {AxiosError} from "axios";
import Error400Notification from "./components/Error400Notification";
import {AuthProvider} from "./state/auth";


const App = () => {
    const [notification, setNotification] = useState("");

    const onError = (error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.response &&
                error.response.status === 400 &&
                error.response.data) {
                const {error: err, message} = error.response.data;
                setNotification(`${err} : ${message}`)
            }
        }
    }

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
        queryCache: new QueryCache({
            onError: (error) => onError(error)
        }),
        mutationCache: new MutationCache({
            onError: (error) => onError(error)
        }),
    })

    return (
        <AuthProvider>
            <Grommet theme={theme} full>
                <Box>
                    <ResponsiveHeader/>
                    {notification &&
                        <Error400Notification
                            notification={notification}
                            onCloseNotification={() => setNotification("")}
                        />}
                    <Box height="medium">
                        <QueryClientProvider client={queryClient}>
                            <Outlet/>
                        </QueryClientProvider>
                    </Box>
                    <Footer background="light-4" justify="center" margin={{top: "xlarge"}} pad="medium">
                        <Text textAlign="center" size="small">
                            © 2022 UNQUE - Sistema de manejo de sobrecupos
                        </Text>
                    </Footer>
                </Box>
            </Grommet>
        </AuthProvider>
    );
};

export default App;
