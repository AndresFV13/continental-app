import { create } from 'zustand'

export const store = create( (set) => ({
    alumnos: [
        {
            nombre: "Sebastian",
            cedula: 129831092890,
            tipoLicencia: "A1, B2"
        }
    ],
    instructores: [],
    vehiculos: [],

    addAlumno: (alumno) => set((state) => ({ alumnos: [...state.alumnos, alumno] })),
    addInstructor: (instructor) => set((state) => ({ instructores: [...state.instructores, instructor] })),
    addVehiculos: (vehiculo) => set((state) => ({ vehiculos: [...state.vehiculos, vehiculo] }))
}))