import {Page, PageContent, Tab, Tabs} from "grommet";
import {useState} from "react";
import ImportStudentsPage from "./ImportStudentsPage";
import ImportSubjectsPage from "./ImportSubjectsPage";


const ImportPage = () => {
    const [activeTab, setActiveTab] = useState(0);


    return <Page kind="narrow" pad="large" align="center">
        <PageContent>
            <Tabs alignControls="start" justify="start" activeIndex={activeTab} onActive={setActiveTab}>
                <Tab title="Importación Materias">
                    <ImportSubjectsPage/>
                </Tab>
                <Tab title="Importación Alumnos">
                    <ImportStudentsPage/>
                </Tab>
            </Tabs>
        </PageContent>
    </Page>

};

export default ImportPage;
