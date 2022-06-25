import {Notification, NotificationProps} from 'grommet';
import {useEffect} from "react";
import isEmpty from "lodash/isEmpty";

type GlobalNotificatorProps = {
    notification?: NotificationProps,
    onCloseNotification?: () => void
}

// los parametros nunca van a estar vacios, es un problema de usar context
// eslint-disable-line
const GlobalNotificator = ({notification = {}, onCloseNotification = () => {}}: GlobalNotificatorProps) => {

        useEffect(() => {
                const timer = setTimeout(() => {
                    onCloseNotification();
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
        onClose={onCloseNotification}
    /> :
    <></>

}
;

export default GlobalNotificator;
