import Image from 'next/image'
import globe from './../../../../../public/globe.svg';
import {deleteNotification, acceptDeclineNotification} from '../actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notification, NotificationType } from '@/types/notifications'
import { useUser } from '@/utils/context/userContext';
import { redirect } from 'next/navigation';

type Props = {
    notif: notification
}

export default function Notification({notif}: Props) {

    const user = useUser();

    const showAcceptDeclineButton = notif.type == NotificationType.HANGOUT_INVITE;
    const showViewButton = notif.type != 'general';
    const queryClient = useQueryClient();
    const acceptDeclineMutation = useMutation({
        mutationFn: acceptDeclineNotification,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notif']});
        },
    });
    const deleteMutation = useMutation({
        mutationFn: deleteNotification,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notif']});
        },
    });

    const handleAccept = () => {
        acceptDeclineMutation.mutate({notif: notif, accept: true});
    }

    const handleDecline = () => {
        acceptDeclineMutation.mutate({notif: notif, accept: false});
    }

    const handleDelete = () => {
        deleteMutation.mutate({user_id: user?.auth_id, notification_id: notif.id});
    }

    const handleView = () => {
        switch (notif.type) {
            case NotificationType.FRIEND_REQUEST:
                redirect('/friends')
            default:
                redirect('/hangouts')
        }
    }
    const defaultProfileImage = 'https://images.unsplash.com/photo-1658227387870-6b7d4d6ff031?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div className="flex gap-2 items-center justify-between">
        <div className='flex items-center gap-3'>
            <img
                src={notif.users.profile_img || defaultProfileImage}
                width={49}
                height={49}
                alt="User profile"
                className="rounded-full border-gold border-2"
            />

            <div className="flex gap-1 text-sm sm:text-xl items">
                <div>{notif.message}</div>
            </div>
        </div>
            {showAcceptDeclineButton ? (
                <div className="flex items-center gap-2">
                    <button onClick={handleAccept} className="px-3 py-1 sm:px-4 sm:py-2 text-sm font-medium bg-gold text-black rounded-md border-black">
                        Accept
                    </button>
                    <button onClick={handleDecline} className="px-3 py-1 sm:px-4 sm:py-2 text-sm font-medium bg-jetBlack text-gray-400 rounded-md border-black">
                        Decline
                    </button>
                </div>
            ) : showViewButton ? (
                <div className=''>
                    <button onClick={handleView} className="px-3 py-1 sm:px-4 sm:py-2 text-sm font-medium bg-gold text-black rounded-md border-black">
                        View
                    </button>
                </div>
            ) : (
                <div>
                    <button onClick={handleDelete} className="px-3 py-1 sm:px-4 sm:py-2 text-sm font-medium bg-jetBlack text-gray-400 rounded-md border-black">
                        Delete
                    </button>
                </div>
            )}
    </div>
  )
}
