import React, {useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Page, PageContent} from "grommet";
import {isRequestNotFoundError, useAvailableSubjectsQuery, useRequestQuery} from "../services/studentService";
import RequestDetails from "../components/subjectsRequest/RequestDetails";
import RequestForm from "../components/subjectsRequest/RequestForm";
import RequestFormSuccessful from "../components/subjectsRequest/RequestFormSuccessful";

const SubjectsRequest = () => {
    const [showToast, setShowToast] = useState(false);
    const availableSubjectsQuery = useAvailableSubjectsQuery();
    const requestQuery = useRequestQuery(availableSubjectsQuery.data);

    if (availableSubjectsQuery.isLoading || requestQuery.isLoading) {
        return <span> Loading.... </span>
    }

    if (availableSubjectsQuery.isError || (requestQuery.isError && !isRequestNotFoundError(requestQuery.error))) {
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
                    isRequestNotFoundError(requestQuery.error) ?
                        <RequestForm
                            availableSubjects={availableSubjectsQuery.data}
                            onRequestCreated={() => setShowToast(true)}/> :
                        <Navigate to="/solicitud"/>}/>
            </Routes>
            <RequestFormSuccessful setVisible={setShowToast} visible={showToast}/>
        </PageContent>
    </Page>;

};

export default SubjectsRequest;