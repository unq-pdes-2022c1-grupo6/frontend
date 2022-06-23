
export interface RequestDTO {
    id: number,
    dniAlumno: number,
    solicitudes: RequestCourseDTO[],
    "comisionesInscripto": CourseDTO[],
    estado: "CERRADO" | "ABIERTO"
}

export interface RequestCourseDTO {
    id: number,
    estado: "PENDIENTE" | "APROBADO" | "RECHAZADO",
    comision: CourseDTO
}

export interface CourseDTO {
    id: number,
    numero: number,
    materia: string,
    modalidad: "PRESENCIAL" | "VIRTUAL" | "SEMIPRESENCIAL",
    sobrecuposTotales: number,
    sobrecuposDisponibles: number,
    horarios: HourDTO[]
}

export interface HourDTO {
    dia: string,
    inicio: string,
    fin: string
}
