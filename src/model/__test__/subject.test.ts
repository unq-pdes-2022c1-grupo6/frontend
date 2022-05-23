import {convertToSubjects, SubjectsType} from "../subject";
import {availableSubjectsDTO} from "../../utils/fake-data";

const convertedSubjects: SubjectsType = {
    'Bases de Datos (01035)': [
        {
            id: '1',
            description: '1 - (Presencial) Martes 10:00 a 12:00 - Jueves 10:00 a 12:00 '
        },
        {
            id: '2',
            description: '2 - (Presencial) Lunes 10:00 a 12:00 - Miercoles 10:00 a 12:00 '
        }
    ]
};


describe('convertToSubjects', () => {

    it("devuelve las materias convertidas en un objeto de tipo SubjectsType", () => {

        expect(convertToSubjects(availableSubjectsDTO)).toStrictEqual(convertedSubjects)
    });

});