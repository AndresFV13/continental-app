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
import { ModalInstructores } from '../components/Modals/create/ModalInstructores'

export const Instructores = () => {
    const [instructorToEdit, setInstructorToEdit] = useState(null);
    const {
        setShowModalInst,
    } = useModal()

    const maestros = store((state) => state.maestros)
    const courses = store((state) => state.courses)
    //Actions
    const setMaestro = store((state) => state.setMaestro)

    const [editModalInstructor, setEditModalInstructor] = useState(false);

    const closeModalAInst = () => {
        setEditModalInstructor(!editModalInstructor)
    }
    const getAllInstructor = async () => {
        const request = await Axios.get('/instructors/Instructor/all');
        const response = request.data.objectResponse;
        setMaestro(response);
        console.log(response)
    };
    const deleteInstructor = async (instructorId) => {
        try {
            await Axios.delete(`/instructors/Instructor/${instructorId}`)
            getAllInstructor()
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        getAllInstructor();
    }, []);

    const deleteMaestro = (instructorId) => {
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
                    deleteInstructor(instructorId);
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
                <p className='ft-2'> Instructores </p>
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
                        maestros.map((maestro, index) => (
                            <tr className='d-flex bor-gray align-items-center' key={maestro.cedula}>
                                <td className='m-3 w-20 text-align-center'> {index + 1} </td>
                                <td className='m-3 w-20 text-align-center'> {maestro.nombres} {maestro.apellidos}</td>
                                <td className='m-3 w-20 text-align-center'> {maestro.cedula} </td>
                                <td className='m-3 w-20 text-align-center'> {maestro.cel} </td>
                                <td className='d-flex justify-content-center align-items-center m-1 w-20'>
                                    <div className="dropdown">
                                        <span className="cursor-pointer dropbtn">
                                            {dostHorizontal}
                                        </span>
                                        <div className="dropdown-content">
                                            <span href="#">Ver cursos</span>
                                            <span onClick={() => { setInstructorToEdit(maestro); setEditModalInstructor(true) }}>Editar instructor</span>
                                            <span onClick={() => deleteMaestro(maestro.id)}>Eliminar instructor</span>
                                            <Link className='link' to={`/calendar/${maestro.id}`}> Ver calendario </Link>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {editModalInstructor && <ModalInstructores student={instructorToEdit} setShowModalInst={() => closeModalAInst()} />}
        </div>
    )
}
