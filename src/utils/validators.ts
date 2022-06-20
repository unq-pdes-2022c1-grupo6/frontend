
export const minLength = (min: number) => (word: string) => {
    return (word && word.length < min) ? `Minimo ${min} caracteres`: undefined;
}

export const maxLength = (max: number) => (word: string) => {
    return (word && word.length > max) ? `Maximo ${max} caracteres`: undefined;
}

export const maxSubjects = (max: number) => (total: number) => {
    return total > max? `Maximo ${max} a materias a solicitar`: undefined
};

export const requiredSubjects = (total: number) => {
    return total === 0 ? "No ha solicitado ninguna comisión!" : undefined;
};

export const validateDNI = {regexp: /^\d{1,3}\.?\d{3}\.?\d{3}$/, message: "DNI Invalido"};

export const validateNumber = {regexp: /^\d+$/, message: "Codigo Invalido"};
