import React, { useEffect } from 'react'
// icons
import { search } from '../../public/icons/icons'

// store global
import { store } from '../store/store'

export const Alumnos = () => {

  const alumnos = store((state) => state.alumnos)

    useEffect(() => {
        console.log(alumnos);
    }, [alumnos]);
  
  return (
    <div className='d-flex flex-column align-items-center w-100 h-100 c-lb-gray'>
        <div className='d-flex align-self-start my-4 mx-3'>
            <p className='ft-2'> Alumnos </p>
        </div>
        <div className='d-flex flex-column align-items-center w-80'>
                <p className='my-3 ft-3'> Buscar </p>
                <div className='d-flex align-item-center w-100 b-gray b-rad'>
                    <input className='w-100 p-2 b-gray b-rad ft-1' type="search" placeholder='Buscar alumno por nombre, cedula o curso'/>
                    <button className='d-flex align-item-center w-3 p-1 c-lt-gray b-gray'>{search}</button>
                </div>
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
                        alumnos.map((alumno) => (
                            <tr className='d-flex justify-content-around bor-gray text-align-center' key={alumno.cedula}>
                                <td className='m-3 w-20'> N° </td>
                                <td className='m-3 w-20'> {alumno.nombre} </td>
                                <td className='m-3 w-20'> {alumno.cedula} </td>
                                <td className='m-3 w-20'> {alumno.tipoLicencia} </td>
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
