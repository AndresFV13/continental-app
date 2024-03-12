// hooks
import { useForm } from '../../hooks/useForm'

export const ModalVehiculos = ({setShowModalVehi}) => {

  const initialData = {
    placa: "",
    marca: "",
    tipoLicencia: "",
    modelo: ""
  }

  const onValidate = (inputValue) =>{
    let isError = false
    let errors = {}

    if (!inputValue.placa.trim()){
      errors.placa = true
      isError = true
    }
    if (!inputValue.marca.trim()){
      errors.marca = true
      isError = true
    }
    if (!inputValue.tipoLicencia.trim()){
      errors.tipoDeLincecia = true
      isError = true
    }
    if (!inputValue.modelo.trim()){
      errors.modelo = true
      isError = true
    }

    return isError ? errors : null
  }

  const {
    errors, 
    inputValue, 
    setinputValue, 
    onSubmit
  } = useForm(initialData, onValidate, setShowModalVehi);   

  const onInputChange= (event) => {
    const { name, value, marca, tipoLicencia, modelo } = event.target;
    setinputValue({
      ...inputValue,
      [name]: value,
      [marca]: value,
      [tipoLicencia]: value,
      [modelo]: value
    })
  }

  const closeModal = () => {
    setShowModalVehi(false)
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
            <h2 className='title'>Agregar Vehiculo </h2>
            <label>placa:</label>
            <input type="text" 
                   className={errors.placa ? 'input-error modal-input' : 'modal-input'}
                   name='placa'
                   value={inputValue.placa}
                   onChange={onInputChange}/>
            <label>Marca:</label>
            <input type="text" 
                   className={errors.marca ? 'input-error modal-input' : 'modal-input'}
                   name='marca'
                   value={inputValue.marca}
                   onChange={onInputChange}/>
            <label>Modelo:</label>
            <input type="text" 
                   className={errors.modelo ? 'input-error modal-input' : 'modal-input'}
                   name='modelo'
                   value={inputValue.modelo}
                   onChange={onInputChange}/>
            <label>Tipo de Licencia:</label>
            <input type="text" 
                   className={errors.tipoDeLincecia ? 'input-error modal-input' : 'modal-input'}
                   name='tipoLicencia'
                   value={inputValue.tipoLicencia}
                   onChange={onInputChange}/>  
            {errors.placa || errors.marca || errors.tipoDeLincecia || errors.modelo ? <p> Todos los campos son obligatorios </p> : null }     
            <button className='button-agregar' 
                    type='submit'>
                      Agregar
            </button>
          </div>
        </form>
  )
}