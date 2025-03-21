"use server"
import { createClient } from "@/utils/supabase/server";
import { notification, NotificationType } from '@/types/notifications'

export const fetchNotifications = async (user_id: string | undefined): Promise<notif_response> => {

    try {
        const response = await fetch("http://127.0.0.1:8000/get-notifications", {
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
        //console.log("Fetched notifications:", json);

        return json;
    } catch (err) {
        console.error("Error fetching notifications:", err);
        return { status: 500, notifications: [] };
    }
};

export const deleteNotification = async (input: {user_id: string | undefined, notification_id: number}) => {

    try {
        const response = await fetch("http://127.0.0.1:8000/remove-notification", {
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

export const acceptDeclineNotification = async (input: {notif: notification, accept: boolean}) => {
    let message = ''

    try {
        switch (input.notif.type) {
            case NotificationType.HANGOUT_INVITE:
                input.accept  ? message = `You accepted the hangout invite from ${input.notif.users.username}` : message = `You declined the hangout invite from ${input.notif.users.username}`
                await acceptDeclineHangoutInvite(input.notif, input.accept);
                break;
            default:
                console.warn("Unhandled notification type:", input.notif.type);
                return { status: 400, error: "Unknown notification type" };
        }

        return await updateNotificationMessage(input.notif.id.toString(), message);
    } catch (err) {
        console.error("Error processing notification:", err);
        return { status: 500 };
    }

}

const acceptDeclineHangoutInvite = async (notif: notification, accept: boolean) => {
    let endpoint;
    accept ? endpoint = 'accept-invite' : endpoint = 'decline-invite'
    console.log(notif.hangout_id)
    console.log(notif.user_id)
    try {
        const response = await fetch(`http://0.0.0.0:8000/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ hangout_id: notif.hangout_id?.toString(), user_id: notif.user_id }),
        });

        if (!response.ok) {
            const responseText = await response.text();
            console.error("Error response:", responseText);
            return 
        };
        console.log('hangout accepted or declined')
        return await response.json();
    } catch (err) {
        console.error("Error accepting hangout invite:", err);
        throw err;
    }
};

const updateNotificationMessage = async (notification_id: string, new_message: string) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/update-notification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ notification_id, new_message }),
        });

        if (!response.ok) throw new Error("Failed to update notification");

        return await response.json();
    } catch (err) {
        console.error("Error updating notification:", err);
        throw err;
    }
};



type notif_response = {
    status: number
    notifications: notification[]
}
