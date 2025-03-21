import React from 'react'
import Notification from './notification'
import { notification } from '@/types/notifications'

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

    const filtered_notifs = data?.filter((notif) => {
        const diff = minutesDifference(notif.created_at);
        if (type == 'weekly') {
            return diff < MINUTES_IN_WEEK;
        } else if (type == 'monthly') {
            return diff >= MINUTES_IN_WEEK && diff < MINUTES_IN_MONTH;
        } else {
            return diff >= MINUTES_IN_MONTH;
        }
    });

    const mapped_notifs = filtered_notifs?.map(notif => (
        <div className="py-1 first:pt-0 last:pb-0" key={notif.id}>
            <Notification notif={notif} />
        </div>
    ));

    return (
        <div className="w-full max-w-3xl mb-8">
            {mapped_notifs?.length > 0 && (
                <>
                    <div className='text-2xl font-semibold text-left mb-4'>
                        {title}
                    </div>
                    <div className='border-black border px-6 py-4 rounded-md'>
                        {mapped_notifs}
                    </div>
                </>
            )}
        </div>
    );    
}