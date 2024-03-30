import { useState } from "react"
import { store } from "../../../store/store"

export const ModalEditAlumnos = ({closeModalAlum}) => {

  const infoAlumno = store((state) => state.alumnos)

  const onsubmit = (e) => {
    e.preventDefault()

    const alumnoEncontrado = infoAlumno.find(alumno => alumno.cedula === alumno.cedula);

    if (alumnoEncontrado) {
      console.log("Alumno encontrado:");
      console.log(alumnoEncontrado);
    }
  }

  return (
        <form className="modal" onClick={onsubmit}>
          <div className="modal-content">
            <div className='container-button'>
                <span className="close"
                onClick={closeModalAlum}> 
                          &times;
                </span>
            </div>
            <h2 className='title'>Editar Alumno </h2>
            <label className='text-aling-left'>Nombre:</label>
            <input type="text" 
                   className='modal-input'
                   name='nombre'
                  />
            <label className='text-aling-left'>Cedula:</label>
            <input type="number" 
                   className='modal-input'
                   name='cedula'
                  />
            <label className='text-aling-left'>Tipo de Licencia:</label>
            <input type="text" 
                   className='modal-input'
                   name='tipoLicencia'
                  />  
            <button className='button-agregar' 
                    type='submit' 
                    onClick={closeModalAlum}>
                      Agregar
            </button>
          </div>
        </form>
  )
}
