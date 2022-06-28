import {RequestFormType} from "../../../services/requestService";
import {useStudentSubjectsQuery} from "../../../services/subjectsService";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../../utils/routes";
import RequestForm from "../../../components/request/RequestForm";


type RequestFormPageProps = {
    selections?: RequestFormType,
    onSubmit: (selections: RequestFormType) => void,
    loading: boolean
}

const defaultSelections: RequestFormType = [new Set<number>(), new Set<number>()];

const RequestFormPage = ({selections = defaultSelections, onSubmit, loading}: RequestFormPageProps) => {
    const studentSubjectsQuery = useStudentSubjectsQuery();
    const navigate = useNavigate();

    const loading0 = studentSubjectsQuery.isLoading && loading;

    return <RequestForm
        selections={selections}
        options={studentSubjectsQuery.data}
        loading={loading0}
        onSubmit={onSubmit}
        onCancel={() => navigate("/" + HOME_ROUTE)}
    />
};

export default RequestFormPage;
