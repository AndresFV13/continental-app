import { create } from 'zustand'

export const store = create( (set) => ({
    alumnos: [],
    instructores: [],
    vehiculos: [],

    addAlumno: (alumno) => set((state) => ({ alumnos: [...state.alumnos, alumno] })),
    addInstructor: (instructor) => set((state) => ({ instructores: [...state.instructores, instructor] })),
    addVehiculos: (vehiculo) => set((state) => ({ vehiculos: [...state.vehiculos, vehiculo] }))
}))