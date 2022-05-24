import React, {useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Page, PageContent} from "grommet";
import {useAvailableSubjectsQuery, useRequestQuery} from "../services/studentService";
import RequestDetails from "../components/subjectsRequest/RequestDetails";
import RequestForm from "../components/subjectsRequest/RequestForm";
import RequestFormSuccessful from "../components/subjectsRequest/RequestFormSuccessful";

const SubjectsRequest = () => {
    const [showRequestCreated, setShowRequestCreated] = useState(false);
    const availableSubjectsQuery = useAvailableSubjectsQuery();
    const requestQuery = useRequestQuery(availableSubjectsQuery.data);

    const showDetails = () => requestQuery.data && !showRequestCreated;
    const showForm = () => {
        console.log(requestQuery.error);
        return requestQuery.isError && !showRequestCreated;
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
                <Route path="/" element={
                    showForm() ?
                        <RequestDetails request={requestQuery.data!}/> :
                        <Navigate to="crear"/>}/>
                <Route path="crear" element={
                    showDetails() ?
                        <RequestForm
                            availableSubjects={availableSubjectsQuery.data!}
                            onRequestCreated={() => setShowRequestCreated(true)}/> :
                        <Navigate to="/"/>}/>
                <Route path="exitosa" element={
                    showRequestCreated ?
                        <RequestFormSuccessful onClick={() => setShowRequestCreated(false)}/> :
                        <></>}/>
            </Routes>
        </PageContent>
    </Page>;

};

export default SubjectsRequest;