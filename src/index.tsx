import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from './App';
import {
    CONFIRM_ROUTE,
    CREATE_REQUEST_ROUTE,
    DIRECTOR_ROUTE,
    EDIT_REQUEST_ROUTE,
    HOME_ROUTE,
    IMPORT_ROUTE,
    REGISTER_ROUTE,
    REQUEST_ROUTE,
    REQUESTING_STUDENT,
    REQUESTING_STUDENTS,
    REQUIRED_SUBJECT,
    REQUIRED_SUBJECTS,
    STUDENTS_ROUTE,
    SUBJECTS_ROUTE,
} from "./utils/routes";
import LoginStudentPage from "./pages/student/LoginStudentPage";
import RegisterPage from "./pages/student/RegisterPage";
import ConfirmPage from "./pages/student/ConfirmPage";
import PrivateStudentLayout from "./components/layouts/PrivateStudentLayout";
import StudentHomePage from "./pages/student/StudentHomePage";
import RequestPage from "./pages/student/request/RequestPage";
import CreateRequestPage from "./pages/student/request/CreateRequestPage";
import EditRequestPage from "./pages/student/request/EditRequestPage";
import {GlobalNotificatorProvider} from "./state/notificator";
import LoginDirectorPage from "./pages/director/LoginDirectorPage";
import PrivateDirectorLayout from "./components/layouts/PrivateDirectorLayout";
import DirectorHomePage from "./pages/director/DirectorHomePage";
import SubjectsPage from "./pages/director/SubjectsPage";
import StudentsPage from "./pages/director/StudentsPage";
import ImportPage from "./pages/director/ImportPage";
import RequiredSubjectsListPage from "./pages/director/requests/RequiredSubjectsListPage";
import RequiredSubjectPage from "./pages/director/requests/RequiredSubjectPage";
import RequestingStudentsListPage from "./pages/director/requests/RequestingStudentsListPage";
import RequestingStudentPage from "./pages/director/requests/RequestingStudentPage";
import ParentLayout from "./components/layouts/ParentLayout";

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
                        <Route path={DIRECTOR_ROUTE} element={<ParentLayout/>}>
                            <Route index element={<LoginDirectorPage/>}/>
                            <Route element={<PrivateDirectorLayout/>}>
                                <Route path={HOME_ROUTE} element={<DirectorHomePage/>}/>
                                <Route path={SUBJECTS_ROUTE} element={<SubjectsPage/>}/>
                                <Route path={STUDENTS_ROUTE} element={<StudentsPage/>}/>
                                <Route path={IMPORT_ROUTE} element={<ImportPage/>}/>
                                <Route path={REQUIRED_SUBJECTS} element={<ParentLayout/>}>
                                    <Route index element={<RequiredSubjectsListPage/>}/>
                                    <Route path={REQUIRED_SUBJECT} element={<RequiredSubjectPage/>}/>
                                </Route>
                                <Route path={REQUESTING_STUDENTS} element={<ParentLayout/>}>
                                    <Route index element={<RequestingStudentsListPage/>}/>
                                    <Route path={REQUESTING_STUDENT} element={<RequestingStudentPage/>}/>
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </GlobalNotificatorProvider>
    </React.StrictMode>
)
;

