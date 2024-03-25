// hooks
import { useEffect, useState } from 'react';
import { store } from '../../store/store'
import { useModal } from '../../hooks/useModal';


export const ModalAlumnos = ({setShowModalALum}) => {

  //State
  const [infoAlumno, setInfoAlumno] = useState({
    nombre: "",
    cedula: "",
    tipoLicencia: ""
  });

  const { nombre, cedula, tipoLicencia } = infoAlumno;

  const [disabledButton, setDisabledButton] = useState(true);

  const [errors, setErrors] = useState({})

  const {showModalAlum, openModalAlum} = useModal();
  //Actions
  const addAlumno = store((state) => state.addAlumno)

  const onValidate = () =>{
    let isError = false
    let errors = {}

    if (nombre.trim() === ''){
      errors.nombre = true
      isError = true
    }
    if (cedula.trim() === ''){
      errors.cedula = true
      isError = true
    }
    if (tipoLicencia.trim() === ''){
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

  const onSubmit = () => {
    const err = onValidate(infoAlumno);

    if(err === null){
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
    
    onSubmit();
    if (nombre.trim() === '' || cedula.trim() === '' || tipoLicencia.trim() === '') return;
    addAlumno(infoAlumno);
  };

  useEffect(() => {
    if (nombre.trim() === '' || cedula.trim() === '' || tipoLicencia.trim() === '') {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [nombre, cedula, tipoLicencia]);
  
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
            <label className='text-aling-left'>Nombre:</label>
            <input type="text" 
                   className={errors.nombre ? 'input-error modal-input' : 'modal-input'}
                   name='nombre'
                   value={infoAlumno.nombre}
                   onChange={onInputChange}
                  />
            <label className='text-aling-left'>Cedula:</label>
            <input type="number" 
                   className={errors.cedula ? 'input-error modal-input' : 'modal-input'}
                   name='cedula'
                   value={infoAlumno.cedula}
                   onChange={onInputChange}
                  />
            <label className='text-aling-left'>Tipo de Licencia:</label>
            <input type="text" 
                   className={errors.tipoDeLincecia ? 'input-error modal-input' : 'modal-input'}
                   name='tipoLicencia'
                   value={infoAlumno.tipoLicencia}
                   onChange={onInputChange}
                  />  
            {errors.nombre || errors.cedula || errors.tipoDeLincecia ? <p> Todos los campos son obligatorios </p> : null }     
            <button className='button-agregar' 
                    type='submit' >
                      Agregar
            </button>
          </div>
        </form>
  )
}
