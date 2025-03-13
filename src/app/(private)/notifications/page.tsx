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
            <div className="flex flex-col pt-10 items-center bg-lightBlue min-h-screen text-black">
                <div className="font-semibold text-5xl">Notifications</div>
                <div className="mt-5 text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col pt-10 items-center bg-lightBlue min-h-screen text-black">
            <div className="font-semibold text-5xl">Notifications</div>

            {isSuccess && (data?.notifications?.length === 0 ? (
                <div className="mt-5 text-lg">No notifications yet</div>
            ) : (
                <>
                    <div className="flex flex-col">
                        <Notifications
                            data={data.notifications}
                            type="weekly"
                            title="Last 7 days"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Notifications
                            data={data.notifications}
                            type="monthly"
                            title="Last 30 days"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Notifications
                            data={data.notifications}
                            type="older"
                            title="Older"
                        />
                    </div>
                </>
            ))}
        </div>
    );
}
