import React from 'react'
import { Link } from 'react-router-dom'
// icons
import { calendar } from '../../../public/icons/icons'

export const CalendarButton = ({ userId }) => {
  return (
    <Link className='calendar-button' to={`/calendar/${userId}`}>
        {calendar}
    </Link>
  )
}
