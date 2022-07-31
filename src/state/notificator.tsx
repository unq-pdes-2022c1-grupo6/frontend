import {createContext, ReactNode, useContext, useState} from "react";
import {NotificationProps, StatusType} from "grommet";


export interface GlobalNotificatorType {
    props: NotificationProps,
    setNotification: (message: string, status?: StatusType) => void,
    deleteNotification: () => void
}


const GlobalNotificatorContext = createContext<GlobalNotificatorType | null>(null);


const GlobalNotificatorProvider = ({children}: { children: ReactNode }) => {
    const [props, setProps] = useState<NotificationProps>({});

    const setNotification = (message: string, status: StatusType = "normal") => {
        setProps({message, status});
    }

    const deleteNotification = () => setProps({});

    return <GlobalNotificatorContext.Provider value={{props, setNotification, deleteNotification}}>
        {children}
    </GlobalNotificatorContext.Provider>
}


const useGlobalNotificator = () => useContext(GlobalNotificatorContext);

export {GlobalNotificatorProvider, useGlobalNotificator}