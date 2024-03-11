import React from 'react'

export const Table = () => {

    const search =  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
                    </svg>

  return (
    <>
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
                <tr className='d-flex justify-content-around bor-gray text-align-center'>
                    <td className='m-3 w-20'> N° </td>
                    <td className='m-3 w-20'> Nombre </td>
                    <td className='m-3 w-20'> Cedula </td>
                    <td className='m-3 w-20'> Curso </td>
                    <td className='m-3 w-20'> Instructor </td>
                    <td className='m-3 w-20'> Horas completadas </td>
                    <td className='m-3 w-20'> Horarios </td>
                </tr>
            </tbody>
        </table>
    </>
  )
}
