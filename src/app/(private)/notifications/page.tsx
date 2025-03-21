'use client'

import { Notifications } from './_components/notifications';
import { fetchNotifications } from './actions';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/utils/context/userContext';

export default function Notification() {
    const user = useUser();
    
    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['notif'],
        queryFn: () => fetchNotifications(user?.auth_id)
    });

    if (isLoading) {
        return (
            <div className="flex flex-col px-4 pt-10 items-center bg-lightBlue min-h-screen text-black">
                <div className="font-semibold text-5xl mb-6">Notifications</div>
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col px-4 pt-10 items-center bg-lightBlue min-h-screen text-black">
            <div className="font-semibold text-5xl mb-8">Notifications</div>

            <div className="w-full max-w-3xl">
                {isSuccess && (data?.notifications?.length === 0 ? (
                    <div className="text-lg text-center">No notifications yet</div>
                ) : (
                    <>
                        <Notifications
                            data={data.notifications}
                            type="weekly"
                            title="Last 7 days"
                        />
                        <Notifications
                            data={data.notifications}
                            type="monthly"
                            title="Last 30 days"
                        />
                        <Notifications
                            data={data.notifications}
                            type="older"
                            title="Older"
                        />
                    </>
                ))}
            </div>
        </div>
    );
}