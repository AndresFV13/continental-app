import { useEffect, useState, useCallback } from 'react';
import { store } from '../../../store/store';

export const ModalAlumnos = ({ setShowModalALum, student }) => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    docIdentificacion: '',
    cel: '',
    correo: '',
    cursoStudentDTO: [],
    estado: false,
  });
  const [errors, setErrors] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);

  const { courses } = store(state => ({
    courses: state.courses
  }));

  useEffect(() => {
    if (student) {
      setFormData({
        ...student,
        cursoStudentDTO: student.cursoStudentDTO.map(({ curso, studentHabilitado }) => ({
          id: curso.id,
          studentHabilitado
        }))
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

  const toggleCurso = (cursoId) => {
    setFormData(prev => {
      const cursoIndex = prev.cursoStudentDTO.findIndex(c => c.id === cursoId);
      const newCursos = [...prev.cursoStudentDTO];

      if (cursoIndex === -1) {
        newCursos.push({ id: cursoId, studentHabilitado: false });
      } else {
        newCursos.splice(cursoIndex, 1);
      }

      return { ...prev, cursoStudentDTO: newCursos };
    });
  };

  const toggleHabilitado = (cursoId) => {
    setFormData(prev => {
      const newCursos = prev.cursoStudentDTO.map(c =>
        c.id === cursoId ? { ...c, studentHabilitado: !c.studentHabilitado } : c
      );

      return { ...prev, cursoStudentDTO: newCursos };
    });
  };

  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string' && value.trim() === '') {
        newErrors[key] = 'Este campo es obligatorio';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(event => {
    event.preventDefault();
    if (validateForm()) {
      // Lógica para agregar o actualizar estudiante
      console.log(formData);
      setShowModalALum(false);
    }
  }, [validateForm, formData, setShowModalALum]);

  return (
    <form className="modal" onSubmit={handleSubmit}>
      <div className="modal-content">
        <span className="close" onClick={() => setShowModalALum(false)}>&times;</span>
        <h2>{student ? 'Editar' : 'Agregar'} Alumno</h2>
        <input type="text" placeholder="Ingresa el nombre" name="nombres" value={formData.nombres} onChange={onInputChange} />
        <input type="text" placeholder="Ingresa el apellido" name="apellidos" value={formData.apellidos} onChange={onInputChange} />
        <input type="text" placeholder="Ingresa la cédula" name="docIdentificacion" value={formData.docIdentificacion} onChange={onInputChange} />
        <input type="text" placeholder="Ingresa el celular" name="cel" value={formData.cel} onChange={onInputChange} />
        <input type="text" placeholder="Ingresa el correo" name="correo" value={formData.correo} onChange={onInputChange} />
        {courses.map((curso) => (
          <div key={curso.id} className="d-flex">
            <div>
              <input
                type="checkbox"
                checked={formData.cursoStudentDTO.some(c => c.id === curso.id)}
                onChange={() => toggleCurso(curso.id)}
              />
              {curso.nombre}
            </div>
            <div>
              <input
                type="checkbox"
                disabled={!formData.cursoStudentDTO.some(c => c.id === curso.id)}
                checked={formData.cursoStudentDTO.some(c => c.id === curso.id && c.studentHabilitado)}
                onChange={() => toggleHabilitado(curso.id)}
              />
              Habilitado
            </div>
          </div>
        ))}
        <input
          type="checkbox"
          name="estado"
          checked={formData.estado}
          onChange={(e) => setFormData(prev => ({ ...prev, estado: e.target.checked }))}
        />
        <button type="submit" disabled={disabledButton}>Guardar</button>
      </div>
    </form>
  );
};
