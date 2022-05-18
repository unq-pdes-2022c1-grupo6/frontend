import axiosInstance from "../utils/mock-axios";
import {useMutation} from "react-query";
import {Course, SubjectsForm} from "../components/SubjectsRequestForm";

const postSubjectsRequest = (newCoursesForm: SubjectsForm): Promise<Course[]> => {
    return  axiosInstance.post('/solicitud', newCoursesForm).then((response) => response.data)
};

export const usePostSubjectsRequest = () => {

    return useMutation(postSubjectsRequest,{
        onSuccess: (data) => console.log(data)
    });
};