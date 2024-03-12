import React, { useEffect } from 'react'
import { store } from '../store/store';

export const Instructores = () => {

  const instructores = store((state) => state.instructores)

    useEffect(() => {
        console.log(instructores);
    }, [instructores]);

  return (
    <div className='d-flex flex-column align-items-center w-100 h-100 c-lb-gray'>
        <div className='d-flex align-self-start my-4 mx-3'>
            <p className='ft-2'> Intructores </p>
        </div>
        <table className='mt-5 w-90'> 
                <thead>
                    <tr className='d-flex aling-items-start c-white bor-gray'>
                        <th className='m-3'>Resultados de la busqueda</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='d-flex justify-content-around c-white bor-gray w-100 text-align-center font-weigth-6'>
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
                            <tr className='d-flex justify-content-around bor-gray text-align-center' key={instructor.cedula}>
                                <td className='m-3 w-20'> N° </td>
                                <td className='m-3 w-20'> {instructor.nombre} </td>
                                <td className='m-3 w-20'> {instructor.cedula} </td>
                                <td className='m-3 w-20'> {instructor.licencias} </td>
                                <td className='m-3 w-20'> Instructor </td>
                                <td className='m-3 w-20'> Horas completadas </td>
                                <td className='m-3 w-20'> Horarios </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    </div>
  )
}
