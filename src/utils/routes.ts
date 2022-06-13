export const LOGIN_ROUTE = "/"

export const REGISTER_ROUTE = "/registro"

export const SUBJECTS_REQUEST_ROUTE = "/solicitud/*"

export const ACADEMIC_RECORDS_ROUTE = "/historial-academico"

export const SUBJECTS_REQUESTS_ROUTE = "/solicitudes"

export const SUBJECTS_ROUTE = "/oferta-academica"

export const SUBJECTS_ASSIGNATIONS_ROUTE = "/asignaciones"

export const STUDENT_REQUEST_ROUTE = "/alumnos/:dni/solicitud";

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
        name: "Solicitudes",
        menu: [
            {
                name: "Ver por Materias",
                to: "?agrupar-por=materias"
            },
            {
                name: "Ver por Alumnos",
                to: "?agrupar-por=alumnos"
            }
        ]
    },
    {
        to: SUBJECTS_ASSIGNATIONS_ROUTE,
        name: "Asignaciones"
    }
]

export const GET_AVAILABLE_SUBJECTS_URL = "/alumnos/materias/";
export const GET_REQUEST_URL = "/alumnos/";
export const POST_REQUEST_FORM_URL = "/alumnos/solicitudes/";


