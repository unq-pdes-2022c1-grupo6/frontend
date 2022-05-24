import {useMutation, useQuery} from "react-query";
import {DNI} from "../utils/fake-data";
import axiosInstance from "../utils/mock-axios";
import {GET_AVAILABLE_SUBJECTS_URL, GET_REQUEST_URL, POST_REQUEST_FORM_URL} from "../utils/constants";
import {Subject, SubjectDTO} from "./subjectDTO";
import {RequestDTO} from "./requestDTO";
import {convertToRequest} from "../model/request";
import {convertSubjectsDTO} from "../model/subject";


const getAvailableSubjects = (dni: number): Promise<SubjectDTO[]> => {
    return axiosInstance.get(GET_AVAILABLE_SUBJECTS_URL + dni, {
        params: {
            anio: 2022,
            semestre: "S1"
        }
    }).then((response) => response.data)
        .catch(error => console.log(error));
};

export const useAvailableSubjectsQuery = () => {
    return useQuery(['availableSubjects', DNI],
        () => getAvailableSubjects(DNI), {
            select: (data) => convertSubjectsDTO(data),
        }
    );
};

// const postRequestForm = (newRequest: RequestForm): Promise<Object> => {
//     const requestDTO = reduce(newRequest, (acc: string[], courses) => acc.concat(courses), []);
//     return axiosInstance.post(POST_REQUEST_FORM_URL + DNI, requestDTO)
//         .then((response) => response.data)
//         .catch(error => console.log(error));
// };
//
// export const usePostRequestForm = (onSuccess: (data: Object) => void) => {
//     return useMutation(postRequestForm, {
//         onSuccess: onSuccess
//     });
// }

const getRequest = (dni: number): Promise<RequestDTO> => {
    return axiosInstance.get(GET_REQUEST_URL + dni, {
        params: {
            anio: 2022,
            semestre: "S1"
        }
    }).then((response) => response.data)
        .catch(error => console.log(error));
};

export const useRequestQuery = (availableSubjects: Subject[] | undefined) => {
    return useQuery(['subjectRequest', DNI],
            () => getRequest(DNI), {
                select: (data) => {
                    return typeof availableSubjects === 'undefined'
                        ? undefined
                        : convertToRequest(availableSubjects, data);
                },
                enabled: Boolean(availableSubjects)
            });
};

