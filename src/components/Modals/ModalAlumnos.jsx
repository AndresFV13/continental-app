// hooks
import { useState } from 'react';
import { store } from '../../store/store'


export const ModalAlumnos = ({setShowModalALum}) => {

  //State
  const [infoAlumno, setInfoAlumno] = useState({
    nombre: "",
    cedula: "",
    tipoLicencia: ""
  });

  const [errors, setErrors] = useState({})
  //Actions
  const addAlumno = store((state) => state.addAlumno)

  const onValidate = () =>{
    let isError = false
    let errors = {}

    if (!infoAlumno.nombre.trim()){
      errors.nombre = true
      isError = true
    }
    if (!infoAlumno.cedula.trim()){
      errors.cedula = true
      isError = true
    }
    if (!infoAlumno.tipoLicencia.trim()){
      errors.tipoDeLincecia = true
      isError = true
    }

    return isError ? errors : null
  }  

  const onInputChange= (event) => {
    const { name, value, cedula, tipoLicencia } = event.target;
    setInfoAlumno({
      ...infoAlumno,
      [name]: value,
      [cedula]: value,
      [tipoLicencia]: value
    })
  }

  const onSubmit = (event) => {
    const err = onValidate(infoAlumno);
    event.preventDefault()

    if(err === null){
        console.log("enviando formulario")
        console.log(infoAlumno)
        setShowModalALum(false)
    }else{
        setErrors(err)
    }
}

  const closeModal = () => {
    setShowModalALum(false)
  }

  const customOnSubmit = (e) => {
    e.preventDefault()
    onSubmit(e);
    addAlumno(infoAlumno);
  };
  
  return (
        <form className="modal" onSubmit={customOnSubmit}>
          <div className="modal-content">
            <div className='container-button'>
                <span className="close" 
                        onClick={closeModal}> 
                          &times;
                </span>
            </div>
            <h2 className='title'>Agregar Alumno </h2>
            <label>Nombre:</label>
            <input type="text" 
                   className={errors.nombre ? 'input-error modal-input' : 'modal-input'}
                   name='nombre'
                   value={infoAlumno.nombre}
                   onChange={onInputChange}
                   required/>
            <label>Cedula:</label>
            <input type="number" 
                   className={errors.cedula ? 'input-error modal-input' : 'modal-input'}
                   name='cedula'
                   value={infoAlumno.cedula}
                   onChange={onInputChange}
                   required/>
            <label>Tipo de Licencia:</label>
            <input type="text" 
                   className={errors.tipoDeLincecia ? 'input-error modal-input' : 'modal-input'}
                   name='tipoLicencia'
                   value={infoAlumno.tipoLicencia}
                   onChange={onInputChange}
                   required/>  
            {errors.nombre || errors.cedula || errors.tipoDeLincecia ? <p> Todos los campos son obligatorios </p> : null }     
            <button className='button-agregar' 
                    type='submit'>
                      Agregar
            </button>
          </div>
        </form>
  )
}
