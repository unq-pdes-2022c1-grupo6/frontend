
export const minLength = (n: number) => (word: string) => {
    return (word && word.length < n) ? `Minimo ${n} caracteres`: undefined;
}

export const maxLength = (n: number) => (word: string) => {
    return (word && word.length > n) ? `Maximo ${n} caracteres`: undefined;
}
