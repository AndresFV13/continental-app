import { useEffect, useState, useCallback } from 'react';
import { store } from '../../../store/store';
// Axios
import Axios from '../../../lib/Axios';

export const ModalInstructores = ({ setShowModalInst, instructor }) => {
  const [formData, setFormData] = useState({
    id: null,
    nombres: '',
    apellidos: '',
    cedula: '',
    cel: '',
    correo: '',
    cursoInstructorDTO: [],
    estado: 'activo',
  });
  const [disabledButton, setDisabledButton] = useState(true);

  const { courses, addMaestro, updateMaestro } = store(state => ({
    courses: state.courses,
    addMaestro: state.addMaestro,
    updateMaestro: state.updateMaestro
  }));

  useEffect(() => {
    if (instructor) {
      setFormData({
        id: instructor.id,
        nombres: instructor.nombres,
        apellidos: instructor.apellidos,
        cedula: instructor.cedula,
        cel: instructor.cel,
        correo: instructor.correo,
        cursoInstructorDTO: instructor.cursoInstructorDTO.map(curso => ({
          id: curso.id,
          curso: { id: curso.curso.id, nombre: curso.curso.nombre, horas: curso.curso.horas }
        })),
        estado: instructor.estado === 'activo' ? 'activo' : 'inactivo',
      });
    }
  }, [instructor]);

  useEffect(() => {
    const isDisabled = !formData.nombres || !formData.apellidos || !formData.cedula || !formData.cel || !formData.correo;
    setDisabledButton(isDisabled);
  }, [formData]);

  const onInputChange = useCallback(({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const toggleCurso = (curso) => {
    setFormData(prev => {
      const cursoIndex = prev.cursoInstructorDTO.findIndex(c => c.curso.id === curso.id);
      let newCursos = [...prev.cursoInstructorDTO];

      if (cursoIndex === -1) {
        newCursos.push({
          curso: { id: curso.id, nombre: curso.nombre }
        });
      } else {
        newCursos.splice(cursoIndex, 1);
      }

      return { ...prev, cursoInstructorDTO: newCursos };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const action = formData.id ? updateMaestro : addMaestro; // Decide si actualizar o agregar basado en la presencia del id // Ejecutar la acción correspondiente con los datos del formulario
    formData.cursoInstructorDTO.forEach(curso => curso.horasCompletadas = 0)
    if (!formData.id) {
      formData.cursoInstructorDTO = formData.cursoInstructorDTO.map(curso => ({ idCurso: curso.curso.id}))
      delete formData.id;
      await Axios.post('/instructors/Instructor', formData)
      window.location.reload();
    } else {
      formData.cursoInstructorDTO = formData.cursoInstructorDTO.map(curso => ({ idCurso: curso.curso.id, idInstructors: formData.id, horasCompletadas: 0 }))
      await Axios.put('/instructors/Instructor', formData)
      window.location.reload();
    };
    //action(formData);
    setShowModalInst(false);
  }

  return (
    <form className="modal" onSubmit={handleSubmit}>
      <div className="modal-content">
        <div className='container-button'>
          <span className="close" onClick={() => setShowModalInst(false)}>&times;</span>
        </div>
        <h2 className='mb-3'>{instructor ? 'Editar' : 'Agregar'} Instructor </h2>
        <label className='text-aling-left'>Nombres</label>
        <input type="text"
          className='modal-input'
          placeholder="Ingresa el nombre"
          name="nombres"
          value={formData.nombres}
          onChange={onInputChange} />
        <label className='text-aling-left'>Apellidos</label>
        <input type="text"
          className='modal-input'
          placeholder="Ingresa el apellido"
          name="apellidos"
          value={formData.apellidos}
          onChange={onInputChange} />
        <label className='text-aling-left'>Cedula</label>
        <input type="text"
          className='modal-input'
          placeholder="Ingresa la cédula"
          name="cedula"
          value={formData.cedula}
          onChange={onInputChange} />
        <label className='text-aling-left'>Celular</label>
        <input type="text"
          className='modal-input'
          placeholder="Ingresa el celular"
          name="cel"
          value={formData.cel}
          onChange={onInputChange} />
        <label className='text-aling-left'>Correo</label>
        <input type="text"
          className='modal-input'
          placeholder="Ingresa el correo"
          name="correo"
          value={formData.correo}
          onChange={onInputChange} />
        <label className='text-aling-left mb-2'>Cursos</label>
        <div className='d-flex flex-column w-50'>
          {courses.map((curso) => (
            <div key={curso.id} className="d-flex w-100 justify-content-between">
              <div>
                <input
                  className="mr-2"
                  type="checkbox"
                  checked={formData.cursoInstructorDTO.some(c => c.curso.id === curso.id)}
                  onChange={() => toggleCurso(curso)}
                />
                {curso.nombre}
              </div>
            </div>
          ))}
        </div>
        <button className='button-agregar' type="submit" disabled={disabledButton}>Guardar</button>
      </div>
    </form>
  );
};
