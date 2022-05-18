import {Page, PageContent} from "grommet";
import {useState} from "react";
import {courses, subjectsRequest} from "../utils/fake-data";
import SubjectsRequestForm from "../components/SubjectsRequestForm";


const SubjectsRequest = () => {
    const [subjectsRequest, setSubjectsRequest] = useState(undefined);

    return <Page kind="narrow">
            <PageContent>
                {subjectsRequest &&
                    (<SubjectsRequestForm
                        subjects={subjectsRequest}
                        coursesOptions={courses}/>)}
                {!subjectsRequest &&
                    (<SubjectsRequestForm
                        coursesOptions={courses}
                        onSubmit={(srf) => console.log(srf)}/>)}
            </PageContent>
        </Page>;
};

export default SubjectsRequest;