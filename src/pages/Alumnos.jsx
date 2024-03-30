import React, { useEffect, useState } from 'react'

// store global
import { store } from '../store/store'

//components
import { CalendarButton } from '../components/calendar/CalendarButton'
import { Search } from '../components/search/Search'

//icons
import { deleteIcon, editIcon } from '../../public/icons/icons'

//Axios
import Axios from '../lib/Axios';
import { ModalAlumnos } from '../components/Modals/create/ModalAlumnos'

import { useModal } from '../hooks/useModal'

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
        const response = request.data;
        setAlumnos(response.objectResponse);
    };
    useEffect(() => {
        getAllAlumnos();
    }, []);

    return (
        <div className='d-flex flex-column align-items-center w-100 h-100 c-lb-gray'>
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
                            <tr className='d-flex bor-gray align-items-center' key={alumno.cedula}>
                                <td className='m-3 w-20 text-align-center'> {index + 1} </td>
                                <td className='m-3 w-20 text-align-center'> {alumno.nombres} {alumno.apellidos}</td>
                                <td className='m-3 w-20 text-align-center'> {alumno.docIdentificacion} </td>
                                <td className='m-3 w-20 text-align-center'> {alumno.cel} </td>
                                <td className='d-flex justify-content-center align-items-center m-1 w-20'>
                                    {/* <span>
                                        <span onClick={closeModalAlum}>{editIcon}</span>
                                        {editModalAlumn === true ? <ModalAlumnos userId={alumno.id} setShowModalALum={() => closeModalAlum()} /> : null}
                                    </span>
                                    <span>{deleteIcon}</span> */}

                                    <div class="dropdown">
                                        <span className="cursor-pointer dropbtn">
                                            <svg width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                            </svg>
                                        </span>
                                        <div class="dropdown-content">
                                            <span href="#">Ver cursos</span>
                                            <span onClick={() => {setStudentToEdit(alumno); setEditModalAlumn(true)}}>Editar alumno</span>
                                            <span href="#">Eliminar alumno</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {studentToEdit && <ModalAlumnos student={studentToEdit} setShowModalALum={() => closeModalAlum()} />}
        </div>
    )
}
