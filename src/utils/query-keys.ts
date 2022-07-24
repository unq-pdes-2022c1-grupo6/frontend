
export const studentsKeys = {
    detail: (dni: string = "") => ["student", "detail", dni] as const,
    request: (dni: string = "") => [...studentsKeys.detail(dni), "request"] as const,
    subjects: (dni: string = "") => [...studentsKeys.detail(dni), "subjects"] as const,
    all: (search: string) => ["students", "list", search] as const,
}

export const enrollmentKeys = {
    current: ["enrollment"] as const,
    other: (year: number, semester: string) => ["enrollment", year, semester] as const,
}

export const subjectsKeys = {
    courses: (code: string) => ["subjects", "detail", code, "courses"] as const,
    courseRequesters: (code: string, courseNumber: number, search: string) =>
        ["subjects", "detail", code, "courses", "list", courseNumber, search] as const,
    requested: (search: string) => ["subjects", "list", search] as const,
    coursesOffered: (search: string) => ["courses", "list", search]
}
