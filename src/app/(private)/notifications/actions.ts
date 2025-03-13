"use server"
import { useUser } from "@/utils/context/userContext";
import { createClient } from "@/utils/supabase/server";
import { notification } from '@/types/notifications'

export const fetchNotifications = async (): Promise<notif_response> => {
    const user = useUser();

    try {
        const response = await fetch("/api/get-notifications", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: user?.auth_id })
        });

        if (!response.ok) {
            console.error("Failed to fetch notifications:", response.statusText);
            return { status: response.status, notifications: [] };
        }

        const json = await response.json();
        console.log("Fetched notifications:", json);

        return json;
    } catch (err) {
        console.error("Error fetching notifications:", err);
        return { status: 500, notifications: [] };
    }
};


export const deleteNotification = async (input: {notification_id: number}) => {
    const user = useUser();

    try {
        const response = await fetch("/api/delete-notification", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: user?.auth_id, notification_id: input.notification_id.toString()})
          });
        return response.json();
    } catch (err) {
        console.error("Error deleting notifications:", err);
        return Promise.resolve({status: 500, message: "Something went wrong with deleting notification" });
    }
}

export const updateNotification = async (input: {msg: string, notification_id: number}) => {
    const supabase = await createClient();

    try {
        const { error } = await supabase.from('notifications').update({message: input.msg, type: 'general'}).eq('id', input.notification_id.toString());
        if (error) {
            console.error("Error updating notification:", error);
            return Promise.resolve({status: 500, message: "Something went wrong with updating notification"});
        }
        return Promise.resolve({ status: 200, message: "Notification updated successfully" });
    } catch (err) {
        console.error("Error updating notifications:", err);
        return Promise.resolve({status: 500, message: "Something went wrong with updating notification"});
    }
}

type notif_response = {
    status: number
    notifications: notification[]
}
