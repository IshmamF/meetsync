'use client'

import { Notifications } from './_components/notifications';
import { fetchNotifications } from './actions';
import { useQuery } from '@tanstack/react-query';

export default function Notification() {
    const { data, isSuccess } = useQuery({
        queryKey: ['notif'],
        queryFn: fetchNotifications
    })

    return (
        <div className="flex flex-col pt-10 items-center bg-lightBlue min-h-screen text-black">
            <div className="font-semibold text-5xl">Notifications</div>
            <div className="flex flex-col">
                {isSuccess && <Notifications 
                    data={data['notifications']}
                    type='weekly'
                    title='Last 7 days'
                />}
            </div>
            <div className="flex flex-col">
                {isSuccess && <Notifications 
                    data={data['notifications']}
                    type='monthly'
                    title='Last 30 days'
                />}
            </div>
            <div className="flex flex-col">
                {isSuccess && <Notifications 
                    data={data['notifications']}
                    type='older'
                    title='Older'
                />}
            </div>
        </div>
    )
}