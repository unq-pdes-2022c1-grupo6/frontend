import {Box, Button, FileInput, Page, PageContent, Tab, Tabs} from "grommet";
import {useState} from "react";
import Papa from 'papaparse';


const ImportPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [file, setFile] = useState<File | undefined>();

    return <Page kind="narrow" pad="large" align="center">
        <PageContent>
            <Tabs alignControls="start" justify="start" activeIndex={activeTab} onActive={setActiveTab}>
                <Tab title="Alumnos">
                    <Box pad="small">
                        <FileInput
                            onChange={(event, value) => {
                                if (value?.files) {
                                    const newFile = Object.values(value.files)[0];
                                    setFile(newFile);
                                    console.log(newFile);
                                }
                            }}/>
                        <Button onClick={() => {
                            if (file) {
                                Papa.parse(file, {
                                    complete: (data) => console.log(data)
                                })
                            }
                        }}/>
                    </Box>
                </Tab>
            </Tabs>
        </PageContent>
    </Page>

};

export default ImportPage;
