import Image from 'next/image'
import globe from './../../../../../public/globe.svg';
import {deleteNotification, updateNotification} from '../actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notification } from '@/types/notifications'

type Props = {
    notif: notification
}

export default function Notification({notif}: Props) {

    const showButtons = notif.type == 'meetup-request' || notif.type == 'friend-request';
    const queryClient = useQueryClient();
    const updateMutation = useMutation({
        mutationFn: updateNotification,
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
        updateMutation.mutate({msg: "this worked", notification_id: notif.id});
    }

    const handleDecline = () => {
        updateMutation.mutate({msg: "this worked", notification_id: notif.id});
    }

    const handleDelete = () => {
        deleteMutation.mutate({notification_id: notif.id});
    }

  return (
    <div className="flex gap-2 items-center justify-between">
        <div className='flex items-center gap-3'>
            <Image
                src={globe}
                width={49}
                height={49}
                alt=""
                className='rounded-full border-gold border-2 '
            />
            <div className="flex gap-1 text-sm sm:text-xl items">
                <div>{notif.message}</div>
            </div>
        </div>
        {showButtons ? 
        (<div className="flex items-center gap-2">
            <button onClick={handleAccept} className='px-3 py-1 sm:px-4 sm:py-2 text-sm font-medium bg-gold text-black rounded-md border-black'>Accept</button>
            <button onClick={handleDecline} className='px-3 py-1 sm:px-4 sm:py-2 text-sm font-medium bg-jetBlack text-gray-400 rounded-md border-black'>Decline</button>
        </div>) : 
        (<div>
            <button onClick={handleDelete} className='px-3 py-1 sm:px-4 sm:py-2 text-sm font-medium bg-jetBlack text-gray-400 rounded-md border-black'>Delete</button>
        </div>)
        }
    </div>
  )
}
