import React, {useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Page, PageContent} from "grommet";
import {useAvailableSubjectsQuery, useRequestQuery} from "../services/studentService";
import RequestDetails from "../components/subjectsRequest/RequestDetails";
import RequestForm from "../components/subjectsRequest/RequestForm";
import RequestFormSuccessful from "../components/subjectsRequest/RequestFormSuccessful";

const SubjectsRequest = () => {
    const [showToast, setShowToast] = useState(false);
    const availableSubjectsQuery = useAvailableSubjectsQuery();
    const [showForm, setShowForm] = useState(false);
    const requestQuery = useRequestQuery(availableSubjectsQuery.data, setShowForm);


    const onRequestCreated = () => {
        setShowForm(false);
        setShowToast(true)
    };

    if (availableSubjectsQuery.isLoading || requestQuery.isLoading) {
        return <span> Loading.... </span>
    }

    if (availableSubjectsQuery.isError || requestQuery.isError) {
        return <span> Error :( </span>
    }

    return <Page kind="narrow">
        <PageContent>
            <Routes>
                <Route index element={
                    requestQuery.data ?
                        <RequestDetails request={requestQuery.data}/> :
                        <Navigate to="crear"/>}/>
                <Route path="crear" element={
                    showForm ?
                        <RequestForm
                            availableSubjects={availableSubjectsQuery.data}
                            onRequestCreated={onRequestCreated}/> :
                        <Navigate to="/solicitud"/>}/>
            </Routes>
            <RequestFormSuccessful setVisible={setShowToast} visible={showToast}/>
        </PageContent>
    </Page>;

};

export default SubjectsRequest;