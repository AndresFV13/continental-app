import React, { useEffect } from 'react'

// store global
import { store } from '../store/store'

//components
import { CalendarButton } from '../components/calendar/CalendarButton'
import { Search } from '../components/search/Search'

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
                    alumnos.map((alumno, index) => (
                        <tr className='d-flex justify-content-around bor-gray text-align-center' key={alumno.cedula}>
                            <td className='m-3 w-20'> {index + 1} </td>
                            <td className='m-3 w-20'> {alumno.nombre} </td>
                            <td className='m-3 w-20'> {alumno.cedula} </td>
                            <td className='m-3 w-20'> {alumno.tipoLicencia} </td>
                            <td className='m-3 w-20'> Juan Diaz </td>
                            <td className='m-3 w-20'> <span className='bc-red c-white b-rad p-1 b-rad'> 50% </span> </td>
                            <td className='m-3 w-20'> Horarios </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <CalendarButton/>
    </div>
  )
}
