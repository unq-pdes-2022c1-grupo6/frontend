import {Notification, NotificationProps} from 'grommet';
import {useEffect} from "react";
import isEmpty from "lodash/isEmpty";

type GlobalNotificatorProps = {
    notification?: NotificationProps,
    onCloseNotification?: () => void
}

const GlobalNotificator = ({notification = {}, onCloseNotification = () => {}}: GlobalNotificatorProps) => {

        useEffect(() => {
                let timer = setTimeout(() => {
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
