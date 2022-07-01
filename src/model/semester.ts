import {SemesterDTO} from "../services/semesterService";


export const formatSemester = (semester: string) => semester === "S1" ? "1º" : "2º";

export const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-AR',
        {weekday: 'long', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric"})
}

export const getCurrentSemester = () => {
    const now = new Date();
    return {
        semester: now.getMonth() <= 7 ? "S1" : "S2",
        year: now.getFullYear()
    }
}

export class Semester {
    year: number
    semester: "S1" | "S2"
    end: Date
    start: Date

    constructor(semesterDTO: SemesterDTO) {
        this.year = semesterDTO.anio;
        this.semester = semesterDTO.semestre
        this.start = new Date(semesterDTO.inicioInscripciones + ".000Z")
        this.end = new Date(semesterDTO.finInscripciones + ".000Z")
    }

    getStart() {
        return formatDate(this.start);
    }

    getEnd() {
        return formatDate(this.end);
    }

    getSemester() {
        return formatSemester(this.semester)
    }

    isBeforePeriod() {
        return Date.now() < this.start.getTime()
    }

    isBetweenPeriod() {
        return Date.now() >= this.start.getTime() && Date.now() <= this.end.getTime()
    }

    isAfterPeriod() {
        return Date.now() > this.end.getTime()
    }

}
