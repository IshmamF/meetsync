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
    
    useEffect(() => {
        const hangoutInfo = async () => {
            const info = await getHangoutInfo(id);
            if (info.hangout_info?.creator_id == user?.auth_id) {
                setIsCreator(true);
            }
            setDisplayTitle(info.hangout_info?.title!);
        }
        hangoutInfo();
    }, [])

    return (
        <>
            <div>{displayTitle}</div>
            {isCreator ? (<CreatorPage/>) : (<VoterPage/>)}
        </>
    )
}