import {useRequest} from "../../../components/layouts/PrivateStudentLayout";
import RequestFormPage from "./RequestFormPage";
import {getSelections} from "../../../services/dtos/requestDTO";
import {useEditRequest} from "../../../services/requestService";


const EditRequestPage = () => {
    const editRequest = useEditRequest();
    const {request} = useRequest();

    return <RequestFormPage
        onSubmit={(form) => editRequest.mutate(form)}
        loading={editRequest.isLoading}
        selections={request.data && getSelections(request.data)}
    />

};

export default EditRequestPage;
