// hooks
import { useState } from 'react';
import { store } from '../../store/store'


export const ModalInstructores = ({setShowModalInst}) => {

  const [errors, setErrors] = useState({})
  //State
  const [infoInstructor, setInfoInstructor] = useState({
    nombre: "",
    cedula: "",
    licencias: ""
  });
  //Actions
  const addInstructor = store((state) => state.addInstructor)

  const onValidate = () =>{
    let isError = false
    let errors = {}

    if (!infoInstructor.nombre.trim()){
      errors.nombre = true
      isError = true
    }
    if (!infoInstructor.cedula.trim()){
      errors.cedula = true
      isError = true
    }
    if (!infoInstructor.licencias.trim()){
      errors.licencias = true
      isError = true
    }

    return isError ? errors : null
  }

  const onInputChange= (event) => {
    const { name, value, cedula, licencias } = event.target;
    setInfoInstructor({
      ...infoInstructor,
      [name]: value,
      [cedula]: value,
      [licencias]: value
    })
  }

  const closeModal = () => {
    setShowModalInst(false)
  }

  const customOnSubmit = (e) => {
    e.preventDefault()
    addInstructor(infoInstructor);

    const err = onValidate();

    if(err === null){
        console.log("enviando formulario")
        setShowModalInst(false)
    }
    else{
      setErrors(err)
    }
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
            <h2 className='title'>Agregar Instructor </h2>
            <label>Nombre:</label>
            <input type="text" 
                   className={errors.nombre ? 'input-error modal-input' : 'modal-input'}
                   name='nombre'
                   value={infoInstructor.nombre}
                   onChange={onInputChange}
                   required/>
            <label>Cedula:</label>
            <input type="number" 
                   className={errors.cedula ? 'input-error modal-input' : 'modal-input'}
                   name='cedula'
                   value={infoInstructor.cedula}
                   onChange={onInputChange}
                   required/>
            <label>Tipo de Licencia:</label>
            <input type="text" 
                   className={errors.tipoDeLincecia ? 'input-error modal-input' : 'modal-input'}
                   name='licencias'
                   value={infoInstructor.licencias}
                   onChange={onInputChange}
                   required/>  
            {errors.nombre || errors.cedula || errors.licencias ? <p> Todos los campos son obligatorios </p> : null }     
            <button className='button-agregar' 
                    type='submit'>
                      Agregar
            </button>
          </div>
        </form>
  )
}
