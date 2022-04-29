import React from "react";
import {messages, theme} from "./assets/grommet";
import {Box, Grommet, Main} from 'grommet';
import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubjectsRequest from "./pages/SubjectsRequest";
import Subjects from "./pages/Subjects";
import AcademicRecords from "./pages/AcademicRecords";
import SubjectsRequests from "./pages/SubjectsRequests";
import SubjectsAssignations from "./pages/SubjectsAssignations";
import PublicWrapper from "./components/PublicWrapper";
import ResponsiveHeader from "./layout/ResponsiveHeader";
import PrivateWrapper from "./components/PrivateWrapper";


const App = () => {

    return (
        <Grommet theme={theme} messages={messages} full>
            <Box fill>
                <ResponsiveHeader/>
                <Box direction='row' flex overflow={{horizontal: 'hidden'}}>
                    <Main align="center" justify="center">
                        <Routes>
                            <Route element={<PublicWrapper/>}>
                                <Route path="/" element={<Login/>}/>
                                <Route path="/registro" element={<Register/>}/>
                            </Route>
                            <Route element={<PrivateWrapper/>}>
                                <Route path="/solicitud" element={<SubjectsRequest/>}/>
                                <Route path="/oferta-academica" element={<Subjects/>}/>
                                <Route path="/historial-academico" element={<AcademicRecords/>}/>
                                <Route path="/solicitudes" element={<SubjectsRequests/>}/>
                                <Route path="/asignaciones" element={<SubjectsAssignations/>}/>
                            </Route>
                        </Routes>
                    </Main>
                </Box>
            </Box>
        </Grommet>
    );
};

export default App;
