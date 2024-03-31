import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// store global
import { store } from '../store/store'
//components
import { Search } from '../components/search/Search'
import { ModalAlumnos } from '../components/Modals/create/ModalAlumnos'
//Axios
import Axios from '../lib/Axios';
// hooks
import { useModal } from '../hooks/useModal'
//sweetaleert2
import Swal from 'sweetalert2'
//icons
import { dostHorizontal } from '../../public/icons/icons'

export const Alumnos = () => {
    const [studentToEdit, setStudentToEdit] = useState(null);
    const {
        setShowModalALum,
    } = useModal()

    const alumnos = store((state) => state.alumnos)
    const courses = store((state) => state.courses)
    //Actions
    const setAlumnos = store((state) => state.setAlumnos)

    const [editModalAlumn, setEditModalAlumn] = useState(false);

    const closeModalAlum = () => {
        setEditModalAlumn(!editModalAlumn)
    }
    const getAllAlumnos = async () => {
        const request = await Axios.get('/students/students/all');
        const response = request.data.objectResponse;
        setAlumnos(response);
    };
    const deleteStudent = async (studentId) => {
        try {
            await Axios.delete(`/students/students/${studentId}`)
            getAllAlumnos
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        getAllAlumnos();
    }, []);

    const deleteAlumno = (studentId) => {
        Swal.fire({
            title: "¿Estas seguro?",
            text: "Se elminara de forma permanente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar ahora",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    deleteStudent(studentId);
                    Swal.fire({
                        title: "Eliminar!",
                        text: "Eliminación completa.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error(error)
                }
                
            }
        });
    }

    return (
        <div className='d-flex flex-column align-items-center w-100 h-100 c-lb-gray xd'>
            <div className='d-flex align-self-start my-4 mx-3'>
                <p className='ft-2'> Alumnos </p>
            </div>
            <Search />
            <table className='mt-5 w-90'>
                <thead>
                    <tr className='d-flex aling-items-start bor-gray'>
                        <th className='m-3'>Resultados de la busqueda</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='d-flex  bor-gray w-100 text-align-center font-weigth-6'>
                        <td className='m-3 text-center w-20'> N° </td>
                        <td className='m-3 text-center w-20'> Nombre </td>
                        <td className='m-3 text-center w-20'> Cedula </td>
                        <td className='m-3 text-center w-20'> Celular </td>
                        <td className='m-3 text-center w-20'>Acciones</td>
                    </tr>
                </tbody>
                <tbody>
                    {
                        alumnos.map((alumno, index) => (
                            <tr className='d-flex bor-gray align-items-center' key={alumno.docIdentificacion}>
                                <td className='m-3 w-20 text-align-center'> {index + 1} </td>
                                <td className='m-3 w-20 text-align-center'> {alumno.nombres} {alumno.apellidos}</td>
                                <td className='m-3 w-20 text-align-center'> {alumno.docIdentificacion} </td>
                                <td className='m-3 w-20 text-align-center'> {alumno.cel} </td>
                                <td className='d-flex justify-content-center align-items-center m-1 w-20'>
                                    <div className="dropdown">
                                        <span className="cursor-pointer dropbtn">
                                            {dostHorizontal}
                                        </span>
                                        <div className="dropdown-content">
                                            <span href="#">Ver cursos</span>
                                            <span onClick={() => { setStudentToEdit(alumno); setEditModalAlumn(true) }}>Editar alumno</span>
                                            <span onClick={() => deleteAlumno(alumno.id)}>Eliminar alumno</span>
                                            <Link className='link' to={`/calendar/${alumno.id}`}> Ver calendario </Link>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {editModalAlumn && <ModalAlumnos student={studentToEdit} setShowModalALum={() => closeModalAlum()} />}
        </div>
    )
}
