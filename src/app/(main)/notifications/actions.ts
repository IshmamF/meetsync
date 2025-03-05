"use server"
import { createClient } from "@/utils/supabase/server";

const API_URL = "http://127.0.0.1:8000"

export const fetchNotifications = async (): Promise<notif_response> => {
    const supabase = await createClient();
    const {data, error} = await supabase.auth.getUser();

    if (error || !data) {
        console.error("Error fetching user:", error);
        return Promise.resolve({status: 500, notifications: []});
    }

    const userId = data.user?.id;

    try {
        const response = await fetch(API_URL + "/get-notifications", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: userId})
          });
        return response.json();
    } catch (err) {
        console.error("Error fetching notifications:", err);
        return Promise.resolve({status: 500, notifications: []});
    }
}

export const deleteNotification = async (notification_id: number) => {
    const supabase = await createClient();
    const {data, error} = await supabase.auth.getUser();

    if (error || !data) {
        console.error("Error fetching user:", error);
        return Promise.resolve({status: 500, message: "Something went wrong with fetching user"});
    }
    const userId = data.user?.id;

    try {
        const response = await fetch(API_URL + "/delete-notification", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: userId, notification_id: notification_id.toString()})
          });
        return response.json();
    } catch (err) {
        console.error("Error deleting notifications:", err);
        return Promise.resolve({status: 500, message: "Something went wrong with deleting notification" });
    }
}

export const updateNotification = async (msg: string) => {
    const supabase = await createClient();
    const {data, error} = await supabase.auth.getUser();

    if (error || !data) {
        console.error("Error fetching user:", error);
        return Promise.resolve({status: 500, message: "Something went wrong with fetching user"});
    }
    const userId = data.user?.id;

    try {
        const { error } = await supabase.from('notifications').update({message: msg, type: 'general'}).eq('user_id', userId)
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

type notification = {
    id: number,
    user_id: string,
    message: string, 
    is_read: boolean, 
    created_at: string, 
    sender: string | null, 
    type: string 
}