import {useMutation, useQuery} from "react-query";
import isEqual from "lodash/isEqual";
import axiosInstance from "../utils/mock-axios";
import {AxiosError} from "axios";
import {queryClient} from "../index";
import {GET_AVAILABLE_SUBJECTS_URL, GET_REQUEST_URL, POST_REQUEST_FORM_URL} from "../utils/constants";
import {DNI} from "../utils/fake-data";
import {SelectedCourses, Subject, SubjectDTO} from "./subjectDTO";
import {RequestDTO} from "./requestDTO";
import {convertToRequest} from "../model/request";
import {convertSubjectsDTO} from "../model/subject";
import {convertSelectedCourses} from "../model/course";



const getAvailableSubjects = (dni: number): Promise<SubjectDTO[]> => {
    return axiosInstance.get(GET_AVAILABLE_SUBJECTS_URL + dni)
        .then((response) => response.data)
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
};

export const useCreateRequest = (availableSubjects: Subject[], onRequestCreated: () => void) => {
    return useMutation(postRequest, {
        onSuccess: () => {
            onRequestCreated();
            queryClient.invalidateQueries(['subjectsRequest', DNI]);
        }
    });
}

export const isRequestNotFoundError = (error: unknown) => {
    return error instanceof AxiosError && isEqual(error.response?.data, {
        error: "ExcepcionUNQUE",
        message: "No se encontró ningun formulario para el cuatrimestre dado"
    });
}

const getRequest = (dni: number): Promise<RequestDTO> => {
    return axiosInstance.get(GET_REQUEST_URL + dni)
        .then((response) => response.data)
};

export const useRequestQuery = () => {
    return useQuery(['subjectsRequest', DNI],
        () => getRequest(DNI), {
            select: convertToRequest,
            retry: 2,
        });
};

