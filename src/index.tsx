import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from './App';
import {
    ACADEMIC_RECORDS_ROUTE, CONFIRM_ROUTE, CREATE_REQUEST_ROUTE, DIRECTOR_ROUTE, EDIT_REQUEST_ROUTE, HOME_ROUTE,
    REGISTER_ROUTE, REQUEST_ROUTE, STUDENT_REQUEST_ROUTE, SUBJECTS_ASSIGNATIONS_ROUTE,
    SUBJECTS_REQUESTS_ROUTE,
    SUBJECTS_ROUTE
} from "./utils/routes";
import Subjects from "./pages/Subjects";
import AcademicRecords from "./pages/AcademicRecords";
import SubjectsRequestsPage from "./pages/SubjectsRequestsPage";
import SubjectsAssignations from "./pages/SubjectsAssignations";
import StudentDetails from "./pages/StudentDetails";
import LoginStudentPage from "./pages/student/LoginStudentPage";
import RegisterPage from "./pages/student/RegisterPage";
import ConfirmPage from "./pages/student/ConfirmPage";
import PrivateStudentLayout from "./components/layouts/PrivateStudentLayout";
import StudentHomePage from "./pages/student/StudentHomePage";
import RequestPage from "./pages/student/request/RequestPage";
import CreateRequestPage from "./pages/student/request/CreateRequestPage";
import EditRequestPage from "./pages/student/request/EditRequestPage";
import {GlobalNotificatorProvider} from "./state/notificator";
import DirectorLayout from "./components/layouts/DirectorLayout";
import LoginDirectorPage from "./pages/director/LoginDirectorPage";
import PrivateDirectorLayout from "./components/layouts/PrivateDirectorLayout";
import DirectorHomePage from "./pages/director/DirectorHomePage";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <GlobalNotificatorProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route index element={<LoginStudentPage/>}/>
                        <Route path={REGISTER_ROUTE} element={<RegisterPage/>}/>
                        <Route path={CONFIRM_ROUTE} element={<ConfirmPage/>}/>
                        <Route element={<PrivateStudentLayout/>}>
                            <Route path={HOME_ROUTE} element={<StudentHomePage/>}/>
                            <Route path={REQUEST_ROUTE} element={<RequestPage/>}/>
                            <Route path={CREATE_REQUEST_ROUTE} element={<CreateRequestPage/>}/>
                            <Route path={EDIT_REQUEST_ROUTE} element={<EditRequestPage/>}/>
                        </Route>
                        <Route path={DIRECTOR_ROUTE} element={<DirectorLayout/>}>
                            <Route index element={<LoginDirectorPage/>}/>
                            <Route element={<PrivateDirectorLayout/>}>
                                <Route path={HOME_ROUTE} element={<DirectorHomePage/>}/>
                            </Route>
                        </Route>
                        <Route path={SUBJECTS_ROUTE} element={<Subjects/>}/>
                        <Route path={ACADEMIC_RECORDS_ROUTE} element={<AcademicRecords/>}/>
                        <Route path={SUBJECTS_REQUESTS_ROUTE} element={<SubjectsRequestsPage/>}/>
                        <Route path={SUBJECTS_ASSIGNATIONS_ROUTE} element={<SubjectsAssignations/>}/>
                        <Route path={STUDENT_REQUEST_ROUTE} element={<StudentDetails/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </GlobalNotificatorProvider>
    </React.StrictMode>
)
;

