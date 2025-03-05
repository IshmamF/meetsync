import React from 'react'
import Notification from './notification'

type notification = {
    id: number,
    user_id: string,
    message: string, 
    is_read: boolean, 
    created_at: string, 
    sender: string | null, 
    type: string 
}

interface Props {
    data: notification[]
    title: string
    type: string
}

export const Notifications = ({data, title, type}: Props) => {

    function minutesDifference(notif_date: string) {
        const input_date = new Date(notif_date);
        const current_date = new Date();
        const diffMs = current_date.getTime() - input_date.getTime();
        const diffMins = Math.round(diffMs / (1000 * 60));
        return diffMins;
    }

    const MINUTES_IN_WEEK = 10080;
    const MINUTES_IN_MONTH = 43800;

    const filtered_notifs = data.filter((notif) => {
        const diff = minutesDifference(notif.created_at);
        if (type == 'weekly') {
            return diff < MINUTES_IN_WEEK;
        } else if (type == 'monthly') {
            return diff >= MINUTES_IN_WEEK && diff < MINUTES_IN_MONTH;
        } else {
            return diff >= MINUTES_IN_MONTH;
        }
    });

    const mapped_notifs = filtered_notifs.map(notif => <Notification notif={notif} key={notif.id}/>)


    return (
        <div>
            {mapped_notifs.length > 0 && (
                <>
                    <div className='pt-6 text-2xl font-semibold text-center mb-3'>
                        {title}
                    </div>
                    <div className='border-black border px-4 py-2 rounded-md'>
                        {mapped_notifs}
                    </div>
                </>
            )}
        </div>
    );    
}
