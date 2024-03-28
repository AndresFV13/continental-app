// hooks
import { useEffect, useState } from 'react';
import { store } from '../../../store/store';



export const ModalInstructores = ({setShowModalInst}) => {

  const [errors, setErrors] = useState({})

  const [disabledButton, setDisabledButton] = useState(true);

  //State
  const [infoInstructor, setInfoInstructor] = useState({
    nombre: "",
    cedula: "",
    licencias: ""
  });

  const { nombre, cedula, licencias } = infoInstructor

  //Actions
  const addInstructor = store((state) => state.addInstructor)

  const onValidate = () =>{
    let isError = false
    let errors = {}

    if (!nombre.trim()){
      errors.nombre = true
      isError = true
    }
    if (!cedula.trim()){
      errors.cedula = true
      isError = true
    }
    if (!licencias.trim()){
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
    })
  }

  const onSubmit = () => {
    const err = onValidate(infoInstructor);

    if(err === null){
        console.log("enviando formulario")
        setShowModalInst(false)
    }else{
        setErrors(err)
    }
  }

  const closeModal = () => {
    setShowModalInst(false)
  }

  const customOnSubmit = (e) => {
    e.preventDefault()
    onSubmit();
    if (nombre.trim() === '' || cedula.trim() === '' || licencias.trim() === '') return;
    addInstructor(infoInstructor);
  };

   useEffect(() => {
    if (nombre.trim() === '' || cedula.trim() === '' || licencias.trim() === '') {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [nombre, cedula, licencias]);
  
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
                   onChange={onInputChange}/>
            <label>Cedula:</label>
            <input type="number" 
                   className={errors.cedula ? 'input-error modal-input' : 'modal-input'}
                   name='cedula'
                   value={infoInstructor.cedula}
                   onChange={onInputChange}/>
            <label>Tipo de Licencia:</label>
            <input type="text" 
                   className={errors.licencias ? 'input-error modal-input' : 'modal-input'}
                   name='licencias'
                   value={infoInstructor.licencias}
                   onChange={onInputChange}/>  
            {errors.nombre || errors.cedula || errors.licencias ? <p> Todos los campos son obligatorios </p> : null }     
            <button className='button-agregar' 
                    type='submit'>
                      Agregar
            </button>
          </div>
        </form>
  )
}
