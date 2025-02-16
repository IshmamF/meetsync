import React from 'react'

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
        'img': 'link',
        'name': 'Olu',
        'message': "sent a friend request",
        "time": '2025-02-15T12:12',
        'type': 'friend-request'
    }, 
    {
        'img': 'link',
        'name': 'Mansij',
        'message': "invited you to a meetup",
        "time": '2025-02-15T12:50',
        'type': 'meetup-request'
    },
    {
        'img': 'link',
        'name': 'Everyone',
        'message': "selected date/times",
        "time": '2025-02-13T05:12',
        'type': 'general'
    }
]

export default function Weekly() {
  return (
    <div>
        <div>
            Title: Last 7 Days
        </div>
        <div>
            List of Notifications
        </div>
    </div>
  )
}
