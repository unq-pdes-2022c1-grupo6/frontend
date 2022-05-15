import React from "react";
import {theme} from "./assets/theme";
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
import {
    ACADEMIC_RECORDS_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE,
    SUBJECTS_ASSIGNATIONS_ROUTE, SUBJECTS_REQUEST_ROUTE,
    SUBJECTS_REQUESTS_ROUTE,
    SUBJECTS_ROUTE
} from "./utils/constants";


const App = () => {

    return (
        <Grommet theme={theme} full>
            <Box fill>
                <ResponsiveHeader/>
                <Main align="center" justify="center">
                    <Routes>
                        <Route element={<PublicWrapper/>}>
                            <Route path={LOGIN_ROUTE} element={<Login/>}/>
                            <Route path={REGISTER_ROUTE} element={<Register/>}/>
                        </Route>
                        <Route element={<PrivateWrapper/>}>
                            <Route path={SUBJECTS_REQUEST_ROUTE} element={<SubjectsRequest/>}/>
                            <Route path={SUBJECTS_ROUTE} element={<Subjects/>}/>
                            <Route path={ACADEMIC_RECORDS_ROUTE} element={<AcademicRecords/>}/>
                            <Route path={SUBJECTS_REQUESTS_ROUTE} element={<SubjectsRequests/>}/>
                            <Route path={SUBJECTS_ASSIGNATIONS_ROUTE} element={<SubjectsAssignations/>}/>
                        </Route>
                    </Routes>
                </Main>
            </Box>
        </Grommet>
    );
};

export default App;
