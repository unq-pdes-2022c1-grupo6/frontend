import {useState} from "react";
import {useAvailableCoursesQuery} from "../../services/courseService";
import {SetRequestFn, useAddCourseToRequest} from "../../services/requestService";
import {getCurrentSemester} from "../../model/semester";
import {Box} from "grommet";
import RequestsSearchBar from "../subjectsRequests/RequestsSearchBar";
import AvailableCoursesTable from "./AvailableCoursesTable";

type AddCourseFormProps = {
    excluding: (string | number)[],
    dni?: number,
    onAddCourse: SetRequestFn
}


const AddCourseForm = ({excluding, dni, onAddCourse}: AddCourseFormProps) => {
    const {year, semester} = getCurrentSemester();
    const [search, setSearch] = useState("");
    const availableCoursesQuery = useAvailableCoursesQuery(excluding, year, semester, search);
    const addCourseToRequest = useAddCourseToRequest(dni, onAddCourse);


    return <Box pad="medium" height="medium" overflow="auto" gap="medium">
        <RequestsSearchBar
            placeholder={"Buscar por Nombre de Materia...."}
            searchTerm={search}
            onSearch={(value) => setSearch(value)}
            onCancel={() => setSearch("")}/>
        <Box width="large">
            <AvailableCoursesTable
                content={availableCoursesQuery.data || []}
                onClickRow={(id) => {
                    dni && addCourseToRequest.mutate({dni, id})
                }}
            />
        </Box>
    </Box>

};

export default AddCourseForm;
