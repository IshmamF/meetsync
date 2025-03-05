"use server"
import { createClient } from "@/utils/supabase/server";

export const fetchNotifications = async (): Promise<notif_response> => {
    const supabase = await createClient();
    const {data, error} = await supabase.auth.getUser();

    /* Uncomment this when merging to main
    if (error || !data?.user) {
        console.error("Error fetching user:", error);
        return {status: 500, notifications: []};
    } */

    const userId = data.user?.id;

    try {
        const response = await fetch("http://127.0.0.1:8000/get-notifications", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: "1697a418-f5b2-4fc4-9ba6-124f6a332c0a"})
          });
        return response.json();
    } catch (err) {
        console.error("Error fetching notifications:", err);
        return {status: 500, notifications: []};
    }

}

type notif_response = {
    status: number
    notifications: notification[]
}

type notification = {
    id: number,
    user_id: string,
    message: string, 
    is_read: boolean, 
    created_at: string, 
    sender: string | null, 
    type: string 
}