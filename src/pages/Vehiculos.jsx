import React, { useEffect } from 'react'
import { store } from '../store/store';

export const Vehiculos = () => {

  const vehiculos = store((state) => state.vehiculos)

    useEffect(() => {
        console.log(vehiculos);
    }, [vehiculos]);
  
  return (
    <div className='d-flex flex-column align-items-center w-100 h-100 c-lb-gray'>
        <div className='d-flex align-self-start my-4 mx-3'>
            <p className='ft-2'> Vehiculos </p>
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
                        <td className='m-3 w-20'> Placa </td>
                        <td className='m-3 w-20'> Marca </td>
                        <td className='m-3 w-20'> Modelo </td>
                        <td className='m-3 w-20'> Licencias </td>
                        <td className='m-3 w-20'> Horas completadas </td>
                        <td className='m-3 w-20'> Horarios </td>
                    </tr>
                </tbody>
                <tbody>
                    {
                        vehiculos.map((vehiculo) => (
                            <tr className='d-flex justify-content-around bor-gray text-align-center' key={vehiculo.placa}>
                                <td className='m-3 w-20'> N° </td>
                                <td className='m-3 w-20'> {vehiculo.placa} </td>
                                <td className='m-3 w-20'> {vehiculo.marca} </td>
                                <td className='m-3 w-20'> {vehiculo.modelo} </td>
                                <td className='m-3 w-20'> {vehiculo.licencias} </td>
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