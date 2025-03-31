'use client'
import { useUser } from '@/utils/context/userContext';
import { useEffect, useState } from 'react';
import { getHangoutInfo } from '../actions';
import CreatorPage from './creatorPage';
import VoterPage from './voterPage';


interface Props {
    id: string
}

export default function Availability({id}: Props) {
    const user = useUser();
    const [isCreator, setIsCreator] = useState<boolean>(false);
    const [displayTitle, setDisplayTitle] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true);

    
    useEffect(() => {
        const hangoutInfo = async () => {
            const info = await getHangoutInfo(id);
            if (info.hangout_info?.creator_id == user?.auth_id) {
                setIsCreator(true);
            }
            setDisplayTitle(info.hangout_info?.title!);
            setIsLoading(false);
        }
        hangoutInfo();
    }, [])

    if (isLoading) {
        return (
            <div className='bg-lightBlue w-full h-screen'></div>
        )
    }

    return (
        <>
            {isCreator ? (<CreatorPage title={displayTitle} hangout_id={id}/>) : (<VoterPage/>)}
        </>
    )
}