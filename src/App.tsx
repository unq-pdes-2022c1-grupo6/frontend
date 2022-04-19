import React, {useState} from "react";
import {theme} from "./assets/theme";
import {Box, Button, Heading, Grommet, ResponsiveContext} from 'grommet';
import {Menu} from 'grommet-icons';
import Header from "./layout/Header";
import SideBar from "./layout/SideBar";


const App = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <Grommet theme={theme} full>
            <ResponsiveContext.Consumer>
                {size => (
                    <Box fill>
                        <Header>
                            <Heading level='3' margin='none'>UNQ</Heading>
                            <Button icon={<Menu/>} onClick={() => setShowSidebar(!showSidebar)}/>
                        </Header>
                        <Box direction='row' flex overflow={{horizontal: 'hidden'}}>
                            <Box flex align='center' justify='center'>
                                Página de inicio de preinscripción
                            </Box>
                            <SideBar {...{showSidebar, setShowSidebar, size}}/>
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </Grommet>
    );
};

export default App;
