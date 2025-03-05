import Image from 'next/image'
import Random from '../../../../../public/random.jpg'

type notification = {
    id: number,
    user_id: string,
    message: string, 
    is_read: boolean, 
    created_at: string, 
    sender: string | null, 
    type: string 
}

type Props = {
    notif: notification
}

export default function Notification({notif}: Props) {

    const showButtons = notif.type == 'meetup-request' || notif.type == 'friend-request'

  return (
    <div className="flex gap-2 items-center justify-between">
        <div className='flex items-center gap-3'>
            <Image
                src={Random}
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
            <button className='px-3 py-1 sm:px-4 sm:py-2 text-sm font-medium bg-gold text-black rounded-md border-black'>Accept</button>
            <button className='px-3 py-1 sm:px-4 sm:py-2 text-sm font-medium bg-jetBlack text-gray-400 rounded-md border-black'>Decline</button>
        </div>) : 
        (<div>
            <button className='px-3 py-1 sm:px-4 sm:py-2 text-sm font-medium bg-jetBlack text-gray-400 rounded-md border-black'>Delete</button>
        </div>)
        }
    </div>
  )
}
