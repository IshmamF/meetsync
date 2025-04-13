export interface HangoutAvailabilityInfo {
    creator_id: string,
    title: string, 
} 

export type MeetupTimeStatus = {
    "hangout_id": string,
    "address": string,
    "transport": string,
    "travel_time": number,
    "user_id": string
}