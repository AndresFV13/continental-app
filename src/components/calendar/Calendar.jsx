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
  MonthView
} from '@devexpress/dx-react-scheduler-material-ui';

import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';

const recurrenceAppointments = [{
    title: 'Website Re-Design Plan',
    startDate: new Date(2018, 5, 25, 9, 15),
    endDate: new Date(2018, 5, 25, 11, 30),
    id: 100,
    rRule: 'FREQ=DAILY;COUNT=3',
    exDate: '20180628T063500Z,20180626T061500Z',
  }, {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2018, 5, 25, 12, 11),
    endDate: new Date(2018, 5, 25, 13, 0),
    id: 101,
    rRule: 'FREQ=DAILY;COUNT=4',
    exDate: '20180627T091100Z',
    allDay: true,
  }, {
    title: 'Install New Router in Dev Room',
    startDate: new Date(2018, 5, 25, 13, 30),
    endDate: new Date(2018, 5, 25, 14, 35),
    id: 102,
    rRule: 'FREQ=DAILY;COUNT=5',
  }, {
    title: 'Approve Personal Computer Upgrade Plan',
    startDate: new Date(2018, 5, 26, 10, 0),
    endDate: new Date(2018, 5, 26, 11, 0),
    id: 3,
    location: 'Room 2',
  }, {
    title: 'Final Budget Review',
    startDate: new Date(2018, 5, 27, 11, 45),
    endDate: new Date(2018, 5, 27, 13, 20),
    id: 4,
    location: 'Room 2',
  }, {
    title: 'New Brochures',
    startDate: new Date(2018, 5, 26, 14, 40),
    endDate: new Date(2018, 5, 26, 15, 45),
    id: 5,
    location: 'Room 2',
  }, {
    title: 'Install New Database',
    startDate: new Date(2018, 5, 28, 9, 45),
    endDate: new Date(2018, 5, 28, 11, 15),
    id: 6,
    location: 'Room 1',
  }, {
    title: 'Approve New Online Marketing Strategy',
    startDate: new Date(2018, 5, 29, 11, 45),
    endDate: new Date(2018, 5, 29, 13, 5),
    id: 7,
    location: 'Room 3',
  }, {
    title: 'Create Icons for Website',
    startDate: new Date(2018, 5, 29, 10, 0),
    endDate: new Date(2018, 5, 29, 11, 30),
    id: 12,
    location: 'Room 2',
  }];
  

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
      detailsLabel: 'Detalles'
    },
  };

  const getAllDayMessages = locale => allDayLocalizationMessages[locale];

  if (!window) return;

  return (
    <Paper>
      <Scheduler
        data={data}
        height={window.innerHeight - 120}
      >
        <ViewState
          currentDate={currentDate}
          defaultCurrentViewName="Week"
        />
        <EditingState
          onCommitChanges={commitChanges}
        />
        <EditRecurrenceMenu />
        <DayView
            startDayHour={9}
            endDayHour={18}
          />
        <WeekView
          startDayHour={9}
          endDayHour={16}
        />
        <MonthView />
        <ConfirmationDialog />
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
