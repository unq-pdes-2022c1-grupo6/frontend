import {useState} from "react";
import {useOfferedCoursesQuery} from "../../services/courseService";
import {useAddCourseToRequest} from "../../services/requestService";
import {Box} from "grommet";
import RequestsSearchBar from "../request/RequestsSearchBar";
import AvailableCoursesTable from "./AvailableCoursesTable";

type AddCourseFormProps = {
    excluding: (string | number)[],
    dni?: number,
    onCloseModal: () => void
}


const AddCourseForm = ({excluding, dni, onCloseModal}: AddCourseFormProps) => {
    const [search, setSearch] = useState("");
    const availableCoursesQuery = useOfferedCoursesQuery(excluding, search);
    const addCourseToRequest = useAddCourseToRequest(dni);


    return <Box pad="medium" gap="medium">
        <RequestsSearchBar
            placeholder="Buscar por Nombre de Materia...."
            searchTerm={search}
            onSearch={setSearch}
            onCancel={() => setSearch("")}/>
        <Box width="large">
            <AvailableCoursesTable
                content={availableCoursesQuery.data || []}
                onClickRow={(id) => {
                    dni && addCourseToRequest.mutate({dni, id}, {
                        onSettled: () => onCloseModal()
                    })
                }}
            />
        </Box>
    </Box>

};

export default AddCourseForm;
