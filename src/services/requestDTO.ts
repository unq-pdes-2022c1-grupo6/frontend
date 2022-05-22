
export interface RequestDTO {
    id: number,
    nombre: string,
    dni: number,
    resumenCursadas: unknown[]
    formulario: {
        id: number,
        estado: string,
        cuatrimestre: {
            id: number
            anio: string,
            semestre: string,
            inicioInscripciones: string,
            finInscripciones: string,
        }
        solicitudes: {
            id: number,
            estado: string,
            comisionDTO: {
                id: number,
                numero: number,
                materia: string,
                cuposTotales: number,
                sobreCuposTotales: number,
                cuposDisponibles: number
            }
        }[]
    }
}
