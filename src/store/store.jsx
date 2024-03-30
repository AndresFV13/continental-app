import { create } from 'zustand'

export const store = create( (set) => ({
    alumnos: [],
    instructores: [],
    vehiculos: [],
    courses: [
        { id: 1, nombre: "A2", horas: 14 },
        { id: 2, nombre: "B1", horas: 19 },
        { id: 3, nombre: "C1", horas: 29 },
        { id: 4, nombre: "C2", horas: 14 },
        { id: 5, nombre: "C3", horas: 19 },
    ],
    addAlumno: (alumno) => set((state) => ({ alumnos: [...state.alumnos, alumno] })),
    setAlumnos: (alumnos) => set(({ alumnos })),
    addInstructor: (instructor) => set((state) => ({ instructores: [...state.instructores, instructor] })),
    addVehiculos: (vehiculo) => set((state) => ({ vehiculos: [...state.vehiculos, vehiculo] }))
}))