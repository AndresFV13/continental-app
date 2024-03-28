export const ModalEditInstruct = ({closeModalInstruc}) => {


    const onsubmit = (e) => {
      e.preventDefault()
  
      
    }
  
    return (
          <form className="modal" onClick={onsubmit}>
            <div className="modal-content">
              <div className='container-button'>
                  <span className="close"
                  onClick={closeModalInstruc}> 
                            &times;
                  </span>
              </div>
              <h2 className='title'>Agregar Alumno </h2>
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
                      onClick={closeModalInstruc}>
                        Agregar
              </button>
            </div>
          </form>
    )
  }