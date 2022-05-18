import {Page, PageContent} from "grommet";
import {useState} from "react";
import {courses} from "../utils/fake-data";
import SubjectsRequestForm from "../components/SubjectsRequestForm";
import SubjectsRequestSuccessful from "../components/SubjectsRequestSuccessful";


const SubjectsRequest = () => {
    const [subjectsRequest] = useState(undefined);
    const [successfulRequest, setSuccessfulRequest] = useState(false);

    return <Page kind="narrow">
        <PageContent>
            {subjectsRequest && !successfulRequest &&
                (<SubjectsRequestForm
                    subjects={subjectsRequest}
                    coursesOptions={courses}/>)}
            {!subjectsRequest && !successfulRequest &&
                (<SubjectsRequestForm
                    coursesOptions={courses}
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