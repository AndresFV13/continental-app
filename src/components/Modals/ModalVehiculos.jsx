import { useEffect, useState } from "react"
import { store } from "../../store/store"

export const ModalVehiculos = ({setShowModalVehi}) => {

  // state
  const [infoVehiculo, setInfoVehiculo] = useState({
    placa: "",
    marca: "",
    modelo: "",
    licencias: ""
  })

  const { placa, marca, modelo, licencias } = infoVehiculo;

  const [disabledButton, setDisabledButton] = useState(true);

  const [errors, setErrors] = useState({})
  // actions
  const addVehiculos = store((state) => state.addVehiculos)

  const onValidate = () =>{
    let isError = false
    let errors = {}

    if (placa.trim() === '' ){
      errors.placa = true
      isError = true
    }
    if (marca.trim() === '' ){
      errors.marca = true
      isError = true
    }
    if (licencias.trim() === '' ){
      errors.licencias = true
      isError = true
    }
    if (modelo.trim() === '' ){
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

  const onSubmit = () => {
    const err = onValidate(infoVehiculo);

    if(err === null){
        setShowModalVehi(false)
    }else{
        setErrors(err)
    }
  }

  const closeModal = () => {
    setShowModalVehi(false)
  }

  const customOnSubmit = (e) => {
    e.preventDefault()

    onSubmit();
    if (placa.trim() === '' || modelo.trim() === '' || licencias.trim() === '' || marca.trim() === '' ) return;
    addVehiculos(infoVehiculo);
  };

  useEffect(() => {
    if (placa.trim() === '' || modelo.trim() === '' || licencias.trim() === '' || marca.trim() === '' ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [placa, modelo, licencias, marca]);
  
  
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
                   onChange={onInputChange}/>
            <label>Marca:</label>
            <input type="text" 
                   className={errors.marca ? 'input-error modal-input' : 'modal-input'}
                   name='marca'
                   value={infoVehiculo.marca}
                   onChange={onInputChange}/>
            <label>Modelo:</label>
            <input type="text" 
                   className={errors.modelo ? 'input-error modal-input' : 'modal-input'}
                   name='modelo'
                   value={infoVehiculo.modelo}
                   onChange={onInputChange}/>
            <label>Tipo de Licencia:</label>
            <input type="text" 
                   className={errors.licencias ? 'input-error modal-input' : 'modal-input'}
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