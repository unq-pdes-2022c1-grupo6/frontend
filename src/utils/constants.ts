export const LOGIN_ROUTE = "/"

export const REGISTER_ROUTE = "/registro"

export const SUBJECTS_REQUEST_ROUTE = "/solicitud/*"

export const ACADEMIC_RECORDS_ROUTE = "/historial-academico"

export const SUBJECTS_REQUESTS_ROUTE = "/solicitudes"

export const SUBJECTS_ROUTE = "/oferta-academica"

export const SUBJECTS_ASSIGNATIONS_ROUTE = "/asignaciones"

export const STUDENT_DETAILS_ROUTE = "/alumnos"

export const DIRECTOR_NAV = [
    {
        to: ACADEMIC_RECORDS_ROUTE,
        name: "Historial académico"
    },
    {
        to: SUBJECTS_ROUTE,
        name: "Oferta académica"
    },
    {
        to: SUBJECTS_REQUESTS_ROUTE,
        name: "Solicitudes"
    },
    {
        to: SUBJECTS_ASSIGNATIONS_ROUTE,
        name: "Asignaciones"
    }
]

export const GET_AVAILABLE_SUBJECTS_URL = "/alumnos/materias/";
export const GET_REQUEST_URL = "/alumnos/";
export const POST_REQUEST_FORM_URL = "/alumnos/solicitudes/";
