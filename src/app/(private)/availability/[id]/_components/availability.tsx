'use client'
import { useUser } from '@/utils/context/userContext';
import { useEffect, useState } from 'react';
import { getHangoutInfo, getMeetupOptions } from '../actions';
import CreatorPage from './creatorPage';
import VoterPage from './voterPage';
import toast from 'react-hot-toast';


interface Props {
    id: string
}

type MeetupOption = {
    id: string,
    option: string
}

export default function Availability({id}: Props) {
    const user = useUser();
    const [isCreator, setIsCreator] = useState<boolean>(false);
    const [displayTitle, setDisplayTitle] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [options, setOptions] = useState<MeetupOption[]>([]);
    
    useEffect(() => {
        const hangoutInfo = async () => {
            try {
                const info = await getHangoutInfo(id);
                if (info.hangout_info?.creator_id == user?.auth_id) {
                    setIsCreator(true);
                }
                setDisplayTitle(info.hangout_info?.title!);
                setIsLoading(false);
            } catch(error){
                toast.error('An error occurred while loading hangout info. Please try refreshing.');
                console.error('Error loading hangout info:', error);
                setIsLoading(false);
            }
        }
        hangoutInfo();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const loadMeetupOptions = async () => {
            try {
                const info = await getMeetupOptions(id);
                setOptions(info?.options);
                setIsLoading(false);
            } catch(error) {
                toast.error('An error occurred while loading options. Please try refreshing.');
                console.error('Error loading meetup options:', error);
                setIsLoading(false);
            }
        }
        if (!isCreator) loadMeetupOptions();
    }, [isCreator, displayTitle]);

    if (isLoading) {
        return (
            <div className='bg-lightBlue w-full h-screen'></div>
        )
    }

    return (
        <>
            {isCreator ? (<CreatorPage title={displayTitle} hangout_id={id}/>) : (<VoterPage options={options} title={displayTitle} hangout_id={id}/>)}
        </>
    )
}