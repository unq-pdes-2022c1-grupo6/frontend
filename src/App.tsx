import React from "react";
import {theme} from "./assets/theme";
import {Box, Footer, Grommet, Text} from 'grommet';
import {Outlet} from "react-router-dom";
import ResponsiveHeader from "./components/ResponsiveHeader";


const App = () => {

    return (
        <Grommet theme={theme} full>
            <Box>
                <ResponsiveHeader/>
                <Box height="medium">
                    <Outlet/>
                </Box>
                <Footer background="light-4" justify="center" margin={{top: "large"}} pad="medium">
                    <Text textAlign="center" size="small">
                        © 2022 UNQUE - Sistema de manejo de sobrecupos
                    </Text>
                </Footer>
            </Box>
        </Grommet>
    );
};

export default App;
