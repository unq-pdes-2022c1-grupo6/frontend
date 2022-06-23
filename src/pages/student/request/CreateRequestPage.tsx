import {useCreateRequest} from "../../../services/requestService";
import RequestFormPage from "./RequestFormPage";


const CreateRequestPage = () => {
    const createRequest = useCreateRequest();

    return <RequestFormPage
        onSubmit={(form) => createRequest.mutate(form)}
        loading={createRequest.isLoading}
    />
};

export default CreateRequestPage;
