import {Page, PageContent} from "grommet";
import {useState} from "react";
import SubjectsRequestForm from "../components/SubjectsRequestForm";
import SubjectsRequestSuccessful from "../components/SubjectsRequestSuccessful";
import {useGetAvailableSubjects} from "../services/subjectsRequestService";


const SubjectsRequest = () => {
    const [subjectsRequest] = useState(undefined);
    const [successfulRequest, setSuccessfulRequest] = useState(false);
    const availableSubjectsQuery = useGetAvailableSubjects();

    if (availableSubjectsQuery.isLoading) {
        return <span> Loading</span>
    }

    return <Page kind="narrow">
        <PageContent>
            {subjectsRequest && !successfulRequest &&
                (<SubjectsRequestForm
                    requestForm={subjectsRequest}
                    availableSubjects={availableSubjectsQuery.data}/>)}
            {!subjectsRequest && !successfulRequest &&
                (<SubjectsRequestForm
                    availableSubjects={availableSubjectsQuery.data}
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