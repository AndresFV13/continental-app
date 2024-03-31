import { create } from 'zustand'

export const store = create( (set) => ({
    alumnos: [],
    maestros: [],
    vehiculos: [],
    courses: [
        { id: 1, nombre: "A2", horas: 14 },
        { id: 2, nombre: "B1", horas: 19 },
        { id: 3, nombre: "C1", horas: 29 },
        { id: 4, nombre: "C2", horas: 14 },
        { id: 5, nombre: "C3", horas: 19 },
    ],
    addAlumno: (alumno) => set((state) => ({ alumnos: [...state.alumnos, alumno] })),
    updateAlumno: (alumno) => set((state) => ({ alumnos: [...state.alumnos].map(student => student.id === alumno.id ? alumno : student) })),
    setAlumnos: (alumnos) => set(({ alumnos })),

    addMaestro: (maestro) => set((state) => ({ maestros: [...state.maestros, maestro] })),
    updateMaestro: (maestro) => set((state) => ({ maestros: [...state.maestros].map(instructor => instructor.id === maestro.id ? maestro : instructor) })),
    setMaestro: (maestros) => set(({ maestros })),

    addVehiculos: (vehiculo) => set((state) => ({ vehiculos: [...state.vehiculos, vehiculo] }))
}))