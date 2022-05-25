import {Notification} from 'grommet';

type SuccessfulProps = {
    setVisible: (value: boolean) => void;
    visible: boolean
}

const RequestFormSuccessful = ({setVisible, visible}: SuccessfulProps) => {

    return visible ?
        <Notification
            message="Al terminar el plazo, le informaremos los resultados"
            title="Solicitud Hecha!"
            onClose={() => setVisible(false)}
            status="normal" toast/>:
        <></>

};

export default RequestFormSuccessful;