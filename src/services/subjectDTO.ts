
export interface HorarioDTO {
    dia: string,
    inicio: string,
    fin: string
}

export interface CourseDTO {
    id: number,
    comision: number,
    modalidad: string,
    horarios: HorarioDTO[]
}

export interface SubjectDTO {
    codigo: string,
    nombre: string,
    comisiones: CourseDTO[]
}