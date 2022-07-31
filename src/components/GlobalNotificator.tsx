import {Notification, NotificationProps} from "grommet";
import isEmpty from "lodash/isEmpty";


const GlobalNotificator = ({onClose = () => {}, ...props}: NotificationProps) => {

    return !isEmpty(props) ?
        <Notification toast {...props} onClose={onClose}/> :
        <></>

};

export default GlobalNotificator;
