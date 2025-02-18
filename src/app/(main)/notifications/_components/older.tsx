import React from 'react'

import Notification from './notification'

const notifications = [
  {
      'imgLink': 'link',
      'name': 'Olu',
      'message': "sent a friend request",
      "time": '2025-01-15T12:12',
      'type': 'friend-request'
  }, 
  {
      'imgLink': 'link',
      'name': 'Mansij',
      'message': "invited you to a meetup",
      "time": '2025-01-15T12:50',
      'type': 'meetup-request'
  },
  {
      'imgLink': 'link',
      'name': 'Everyone',
      'message': "selected date/",
      "time": '2025-01-13T05:12',
      'type': 'general'
  }
]

export default function Older() {

  const notiDivs = notifications.map((value, index) => {
      return <Notification notif={value} key={index}/>
  });

  return (
    <div>
        <div className='pt-6 text-2xl font-semibold'>
            Older
        </div>
        <div className='border-black border px-4 py-2 rounded-md'>
            {notiDivs}
        </div>
    </div>
  )
}
