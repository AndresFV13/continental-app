import React, { useEffect, useState } from 'react'

//Component
import Calendar from '../components/calendar/Calendar'

//Router
import { useParams } from 'react-router-dom';

const CalendarPage = () => {
    const [calendarData, setCalendarData] = useState([]);
    const { userId } = useParams();
    //Functions
    function timestampToDate(timestamp) {
        const date = new Date(timestamp);
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes()
        };
    }
    const getCalendarDate = async () => {
        const request = await fetch(`http://localhost:5173/api/calendar/${userId}.json`);
        const response = await request.json();
        response.map(item => {
            const startDate = timestampToDate(item.startDate);
            const endDate = timestampToDate(item.endDate);
            item.startDate = new Date(startDate.year, startDate.month, startDate.day, startDate.hour, startDate.minute);
            item.endDate = new Date(endDate.year, endDate.month, endDate.day, endDate.hour, endDate.minute);
            console.log(item)
            return item
        });
        setCalendarData(response);
    };
    useEffect(() => {
        if (userId) getCalendarDate();
    }, [userId]);
    //Agregar timeout para que se alcance a hacer la petición y el calendario no se muestre vacio
    if (calendarData.length === 0) return;
    return (
        <Calendar calendarData={calendarData}/>
    )
}

export default CalendarPage