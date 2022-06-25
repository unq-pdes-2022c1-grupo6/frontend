import {createContext, ReactNode, useContext, useState} from "react";
import {NotificationProps, StatusType} from "grommet";


export interface GlobalNotificatorType {
    notification: NotificationProps,
    setNotification: (message: string, status?: StatusType) => void,
    deleteNotification: () => void
}


const GlobalNotificatorContext = createContext<GlobalNotificatorType | null>(null);


const GlobalNotificatorProvider = ({children}: { children: ReactNode }) => {
    const [notification, setNotif] = useState<NotificationProps>({});

    const setNotification = (message: string, status: StatusType = "normal") => {
        setNotif({message, status});
    }

    const deleteNotification = () => setNotif({});

    return <GlobalNotificatorContext.Provider value={{notification, setNotification, deleteNotification}}>
        {children}
    </GlobalNotificatorContext.Provider>
}


const useGlobalNotificator = () => useContext(GlobalNotificatorContext);

export {GlobalNotificatorProvider, useGlobalNotificator}