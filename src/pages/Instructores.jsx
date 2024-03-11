import React from 'react'
import { Table } from '../components/Table/Table'

export const Instructores = () => {

  return (
    <div className='d-flex flex-column align-items-center w-100 h-100 c-lb-gray'>
        <div className='d-flex align-self-start my-4 mx-3'>
            <p className='ft-2'> Intructores </p>
        </div>
        <Table />
    </div>
  )
}
