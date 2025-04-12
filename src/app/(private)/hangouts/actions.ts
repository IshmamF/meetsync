import { MeetupTimeStatus } from "@/types/hangout";
import { getApiBase } from "@/utils/etc/apiBase";

export async function SaveParticipantMeetupTimeConfirmation(data: MeetupTimeStatus) {
    const base = getApiBase();
    const response = await fetch(`${base}/meetup-time-confirm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        console.error("Failed to post data:", response.statusText);
        return { status: response.status, message: 'Something went wrong confirming meetup time'};
    }

    const json = await response.json();
    return json;
}

export async function SaveParticipantMeetupTimeDecline(hangout_id: number, user_id: string) {
    const base = getApiBase();
    const response = await fetch(`${base}/meetup-time-decline`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"hangout_id": hangout_id, "user_id": user_id})
    });

    if (!response.ok) {
        console.error("Failed to post data:", response.statusText);
        return { status: response.status, message: 'Something went wrong declining meetup time'};
    }

    const json = await response.json();
    return json;
}