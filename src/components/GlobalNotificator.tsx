import {Notification, NotificationProps} from 'grommet';
import {useEffect} from "react";
import isEmpty from "lodash/isEmpty";

type GlobalNotificatorProps = {
    notification?: NotificationProps,
    onCloseNotification?: () => void
}

// los parametros nunca van a estar vacios, es un problema de usar context
const GlobalNotificator = ({notification = {}, onCloseNotification}: GlobalNotificatorProps) => {

        useEffect(() => {
                const timer = setTimeout(() => {
                    onCloseNotification && onCloseNotification();
                }, 10000);
                return () => {
                    clearTimeout(timer);
                };
            }, [notification, onCloseNotification]
        )

return !isEmpty(notification) ?
    <Notification
        global
        {...notification}
        onClose={() => onCloseNotification && onCloseNotification()}
    /> :
    <></>

}
;

export default GlobalNotificator;
