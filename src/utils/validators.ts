
export const minLength = (min: number) => (word: string) => {
    return (word && word.length < min) ? `Minimo ${min} caracteres`: undefined;
}

export const maxLength = (max: number) => (word: string) => {
    return (word && word.length > max) ? `Maximo ${max} caracteres`: undefined;
}
