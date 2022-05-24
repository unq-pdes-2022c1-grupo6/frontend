import React from 'react';
import SubjectsRequestForm from "./SubjectsRequestForm";
import {Subject} from "../../services/subjectDTO";
import {useCreateRequest} from "../../services/studentService";

type RequestFormType = {
    availableSubjects: Subject[],
    onRequestCreated: () => void
}

const RequestForm = ({availableSubjects, onRequestCreated} : RequestFormType) => {
    const mutation  = useCreateRequest(availableSubjects, onRequestCreated);

    if (mutation.isLoading) {
        return <span> Loading.... </span>
    }

    if (mutation.isError) {
        return <span> Error :( </span>
    }

    return <SubjectsRequestForm subjectsOptions={availableSubjects} onSubmit={mutation.mutate}/>
};

export default RequestForm;