import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  Toolbar,
  ViewSwitcher,
  MonthView,
  Resources
} from '@devexpress/dx-react-scheduler-material-ui';

import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { amber, red, green } from "@mui/material/colors";
import { store } from '../../store/store';

// const storeAlumnos = store((state) => state.alumnos )

// console.log(storeAlumnos);

const recurrenceAppointments = [{
    title: 'Website Re-Design Plan',
    startDate: new Date(2018, 5, 25, 9, 15),
    endDate: new Date(2018, 5, 25, 11, 30),
    id: 100,
    rRule: 'FREQ=DAILY;COUNT=3',
    exDate: '20180628T063500Z,20180626T061500Z',
  }
  ];

const resourcesData = [
  {
    text: "Cancelada",
    id: 1,
    color: red,
  },
  {
    text: "Pendiente",
    id: 2,
    color: amber,
  },
  {
    text: "Terminada",
    id: 3,
    color: green,
  },
];


const dragDisableIds = new Set([3, 8, 10, 12]);
const allowDrag = ({ id }) => !dragDisableIds.has(id);

const appointmentComponent = (props) => {
  if (allowDrag(props.data)) {
    return <Appointments.Appointment {...props} />;
  }
  return <Appointments.Appointment {...props} style={{ ...props.style, cursor: 'not-allowed' }} />;
};

const Demo = () => {
  const [data, setData] = useState(recurrenceAppointments);
  const [currentDate] = useState(new Date('2018-06-27'));
  const { resources } = useState(resourcesData);


  const commitChanges = ({ added, changed, deleted }) => {
    setData((currentData) => {
      let updatedData = currentData;
      if (added) {
        const startingAddedId = updatedData.length > 0 ? updatedData[updatedData.length - 1].id + 1 : 0;
        updatedData = [...updatedData, { id: startingAddedId, ...added }];
      }
      if (changed) {
        updatedData = updatedData.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        updatedData = updatedData.filter(appointment => appointment.id !== deleted);
      }
      console.log(updatedData);
      return updatedData;
    });
  };

  const allDayLocalizationMessages = {
    'es-ES': {
      allDay: 'Todo el día',
      allDayLabel: 'Todo el día',
      titleLabel: 'Titulo',
      moreInformationLabel: 'Más información',
      repeatLabel: 'Repetir',
      notesLabel: 'Notas',
      never: 'Nunca',
      daily: 'Diario',
      weekly: 'Semanalmente',
      monthly: 'Mensual',
      yearly: 'Anual',
      repeatEveryLabel: 'Repite cada',
      daysLabel: 'Dias',
      endRepeatLabel: 'Finalizar repetir',
      on: 'En',
      afterLabel: 'Despues',
      occurrencesLabel: 'Ocurrencias',
      weeksOnLabel: 'Semanas despues',
      monthsLabel: 'Meses',
      ofEveryMonthLabel: 'De cada mes',
      theLabel: 'El',
      firstLabel: 'Primero',
      secondLabel: 'Segundo',
      thirdLabel: 'Tercero',
      fourthLabel: 'Cuarto',
      lastLabel: 'Ultimo',
      yearsLabel: 'Años',
      ofLabel: 'De',
      everyLabel: 'Siempre',
      detailsLabel: 'Detalles',
      discardButton: 'Descartar',
      deleteButton: 'Eliminar',
      cancelButton: 'Cancelar',
      confirmDeleteMessage: '¿Estás seguro de que quieres eliminar este evento?',
      confirmCancelMessage: '¿Estás seguro de que quieres salir sin guardar?',
      commitButton: "Guardar"
    },
  };

  const getAllDayMessages = locale => allDayLocalizationMessages[locale];

  if (!window) return;

  return (
    <Paper>
      <Scheduler
        data={data}
        height={window.innerHeight - 120}
        locale={'es'}
      >
        <ViewState
          currentDate={currentDate}
          defaultCurrentViewName="Week"
        />
        <EditingState
          onCommitChanges={commitChanges}
        />
        <EditRecurrenceMenu 
          messages={getAllDayMessages('es-ES')}
        />
        <DayView
            startDayHour={9}
            endDayHour={18}
          />
        <WeekView
          startDayHour={9}
          endDayHour={16}
        />
        <MonthView />
        <ConfirmationDialog
          messages={getAllDayMessages('es-ES')}
        />
        <Toolbar />
          <ViewSwitcher />
        <Appointments
          appointmentComponent={appointmentComponent}
        />
        <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
        <AllDayPanel messages={getAllDayMessages('es-ES')}/>

        
        <DragDropProvider
          allowDrag={allowDrag}
        />
        <AppointmentForm
            messages={getAllDayMessages('es-ES')}
        />
      </Scheduler>
    </Paper>
  );
};

export default Demo;
