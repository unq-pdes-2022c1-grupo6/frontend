import {useRequest} from "../../../components/layouts/PrivateStudentLayout";
import RequestFormPage from "./RequestFormPage";
import {getSelections} from "../../../services/dtos/requestDTO";
import {useEditRequest} from "../../../services/requestService";
import isEqual from "lodash/isEqual";
import {Navigate} from "react-router-dom";
import {HOME_ROUTE} from "../../../utils/routes";


const EditRequestPage = () => {
    const editRequest = useEditRequest();
    const [request] = useRequest();

    if (!request || isEqual(request, {})) {
        return <Navigate to={"/" + HOME_ROUTE}/>
    }

    return <RequestFormPage
        onSubmit={(form) => editRequest.mutate(form)}
        loading={editRequest.isLoading}
        selections={request && getSelections(request)}
    />

};

export default EditRequestPage;
