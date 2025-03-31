import { getApiBase } from "@/utils/etc/apiBase";
import { HangoutAvailabilityInfo } from "@/types/hangout";

export async function getHangoutInfo(id: string): Promise<hangout_response>  {
    const base = getApiBase()
    const response = await fetch(`${base}/get-hangout-info`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hangout_id: id! })
    });

    if (!response.ok) {
        console.error("Failed to get hangout information:", response.statusText);
        return { status: response.status, hangout_info: null };
    }

    const json = await response.json();

    return json;
}

type hangout_response = {
    status: number
    hangout_info: HangoutAvailabilityInfo | null
}

export async function submitAvailabilityOptions(options: string[], hangout_id: string) {
    const base = getApiBase()
    const response = await fetch(`${base}/create-poll`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hangout_id: hangout_id!, options: options })
    });

    if (!response.ok) {
        console.error("Failed to post data:", response.statusText);
        return { status: response.status, message: 'Something went wrong posting meetup options'};
    }

    const json = await response.json();

    return json;
}

export async function getMeetupOptions(hangout_id: string) {
    const base = getApiBase()
    const response = await fetch(`${base}/get-poll`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hangout_id: hangout_id!})
    });

    if (!response.ok) {
        console.error("Failed to retrieve options:", response.statusText);
        return { status: response.status, options: []};
    }

    const json = await response.json();

    return json;
}

export async function submitOptionVotes(hangout_id:string, user_id: string, option_ids: string[]) {
    const base = getApiBase()
    const response = await fetch(`${base}/vote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hangout_id: hangout_id!, user_id: user_id, option_ids: option_ids})
    });

    if (!response.ok) {
        console.error("Failed to post votes:", response.statusText);
        return { status: response.status, message: "Failed to post votes"};
    }

    const json = await response.json();

    return json;
}