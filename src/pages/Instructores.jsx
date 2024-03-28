import React, { Component, useEffect, useState } from 'react'
//store
import { store } from '../store/store';

// Components
import { CalendarButton } from '../components/calendar/CalendarButton';
import { Search } from '../components/search/Search';
import { ModalEditInstruct } from '../components/Modals/edit/ModalEditInstruc';

// icons
import { deleteIcon, editIcon } from '../../public/icons/icons';

export const Instructores = () => {

  const instructores = store((state) => state.instructores)

  const [editModalInstruc, setEditModalInstruc] = useState(false)

  const closeModalInstruc = () => {
    setEditModalInstruc(!editModalInstruc)
  }

    useEffect(() => {
        console.log(instructores);
    }, [instructores]);

  return (
    <div className='d-flex flex-column align-items-center w-100 h-100 c-lb-gray'>
        <div className='d-flex align-self-start my-4 mx-3'>
            <p className='ft-2'> Intructores </p>
        </div>
        <Search />
        <table className='mt-5 w-90'> 
            <thead>
                <tr className='d-flex aling-items-start bor-gray'>
                    <th className='m-3'>Resultados de la busqueda</th>
                </tr>
            </thead>
            <tbody>
                <tr className='d-flex justify-content-around bor-gray w-100 text-align-center font-weigth-6'>
                    <td className='m-3 w-20'> N° </td>
                    <td className='m-3 w-20'> Nombre </td>
                    <td className='m-3 w-20'> Cedula </td>
                    <td className='m-3 w-20'> Curso </td>
                    <td className='m-3 w-20'> Instructor </td>
                    <td className='m-3 w-20'> Horas completadas </td>
                    <td className='m-3 w-20'> Horarios </td>
                </tr>
            </tbody>
            <tbody>
                {
                    instructores.map((instructor) => (
                        <tr className='d-flex justify-content-center bor-gray text-align-center align-items-center' key={instructor.cedula}>
                            <td className='m-3 w-20'> N° </td>
                            <td className='m-3 w-20'> {instructor.nombre} </td>
                            <td className='m-3 w-20'> {instructor.cedula} </td>
                            <td className='m-3 w-20'> {instructor.licencias} </td>
                            <td className='m-3 w-20'> Instructor </td>
                            <td className='m-3 w-20'> <span className='bc-red c-white b-rad p-1 b-rad'> 50% </span> </td>
                            <td className='m-3 w-20'> <CalendarButton/> </td>
                            <td className='d-flex flex-column align-items-center m-1 w-5'>
                                <span>
                                    <span onClick={closeModalInstruc}>{editIcon}</span>
                                    {editModalInstruc === true ? <ModalEditInstruct closeModalInstruc={closeModalInstruc}/> : null}
                                </span>
                                <span>{deleteIcon}</span>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}
