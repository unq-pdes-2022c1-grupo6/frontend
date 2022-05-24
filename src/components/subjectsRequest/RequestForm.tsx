import React from 'react';
import SubjectsRequestForm from "./SubjectsRequestForm";
import {SelectedCourses, Subject} from "../../services/subjectDTO";

type RequestFormType = {
    availableSubjects: Subject[],
    onFormCreated: () => void
}

const RequestForm = ({availableSubjects, onFormCreated} : RequestFormType) => {

    const onSubmit = (ss: SelectedCourses) => {
        console.log(ss);
        onFormCreated()
    }

    return <SubjectsRequestForm subjectsOptions={availableSubjects} onSubmit={onSubmit}/>
};

export default RequestForm;