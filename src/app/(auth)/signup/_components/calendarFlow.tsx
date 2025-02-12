import React from 'react'
import GoogleButton from './googleButton'

export default function CalendarFlow() {
  return (
    <div className='flex justify-between mb-2'>
        <div className='text-2xl font-bold flex items-center'>Google Calendar</div>
        <GoogleButton/>
    </div>
  )
}
