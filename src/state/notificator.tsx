import {useState} from "react";
import {NotificationProps, StatusType} from "grommet";
import {useOutletContext} from "react-router-dom";


export const useNotification = () => {
    const [notif, setNotif] = useState<NotificationProps>({});

    const setNotification = (message: string, status: StatusType = "normal") => {
        setNotif({message, status});
    }

    const deleteNotification = () => setNotif({});

    return {notification: notif, setNotification, deleteNotification}
}


export const useGlobalNotificator = () => {
    return useOutletContext<{ setNotification: (message: string, status: StatusType) => void }>();
}

