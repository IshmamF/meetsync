import Image from 'next/image'
import Random from '../../../../../public/random.jpg'

type notification = {
    imgLink: string;
    name: string;
    message: string;
    time: string;
    type: string;
}

type Props = {
    notif: notification
}

export default function Notification({notif}: Props) {

    const showButtons = notif.type == 'meetup-request' || notif.type == 'friend-request'

    const calcDifferenceUTC = (a: Date, b: Date) => {
        const MINUTES = 1000 * 60;
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes());
        return Math.floor((utc2 - utc1) / MINUTES); 
    }

    const calcTimeSinceNotif = (dateString: string) => {
        const DateTime = new Date(dateString);
        const currentDateTime = new Date();
        const difference = calcDifferenceUTC(DateTime, currentDateTime);
        if (difference < 60) {
            return `${difference}m`;
        } else if (difference < 1440) {
            const hours = Math.floor(difference / 60);
            return `${hours}h`
        } else {
            const days = Math.floor(difference / (60 * 24));
            return `${days}d`
        }
    }

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
            <div className="flex gap-1 text-xl items">
                <div>{notif.name}</div>
                <div>{notif.message}</div>
                <div>{calcTimeSinceNotif(notif.time)}</div>
            </div>
        </div>
        {showButtons ? 
        (<div className="flex items-center gap-2">
            <button className='px-4 py-2 bg-gold text-black rounded-md border-black'>Accept</button>
            <button className='px-4 py-2 bg-jetBlack text-gray-400 rounded-md border-black'>Decline</button>
        </div>) : 
        (<div>
            <button className='px-4 py-2 bg-jetBlack text-gray-400 rounded-md border-black'>Delete</button>
        </div>)
        }
    </div>
  )
}
