
import { useEffect, useState } from 'react';
//state global
import { store } from '../../../store/store'

export const ModalAlumnos = ({ setShowModalALum, userId }) => {

  //estados
  const [disabledButton, setDisabledButton] = useState(true);

  const [errors, setErrors] = useState({})

  //estados globales
  const courses = store((state) => state.courses)

  const alumnos = store((state) => state.alumnos)

  const [infoAlumno, setInfoAlumno] = useState({
    nombre: "",
    cedula: "",
    celular: "",
    correo: "",
    curso: courses.nombre,
    estado: false
  });

  const { nombre, cedula, celular, correo, curso, estado  } = infoAlumno;

  //Actions
  const addAlumno = store((state) => state.addAlumno)

  const onValidate = () => {
    let isError = false
    let errors = {}

    if (nombre.trim() === '') {
      errors.nombre = true
      isError = true
    }
    if (cedula.trim() === '') {
      errors.cedula = true
      isError = true
    }
    if (celular.trim() === '') {
      errors.celular = true
      isError = true
    }
    if (correo.trim() === '') {
      errors.correo = true
      isError = true
    }
    if (estado === false) {
      errors.estado = false
      isError = false
    }

    return isError ? errors : null
  }

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setInfoAlumno({
      ...infoAlumno,
      [name]: value,
    })
  }

  const onSubmit = () => {
    const err = onValidate(infoAlumno);

    if (err === null) {
      setShowModalALum(false)
    } else {
      setErrors(err)
    }
  }

  const closeModal = () => {
    setShowModalALum(false)
  }

  const customOnSubmit = (e) => {
    e.preventDefault()

    console.log(infoAlumno)
    onSubmit();
    if (nombre.trim() === '' || cedula.trim() === '') return;
    const findCourse = courses.find(course => course.nombre === curso)
    if (!userId) {
      const newAlumno = {
        estado: estado,
        docIdentificacion: cedula,
        correo: correo,
        nombres: nombre,
        apellidos: "",
        cursoStudentDTO: [
          {
            idCurso: Number(findCourse.id),
            studentHabilitado: true
          },
        ]
      };
      addAlumno(newAlumno)
    } else {
      const editedAlumno = alumnos.find(alumno.id === userId);
      const newAlumno = {
        ...editedAlumno,
        nombres: nombre,
        docIdentificacion: cedula,
      };
    }
    
  };

  useEffect(() => {
    if (userId) {
      const findAlumno = alumnos.find(alumno => alumno.id === userId)
      if (findAlumno) {
        setInfoAlumno(
          {
            nombre: `${findAlumno.nombres} ${findAlumno.apellidos}`,
            cedula: findAlumno.docIdentificacion,
            curso: 'A2',
          }
        );
      };
    }
  }, [userId]);

  useEffect(() => {
    if (nombre.trim() === '' || cedula.trim() === '') {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [nombre, cedula, curso]);

  return (
    <form className="modal" onSubmit={customOnSubmit}>
      <div className="modal-content">
        <div className='container-button'>
          <span className="close"
            onClick={closeModal}>
            &times;
          </span>
        </div>
        <h2 className='title'>{userId ? 'Editar' : 'Agregar'} Alumno </h2>
        <label className='text-aling-left'>Nombre:</label>
        <input type="text"
          className={errors.nombre ? 'input-error modal-input' : 'modal-input'}
          name='nombre'
          value={infoAlumno.nombre}
          onChange={onInputChange}
        />
        <label className='text-aling-left'>Cedula:</label>
        <input type="text"
          className={errors.cedula ? 'input-error modal-input' : 'modal-input'}
          name='cedula'
          value={infoAlumno.cedula}
          onChange={onInputChange}
        />
        <label className='text-aling-left'>Celular</label>
        <input type="text"
          className={errors.celular ? 'input-error modal-input' : 'modal-input'}
          name='celular'
          value={infoAlumno.celular}
          onChange={onInputChange}
        />
        <label className='text-aling-left'>Correo</label>
        <input type="email"
          className={errors.correo ? 'input-error modal-input' : 'modal-input'}
          name='correo'
          value={infoAlumno.correo}
          onChange={onInputChange}
        />
        <label className='text-aling-left'>Cursos</label>
        <select className="modal-input" name='' onChange={onInputChange} defaultValue={curso}>
          <option value="">Selecciona un tipo de licencia</option>
          {
            courses.map((course) => (<option selected={curso === course.nombre} value={course.nombre}>{course.nombre}</option>))
          }
        </select>
        <div className='modal-input-checkbox'>
          <label className='text-aling-left mr-2'>Activo</label>
          <input type="checkbox"
            name='nombre'
            value={infoAlumno.estado}
            onChange={onInputChange}
          />
        </div>
        {errors.nombre || errors.cedula || errors.tipoDeLincecia ? <p className='mt-4'> Todos los campos son obligatorios </p> : null}
        <button className='button-agregar'
          type='submit' >
          Agregar
        </button>
      </div>
    </form>
  )
}
