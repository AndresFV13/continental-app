// hooks
import { useForm } from '../../hooks/useForm'


export const ModalAlumnos = ({setShowModalALum}) => {

  const initialData = {
    nombre: "",
    cedula: "",
    tipoLicencia: ""
  }

  const onValidate = (inputValue) =>{
    let isError = false
    let errors = {}

    if (!inputValue.nombre.trim()){
      errors.nombre = true
      isError = true
    }
    if (!inputValue.cedula.trim()){
      errors.cedula = true
      isError = true
    }
    if (!inputValue.tipoLicencia.trim()){
      errors.tipoDeLincecia = true
      isError = true
    }

    return isError ? errors : null
  }

  const {
    errors, 
    inputValue, 
    setinputValue, 
    onSubmit
  } = useForm(initialData, onValidate, setShowModalALum);   

  const onInputChange= (event) => {
    const { name, value, cedula, tipoLicencia } = event.target;
    setinputValue({
      ...inputValue,
      [name]: value,
      [cedula]: value,
      [tipoLicencia]: value
    })
  }

  const closeModal = () => {
    setShowModalALum(false)
  }
  
  return (
        <form className="modal" onSubmit={onSubmit}>
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
                   value={inputValue.nombre}
                   onChange={onInputChange}
                   required/>
            <label>Cedula:</label>
            <input type="number" 
                   className={errors.cedula ? 'input-error modal-input' : 'modal-input'}
                   name='cedula'
                   value={inputValue.cedula}
                   onChange={onInputChange}
                   required/>
            <label>Tipo de Licencia:</label>
            <input type="text" 
                   className={errors.tipoDeLincecia ? 'input-error modal-input' : 'modal-input'}
                   name='tipoLicencia'
                   value={inputValue.tipoLicencia}
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
