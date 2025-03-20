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

export const acceptNotification = async (input: {notif: notification}) => {
    let message = ''

    try {
        switch (input.notif.type) {
            case NotificationType.FRIEND_REQUEST:
                message = `You accepted ${input.notif.users.username}'s friend request`;
                await acceptFriendRequest(input.notif);
                break;

            case NotificationType.HANGOUT_INVITE:
                message = `You accepted the hangout invite`;
                await acceptHangoutInvite(input.notif);
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

export const declineNotification = async (input: {notif_type: NotificationType, notification_id: number}) => {
    const supabase = await createClient();
    const message = ''
    try {
        const { error } = await supabase.from('notifications').update({message: message, type: 'general'}).eq('id', input.notification_id.toString());
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

const acceptFriendRequest = async (notif: notification) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/add-friend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ friendship_id: 'HOW DO I GET FRIENDSHIP ID' }),
        });

        if (!response.ok) throw new Error("Failed to accept friend request");
        return await response.json();
    } catch (err) {
        console.error("Error accepting friend request:", err);
        throw err;
    }
};

const acceptHangoutInvite = async (notif: notification) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/accept-invite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ hangout_id: notif.hangout_id, user_id: notif.id }),
        });

        if (!response.ok) throw new Error("Failed to accept hangout invite");
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
