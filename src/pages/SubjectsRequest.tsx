import {Page, PageContent} from "grommet";
import {useState} from "react";
import SubjectsRequestForm from "../components/SubjectsRequestForm";
import SubjectsRequestSuccessful from "../components/SubjectsRequestSuccessful";
import {availableSubjects} from "../services/subjectsRequestService";


const SubjectsRequest = () => {
    const [subjectsRequest] = useState(undefined);
    const [successfulRequest, setSuccessfulRequest] = useState(false);

    return <Page kind="narrow">
        <PageContent>
            {subjectsRequest && !successfulRequest &&
                (<SubjectsRequestForm
                    requestForm={subjectsRequest}
                    availableSubjects={availableSubjects}/>)}
            {!subjectsRequest && !successfulRequest &&
                (<SubjectsRequestForm
                    availableSubjects={availableSubjects}
                    onSubmit={(srf) => {
                        console.log(srf);
                        setSuccessfulRequest(true)
                    }}/>)}
            {successfulRequest &&
                (<SubjectsRequestSuccessful
                    onClick={() => setSuccessfulRequest(false)}/>)}
        </PageContent>
    </Page>;
};

export default SubjectsRequest;