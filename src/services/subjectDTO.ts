
export interface HorarioDTO {
    dia: string,
    inicio: string,
    fin: string
}

export interface CourseDTO {
    id: number,
    estado?: string,
    numero?: number,
    comision?: number,
    modalidad: string,
    materia?: string,
    horarios: HorarioDTO[]
}

export interface SubjectI<CourseType> {
    codigo?: string,
    nombre: string,
    carrera?: string,
    comisiones: CourseType[]
}

export interface Course {
    id: number,
    estado?: string,
    description: string
}

export type SubjectDTO = SubjectI<CourseDTO>;

export type Subject = SubjectI<Course>

export interface SelectedCourses {
    [materia: string]: string[];
}
