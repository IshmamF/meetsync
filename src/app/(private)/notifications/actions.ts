"use server"
import { createClient } from "@/utils/supabase/server";
import { notification } from '@/types/notifications'

export const fetchNotifications = async (user_id: string | undefined): Promise<notif_response> => {

    try {
        const response = await fetch("http://0.0.0.0:8000/get-notifications", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: user_id! })
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


export const deleteNotification = async (input: {user_id: string | undefined, notification_id: number}) => {

    try {
        const response = await fetch("api/delete-notification", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: input.user_id, notification_id: input.notification_id.toString()})
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
