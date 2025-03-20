export interface notification {
    id: number,
    user_id: string,
    message: string, 
    is_read: boolean, 
    created_at: string, 
    sender: string | null, 
    type: NotificationType,
    users: userProfile,
    hangout_id: string | null
} 

export enum NotificationType {
    HANGOUT_INVITE = 'hangout-invite',
    FRIEND_REQUEST = 'friend-request',
    GENERAL = 'general',
    SELECT_AVAILABILITY = 'select-availability'
}


type userProfile = {
    username: string,
    profile_img: string | null
}