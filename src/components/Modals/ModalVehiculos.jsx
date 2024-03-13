import { useState } from "react"
import { store } from "../../store/store"

export const ModalVehiculos = ({setShowModalVehi}) => {

  // state
  const [infoVehiculo, setInfoVehiculo] = useState({
    placa: "",
    marca: "",
    modelo: "",
    licencias: ""
  })
  // actions
  const addVehiculos = store((state) => state.addVehiculos)

  const [errors, setErrors] = useState({})

  const onValidate = () =>{
    let isError = false
    let errors = {}

    if (!infoVehiculo.placa.trim()){
      errors.placa = true
      isError = true
    }
    if (!infoVehiculo.marca.trim()){
      errors.marca = true
      isError = true
    }
    if (!infoVehiculo.licencias.trim()){
      errors.licencias = true
      isError = true
    }
    if (!infoVehiculo.modelo.trim()){
      errors.modelo = true
      isError = true
    }

    return isError ? errors : null
  }

  const onInputChange= (event) => {
    const { name, value, marca, licencias, modelo } = event.target;
    setInfoVehiculo({
      ...infoVehiculo,
      [name]: value,
      [marca]: value,
      [licencias]: value,
      [modelo]: value
    })
  }

  const closeModal = () => {
    setShowModalVehi(false)
  }

  const customOnSubmit = (e) => {
    e.preventDefault()
    addVehiculos(infoVehiculo);

    const err = onValidate();

    if(err === null){
        console.log("enviando formulario")
        setShowModalVehi(false)
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
            <h2 className='title'>Agregar Vehiculo </h2>
            <label>placa:</label>
            <input type="text" 
                   className={errors.placa ? 'input-error modal-input' : 'modal-input'}
                   name='placa'
                   value={infoVehiculo.placa}
     s              onChange={onInputChange}/>
            <label>Marca:</label>
            <input type="text" 
                   className={errors.marca ? 'input-error modal-input' : 'modal-input'}
                   name='marca'
                   value={infoVehiculo.marca}
     s              onChange={onInputChange}/>
            <label>Modelo:</label>
            <input type="text" 
                   className={errors.modelo ? 'input-error modal-input' : 'modal-input'}
                   name='modelo'
                   value={infoVehiculo.modelo}
    s               onChange={onInputChange}/>
            <label>Tipo de Licencia:</label>
            <input type="text" 
                   className={errors.tipoDeLincecia ? 'input-error modal-input' : 'modal-input'}
                   name='licencias'
                   value={infoVehiculo.licencias}
                   onChange={onInputChange}/>  
            {errors.placa || errors.marca || errors.licencias || errors.modelo ? <p> Todos los campos son obligatorios </p> : null }     
            <button className='button-agregar' 
                    type='submit'>
                      Agregar
            </button>
          </div>
        </form>
  )
}