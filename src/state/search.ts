import {useState} from "react";
import get from "lodash/get";

// filter "Todas", "Pendientes", "Sin Procesar"
export type StudentSearch = {term: string, filter: string}

const initial: StudentSearch =  {term: "", filter: "Todas"};

export const useSearch = () => {
    const [search, setSearch0] = useState(initial);

    const setSearch = (key: string, value: string) => {
        setSearch0(prevState => ({...prevState, ...initial, [key]: value}))
    }

    const deleteSearch = (key: string) => {
        setSearch(key, get(initial, key))
    }

    return {search, setSearch, deleteSearch}
}

export const toStudentSearchDTO = (search: StudentSearch) => {
    const searchDTO1 = search.term === ""? {}: {dni: search.term};
    let searchDTO2 = {};
    switch (search.filter) {
        case "Todas Pendientes":
            searchDTO2 = {procesamiento: "SIN_PROCESAR"};
            break;
        case "Alguna Pendiente":
            searchDTO2 = {procesamiento: "FALTA_PROCESAR"};
            break;
        case "Solo Aprobadas y Rechazadas":
            searchDTO2 = {procesamiento: "PROCESADO"};
            break;
    }
    return {...searchDTO1, ...searchDTO2}
}
