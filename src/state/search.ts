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
    let searchDTO2 = {
        pendiente: search.filter === "Pendientes" || search.filter === "Todas",
        sinProcesar: search.filter === "Sin Procesar" || search.filter === "Todas",
    }
    return {...searchDTO1, ...searchDTO2}
}