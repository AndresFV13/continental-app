import { useEffect, useState, useCallback } from 'react';
import { store } from '../../../store/store';

export const ModalAlumnos = ({ setShowModalALum, userId }) => {
  const [infoAlumno, setInfoAlumno] = useState({ nombres: '', apellidos: '', cedula: '', celular: '', correo: '', cursos: [], estado: false });
  const [errors, setErrors] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);

  const { courses, alumnos, addAlumno } = store(state => ({
    courses: state.courses,
    alumnos: state.alumnos,
    addAlumno: state.addAlumno
  }));

  useEffect(() => {
    if (userId && alumnos.length > 0) {
      const alumno = alumnos.find(a => a.id === userId);
      if (alumno) {
        setInfoAlumno(alumno);
      }
    }
  }, [userId, alumnos]);

  useEffect(() => {
    const isDisabled = [infoAlumno.nombres, infoAlumno.apellidos, infoAlumno.cedula, infoAlumno.celular, infoAlumno.correo].some(field => field.trim() === '');
    setDisabledButton(isDisabled);
  }, [infoAlumno]);

  const onInputChange = useCallback(({ target: { name, value } }) => {
    setInfoAlumno(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleCourseChange = (curso) => {
    setInfoAlumno(prev => {
      const cursoIndex = prev.cursos.findIndex(c => c.id === curso.id);
      let newCursos = [...prev.cursos];

      if (cursoIndex === -1) {
        newCursos.push({ id: curso.id, habilitado: false });
      } else {
        newCursos.splice(cursoIndex, 1);
      }

      return { ...prev, cursos: newCursos };
    });
  };

  const handleHabilitadoChange = (curso) => {
    setInfoAlumno(prev => {
      const cursoIndex = prev.cursos.findIndex(c => c.id === curso.id);
      let newCursos = [...prev.cursos];

      if (cursoIndex !== -1) {
        newCursos[cursoIndex] = { ...newCursos[cursoIndex], habilitado: !newCursos[cursoIndex].habilitado };
      }

      return { ...prev, cursos: newCursos };
    });
  };

  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.entries(infoAlumno).forEach(([key, value]) => {
      if (typeof value === 'string' && value.trim() === '') {
        newErrors[key] = 'Este campo es obligatorio';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [infoAlumno]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (validateForm()) {
      const action = userId ? 'update' : 'add'; // Example of branching logic, actual update logic should be implemented
      if (action === 'add') {
        console.log(infoAlumno);
        //addAlumno({ ...infoAlumno });
      }
      // Update logic here
      setShowModalALum(false);
    }
  }, [userId, validateForm, infoAlumno, addAlumno, setShowModalALum]);

  return (
    <form className="modal" onSubmit={handleSubmit}>
      <div className="modal-content">
        <span className="close" onClick={() => setShowModalALum(false)}>&times;</span>
        <h2>{userId ? 'Editar' : 'Agregar'} Alumno</h2>
        <input type="text" placeholder="Imgresa el nombre" name="nombres" value={infoAlumno.nombres} onChange={onInputChange} />
        <input type="text" placeholder="Imgresa el apellido" name="apellidos" value={infoAlumno.apellidos} onChange={onInputChange} />
        <input type="text" placeholder="Imgresa la ceedula" name="cedula" value={infoAlumno.cedula} onChange={onInputChange} />
        <input type="text" placeholder="Imgresa el celular" name="celular" value={infoAlumno.celular} onChange={onInputChange} />
        <input type="text" placeholder="Imgresa el correo" name="correo" value={infoAlumno.correo} onChange={onInputChange} />
        {courses.map((curso) => (
          <div key={curso.id} className="d-flex">
            <div>
              <input
                type="checkbox"
                name="cursos[]"
                checked={infoAlumno.cursos.some(c => c.id === curso.id)}
                onChange={() => handleCourseChange(curso)}
              />
              {curso.nombre}
            </div>
            <div>
              <input
                type="checkbox"
                disabled={!infoAlumno.cursos.some(c => c.id === curso.id)}
                checked={infoAlumno.cursos.some(c => c.id === curso.id && c.habilitado)}
                onChange={() => handleHabilitadoChange(curso)}
              />
              Habilitado
            </div>
          </div>
        ))}
        <input
          type="checkbox"
          name="estado"
          checked={infoAlumno.estado}
          onChange={(e) => setInfoAlumno(prev => ({ ...prev, estado: e.target.checked }))}
        />
        <button type="submit" disabled={disabledButton}>Guardar</button>
      </div>
    </form>
  );
};
