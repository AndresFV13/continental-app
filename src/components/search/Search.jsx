import React from 'react'

// icons
import { search } from '../../../public/icons/icons'

export const Search = () => {
  return (
    <div className='d-flex flex-column align-items-center w-80'>
        <p className='my-3 ft-3'> Buscar </p>
        <div className='d-flex align-item-center w-100 b-gray b-rad'>
            <input className='w-100 p-2 b-gray b-rad ft-1' type="search" placeholder='Buscar alumno por nombre, cedula o curso'/>
            <button className='d-flex align-item-center w-3 p-1 c-lt-gray b-gray'>{search}</button>
        </div>
    </div>
  )
}
