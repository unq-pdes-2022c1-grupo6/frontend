// STUDENT ROUTES
export const LOGIN_ROUTE = "/"

export const REGISTER_ROUTE = "registrar"

export const CONFIRM_ROUTE = "confirmar"

export const HOME_ROUTE = "home"

export const REQUEST_ROUTE = "solicitud"

export const CREATE_REQUEST_ROUTE = "solicitud/crear"

export const EDIT_REQUEST_ROUTE = "solicitud/editar"

// DIRECTOR ROUTES

export const DIRECTOR_ROUTE = "director"

export const SUBJECTS_ROUTE = "materias"

export const STUDENTS_ROUTE = "alumnos"

export const REQUIRED_SUBJECTS = "solicitudes/materias"

export const REQUESTING_STUDENTS = "solicitudes/alumnos"

export const REQUIRED_SUBJECT = ":materia"

export const REQUESTING_STUDENT = ":dni"

export const IMPORT_ROUTE = "importar"

// deprecadas (?
export const ACADEMIC_RECORDS_ROUTE = "/historial-academico"

export const SUBJECTS_REQUESTS_ROUTE = "/solicitudes"

export const SUBJECTS_ROUTE0 = "oferta-academica"

export const SUBJECTS_ASSIGNATIONS_ROUTE = "/asignaciones"

export const STUDENT_REQUEST_ROUTE = "/alumnos/:dni/solicitud";


const privateStudentRoutes = [
    {
        to: HOME_ROUTE,
        name: "Home"
    },
    {
        to: REQUEST_ROUTE,
        name: "Mi solicitud"
    }
]

const publicStudentRoutes = [
    {
        to: "",
        name: "Inicio Sesión"
    },
    {
        to: REGISTER_ROUTE,
        name: "Registrar"
    },
    {
        to: CONFIRM_ROUTE,
        name: "Confirmar cuenta"
    },
]


const privateDirectorRoutes = [
    {
        to: DIRECTOR_ROUTE + "/" + HOME_ROUTE,
        name: "Home"
    },
    {
        to: DIRECTOR_ROUTE + "/" + SUBJECTS_ROUTE,
        name: "Materias"
    },
    {
        to: DIRECTOR_ROUTE + "/" + STUDENTS_ROUTE,
        name: "Alumnos"
    },
    {
        to: DIRECTOR_ROUTE + "/" + REQUIRED_SUBJECTS,
        name: "Materias Solicitadas"
    },
    {
        to: DIRECTOR_ROUTE + "/" + REQUESTING_STUDENTS,
        name: "Alumnos Solicitantes"
    },
    {
        to: DIRECTOR_ROUTE + "/" + IMPORT_ROUTE,
        name: "Importar"
    }
]


const studentRoutes = {
    "public": publicStudentRoutes, "private": privateStudentRoutes
}

const directorRoutes = {
    "public": [], "private": privateDirectorRoutes
}

export const getUserNav = (path: string, loggedRol: string | undefined) => {
    const [routes, rolRoute] = path.startsWith("/director") ? [directorRoutes, "Directivo"] : [studentRoutes, "Alumno"];
    return routes[loggedRol === rolRoute ? "private" : "public"]
}

export const GET_AVAILABLE_SUBJECTS_URL = "/alumnos/materias/";
export const GET_REQUEST_URL = "/alumnos/";
export const POST_REQUEST_FORM_URL = "/alumnos/solicitudes/";


