import {useState} from "react";
import {Accordion, AccordionPanel, Box, CheckBoxGroup, CheckBoxProps, Page, PageContent, Text} from "grommet";
import {formatSubjectCourse} from "../services/dtos/subjectDTO";

const materias = [
    {
        "codigo": "90000",
        "nombre": "Inglés 1",
        "comisiones": [
            {
                "id": 8,
                "comision": 1,
                "modalidad": "PRESENCIAL",
                "horarios": [
                    {
                        "dia": "MIERCOLES",
                        "inicio": "14:00",
                        "fin": "18:00"
                    }
                ]
            }
        ]
    },
    {
        "codigo": "01035",
        "nombre": "Bases de Datos",
        "comisiones": [
            {
                "id": 1,
                "comision": 1,
                "modalidad": "PRESENCIAL",
                "horarios": [
                    {
                        "dia": "MARTES",
                        "inicio": "10:00",
                        "fin": "12:00"
                    },
                    {
                        "dia": "JUEVES",
                        "inicio": "10:00",
                        "fin": "12:00"
                    }
                ]
            },
            {
                "id": 2,
                "comision": 2,
                "modalidad": "PRESENCIAL",
                "horarios": [
                    {
                        "dia": "LUNES",
                        "inicio": "10:00",
                        "fin": "12:00"
                    },
                    {
                        "dia": "MIERCOLES",
                        "inicio": "10:00",
                        "fin": "12:00"
                    }
                ]
            }
        ]
    },
    {
        "codigo": "00487",
        "nombre": "Introducción a la Programación",
        "comisiones": [
            {
                "id": 5,
                "comision": 1,
                "modalidad": "PRESENCIAL",
                "horarios": [
                    {
                        "dia": "MARTES",
                        "inicio": "18:00",
                        "fin": "20:00"
                    },
                    {
                        "dia": "JUEVES",
                        "inicio": "18:00",
                        "fin": "22:00"
                    }
                ]
            },
            {
                "id": 6,
                "comision": 2,
                "modalidad": "PRESENCIAL",
                "horarios": [
                    {
                        "dia": "LUNES",
                        "inicio": "09:00",
                        "fin": "11:00"
                    },
                    {
                        "dia": "JUEVES",
                        "inicio": "18:00",
                        "fin": "22:00"
                    }
                ]
            }
        ]
    },
    {
        "codigo": "01032",
        "nombre": "Organización de las Computadoras",
        "comisiones": [
            {
                "id": 7,
                "comision": 1,
                "modalidad": "PRESENCIAL",
                "horarios": [
                    {
                        "dia": "LUNES",
                        "inicio": "09:00",
                        "fin": "11:00"
                    },
                    {
                        "dia": "MIERCOLES",
                        "inicio": "10:00",
                        "fin": "12:00"
                    }
                ]
            }
        ]
    }
]

const RequestForm = () => {
    const [selectionsG, setSelectionsG] = useState(new Set<number>());
    const [selectionsS, setSelectionsS] = useState(new Set<number>());

    const getSelection = (id: number) => {
        const selecG = selectionsG.has(id) ? ["G"] : undefined
        const selecS = selectionsS.has(id) ? ["S"] : undefined
        return selecG || selecS || []
    }

    const setSelection = (option: string | CheckBoxProps, id: number) => {
        if (typeof option !== "string") {
            const [setAdd, setDelete] = option.label === "G" ? [setSelectionsG, setSelectionsS] : [setSelectionsS, setSelectionsG];
            setAdd(prevState => {
                const newState = new Set(prevState);
                newState.has(id) ? newState.delete(id) : newState.add(id)
                return newState
            });
            setDelete(prevState => {
                const newState = new Set(prevState);
                newState.delete(id);
                return newState
            })
        }
    }

    return <Page kind="narrow">
        <PageContent gap="medium" justify="center">
            <Text> G: Comisiones inscriptas por el Guaraní, S: Comisiones solicitando sobrecupo </Text>
            <Box>
                <Accordion multiple gap="medium">
                    {materias.map((m) => {
                        return <AccordionPanel label={`${m.nombre} (${m.codigo})`} key={m.codigo}>
                            <Box height="xsmall">
                                {m.comisiones.map(c => {
                                    return <Box direction="row" gap="medium" margin={{vertical: "small"}} key={c.id}>
                                        <CheckBoxGroup
                                            name="radio"
                                            direction="row"
                                            options={["G", "S"]}
                                            value={getSelection(c.id)}
                                            onChange={(event) => event && setSelection(event.option, c.id)}
                                        />
                                        <Text>{formatSubjectCourse(c.comision, c.modalidad, c.horarios)}</Text>
                                    </Box>
                                })}
                            </Box>
                        </AccordionPanel>
                    })}
                </Accordion>
            </Box>
        </PageContent>
    </Page>

};

export default RequestForm;