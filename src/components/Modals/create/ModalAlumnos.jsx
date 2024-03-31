import { useEffect, useState, useCallback } from 'react';
import { store } from '../../../store/store';
// Axios
import Axios from '../../../lib/Axios';

export const ModalAlumnos = ({ setShowModalALum, student }) => {
  const [formData, setFormData] = useState({
    id: null,
    nombres: '',
    apellidos: '',
    docIdentificacion: '',
    cel: '',
    correo: '',
    cursoStudentDTO: [],
    estado: 'activo',
  });
  const [disabledButton, setDisabledButton] = useState(true);

  const { courses, addAlumno, updateAlumno } = store(state => ({
    courses: state.courses,
    addAlumno: state.addAlumno,
    updateAlumno: state.updateAlumno
  }));

  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id,
        nombres: student.nombres,
        apellidos: student.apellidos,
        docIdentificacion: student.docIdentificacion,
        cel: student.cel,
        correo: student.correo,
        cursoStudentDTO: student.cursoStudentDTO.map(curso => ({
          id: curso.id,
          curso: { id: curso.curso.id, nombre: curso.curso.nombre, horas: curso.curso.horas },
          studentHabilitado: curso.studentHabilitado
        })),
        estado: student.estado === 'activo' ? 'activo' : 'inactivo',
      });
    }
  }, [student]);

  useEffect(() => {
    const isDisabled = !formData.nombres || !formData.apellidos || !formData.docIdentificacion || !formData.cel || !formData.correo;
    setDisabledButton(isDisabled);
  }, [formData]);

  const onInputChange = useCallback(({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const toggleCurso = (curso) => {
    setFormData(prev => {
      const cursoIndex = prev.cursoStudentDTO.findIndex(c => c.curso.id === curso.id);
      let newCursos = [...prev.cursoStudentDTO];

      if (cursoIndex === -1) {
        newCursos.push({
          curso: { id: curso.id, nombre: curso.nombre },
          studentHabilitado: false
        });
      } else {
        newCursos.splice(cursoIndex, 1);
      }

      return { ...prev, cursoStudentDTO: newCursos };
    });
  };

  const toggleHabilitado = (curso) => {
    setFormData(prev => {
      const cursoIndex = prev.cursoStudentDTO.findIndex(c => c.curso.id === curso.id);
      if (cursoIndex !== -1) {
        let newCursos = [...prev.cursoStudentDTO];
        newCursos[cursoIndex].studentHabilitado = !newCursos[cursoIndex].studentHabilitado;

        return { ...prev, cursoStudentDTO: newCursos };
      }
      return prev;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const action = formData.id ? updateAlumno : addAlumno; // Decide si actualizar o agregar basado en la presencia del id // Ejecutar la acción correspondiente con los datos del formulario
    formData.cursoStudentDTO.forEach(curso => curso.horasCompletadas = 0)
    if (!formData.id) {
      formData.cursoStudentDTO = formData.cursoStudentDTO.map(curso => ({ idCurso: curso.curso.id, studentHabilitado: curso.studentHabilitado }))
      delete formData.id;
      await Axios.post('/students/students', formData)
      window.location.reload();
    } else {
      formData.cursoStudentDTO = formData.cursoStudentDTO.map(curso => ({ idCurso: curso.curso.id, studentHabilitado: curso.studentHabilitado, idStudents: formData.id, horasCompletadas: 0 }))
      await Axios.put('/students/students', formData)
      window.location.reload();
    };
    //action(formData);
    setShowModalALum(false);
  }

  return (
    <form className="modal" onSubmit={handleSubmit}>
      <div className="modal-content">
        <div className='container-button'>
          <span className="close" onClick={() => setShowModalALum(false)}>&times;</span>
        </div>
        <h2 className='mb-3'>{student ? 'Editar' : 'Agregar'} Alumno</h2>
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
          name="docIdentificacion"
          value={formData.docIdentificacion}
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
                  checked={formData.cursoStudentDTO.some(c => c.curso.id === curso.id)}
                  onChange={() => toggleCurso(curso)}
                />
                {curso.nombre}
              </div>
              <div>
                <input
                  className="mr-2"
                  type="checkbox"
                  disabled={!formData.cursoStudentDTO.some(c => c.curso.id === curso.id)}
                  checked={formData.cursoStudentDTO.some(c => c.curso.id === curso.id && c.studentHabilitado)}
                  onChange={() => toggleHabilitado(curso)}
                />
                Habilitado
              </div>
            </div>
          ))}
        </div>
        <div className='d-flex align-items-center'>
          <label className='mt-2'> Habilitado </label>
          <input
            className='mt-2 ml-3'
            type="checkbox"
            name="estado"
            checked={formData.estado === 'activo'}
            onChange={(e) => setFormData(prev => ({ ...prev, estado: e.target.checked ? 'activo' : 'inactivo' }))}
          />
        </div>
        <button className='button-agregar' type="submit" disabled={disabledButton}>Guardar</button>
      </div>
    </form>
  );
};
