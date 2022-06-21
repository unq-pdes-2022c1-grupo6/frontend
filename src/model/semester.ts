import {SemesterDTO} from "../services/semesterService";

export class Semester {
    year: number
    semester: "S1" | "S2"
    end: Date
    start: Date

    constructor(semesterDTO: SemesterDTO) {
        this.year = semesterDTO.anio;
        this.semester = semesterDTO.semestre
        this.start = new Date(semesterDTO.inicioInscripciones)
        this.end = new Date(semesterDTO.finInscripciones)
    }

    getStart() {
        return this.start.toLocaleDateString('es-AR', {day: "numeric", weekday:"long", month:"long"})
    }

    getEnd() {
        return this.end.toLocaleDateString('es-AR', {day: "numeric", weekday:"long", month:"long"})
    }

    getSemester() {
        return this.semester === "S1"? "1º": "2º"
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