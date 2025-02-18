import React from 'react'

import Notification from './notification'

/*
TO DO:
- sort notifications based on time
- get how long since current time 
- if friend or meetup, accept / decline buttons 
    - notification needs to update to no longer display buttons
    - message should be changed to 
*/

const notifications = [
    {
        'imgLink': 'link',
        'name': 'Olu',
        'message': "sent a friend request",
        "time": '2025-02-15T12:12',
        'type': 'friend-request'
    }, 
    {
        'imgLink': 'link',
        'name': 'Mansij',
        'message': "invited you to a meetup",
        "time": '2025-02-15T12:50',
        'type': 'meetup-request'
    },
    {
        'imgLink': 'link',
        'name': 'Everyone',
        'message': "selected date/times",
        "time": '2025-02-13T05:12',
        'type': 'general'
    }
]

export default function Weekly() {

    const notiDivs = notifications.map((value, index) => {
        return <Notification notif={value} key={index}/>
    });

  return (
    <div>
        <div className='pt-6 text-2xl font-semibold'>
            Last 7 Days
        </div>
        <div className='border-black border px-4 py-2 rounded-md'>
            {notiDivs}
        </div>
    </div>
  )
}
