import React from "react";
import {theme} from "./assets/theme";
import {Grommet} from 'grommet';
import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subjects from "./pages/Subjects";
import SubjectsRequest from "./pages/SubjectsRequest";
import AcademicRecords from "./pages/AcademicRecords";
import SubjectsRequestsPage from "./pages/SubjectsRequestsPage";
import SubjectsAssignations from "./pages/SubjectsAssignations";
import PublicWrapper from "./components/PublicWrapper";
import ResponsiveHeader from "./components/ResponsiveHeader";
import {
    ACADEMIC_RECORDS_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, STUDENT_REQUEST_ROUTE,
    SUBJECTS_ASSIGNATIONS_ROUTE, SUBJECTS_REQUEST_ROUTE,
    SUBJECTS_REQUESTS_ROUTE,
    SUBJECTS_ROUTE
} from "./utils/routes";
import StudentDetails from "./pages/StudentDetails";


const App = () => {

    return (
        <Grommet theme={theme} full>
            <ResponsiveHeader/>
                <Routes>
                    <Route element={<PublicWrapper/>}>
                        <Route path={LOGIN_ROUTE} element={<Login/>}/>
                        <Route path={REGISTER_ROUTE} element={<Register/>}/>
                    </Route>
                    <Route path={SUBJECTS_REQUEST_ROUTE} element={<SubjectsRequest/>}/>
                    <Route path={SUBJECTS_ROUTE} element={<Subjects/>}/>
                    <Route path={ACADEMIC_RECORDS_ROUTE} element={<AcademicRecords/>}/>
                    <Route path={SUBJECTS_REQUESTS_ROUTE} element={<SubjectsRequestsPage/>}/>
                    <Route path={SUBJECTS_ASSIGNATIONS_ROUTE} element={<SubjectsAssignations/>}/>
                    <Route path={STUDENT_REQUEST_ROUTE} element={<StudentDetails/>}/>
                </Routes>
        </Grommet>
    );
};

export default App;
