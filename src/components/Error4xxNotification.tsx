import {Notification} from 'grommet';

type Error4xxNotificationProps = {
    notification: string,
    onCloseNotification: () => void
}

const Error4xxNotification = ({notification, onCloseNotification}: Error4xxNotificationProps) => {

    return <Notification
        status="critical"
        message={notification}
        onClose={onCloseNotification}
        global
    />

};

export default Error4xxNotification;
