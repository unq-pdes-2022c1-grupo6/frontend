import React, {useState} from "react";
import {theme} from "./assets/theme";
import {Box, Button, Heading, Grommet, ResponsiveContext, Main} from 'grommet';
import {Menu} from 'grommet-icons';
import {Routes, Route} from "react-router-dom";
import Header from "./layout/Header";
import SideBar from "./layout/SideBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubjectsRequest from "./pages/SubjectsRequest";
import Subjects from "./pages/Subjects";
import AcademicRecords from "./pages/AcademicRecords";
import SubjectsRequests from "./pages/SubjectsRequests";
import SubjectsAssignations from "./pages/SubjectsAssignations";
import PublicLayout from "./components/PublicLayout";


const App = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <Grommet theme={theme} full>
            <ResponsiveContext.Consumer>
                {size => (
                    <Box fill>
                        <Header>
                            <Heading level='3' margin='none'>UNQUE</Heading>
                            <Button icon={<Menu/>} onClick={() => setShowSidebar(!showSidebar)}/>
                        </Header>
                        <Box direction='row' flex overflow={{horizontal: 'hidden'}}>
                            <Main align="center" justify="center">
                                <Routes>
                                    <Route element={<PublicLayout />}>
                                        <Route path="/" element={<Login />} />
                                        <Route path="/registro" element={<Register />} />
                                    </Route>
                                    <Route path="/solicitud" element={<SubjectsRequest />} />
                                    <Route path="/oferta-academica" element={<Subjects />} />
                                    <Route path="/historial-academico" element={<AcademicRecords />} />
                                    <Route path="/solicitudes" element={<SubjectsRequests/>} />
                                    <Route path="/asignaciones" element={<SubjectsAssignations />} />
                                </Routes>
                            </Main>
                            <SideBar {...{showSidebar, setShowSidebar, size}}/>
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </Grommet>
    );
};

export default App;
