import {useMutation, useQuery} from "react-query";
import {DNI} from "../utils/fake-data";
import axiosInstance from "../utils/mock-axios";
import {GET_AVAILABLE_SUBJECTS_URL, GET_REQUEST_URL, POST_REQUEST_FORM_URL} from "../utils/constants";
import {SelectedCourses, Subject, SubjectDTO} from "./subjectDTO";
import {RequestDTO} from "./requestDTO";
import {convertToRequest} from "../model/request";
import {convertSelectedCourses, convertSubjectsDTO} from "../model/subject";
import {queryClient} from "../index";
import {AxiosError} from "axios";
import {Dispatch, SetStateAction} from "react";
import isEqual from "lodash/isEqual";


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

const postRequest = (selectedCourses: SelectedCourses): Promise<RequestDTO> => {
    return axiosInstance.post(POST_REQUEST_FORM_URL + DNI, convertSelectedCourses(selectedCourses))
        .then((response) => {
            return response.data;
        })
        .catch(error => console.log(error));
};

export const useCreateRequest = (availableSubjects: Subject[], onRequestCreated: () => void) => {
    return useMutation(postRequest, {
        onSuccess: () => {
            onRequestCreated();
            queryClient.invalidateQueries(['subjectsRequest', DNI]);
        }
    });
}

export const isRequestNotFoundError = (error: AxiosError) => {
    return isEqual(error.response?.data, {
        error: 'ExcepcionUNQUE',
        message: 'No se encontró ningun formulario para el cuatrimestre dado'
    });
}

const getRequest = (dni: number, setShowForm: Dispatch<SetStateAction<boolean>>): Promise<RequestDTO> => {
    return axiosInstance.get(GET_REQUEST_URL + dni, {
        params: {
            anio: 2022,
            semestre: "S1"
        }
    }).then((response) => response.data)
        .catch(error => {
            if (isRequestNotFoundError(error)) {
                setShowForm(true);
            }
            console.log(error)
        });
};

export const useRequestQuery = (availableSubjects: Subject[] | undefined, setShowForm: Dispatch<SetStateAction<boolean>>) => {
    return useQuery(['subjectsRequest', DNI],
        () => getRequest(DNI, setShowForm), {
            select: (data) => {
                return typeof availableSubjects === 'undefined'
                    ? undefined
                    : convertToRequest(availableSubjects, data);
            },
            retry: 2,
            enabled: Boolean(availableSubjects)
        });
};

