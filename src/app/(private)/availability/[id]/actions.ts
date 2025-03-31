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
