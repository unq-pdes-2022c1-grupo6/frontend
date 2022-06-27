import {Box, Button} from "grommet";
import {useNavigate} from "react-router-dom";

const RequestingStudentsListPage = () => {
    const navigate = useNavigate();

    return <Box align="center" pad="large">
        <Button onClick={() => navigate("12345677")}/>
        Pagina de alumnos solicitantes
    </Box>

};

export default RequestingStudentsListPage;
