import {Heading, Box, Header, Button, Anchor} from 'grommet';
import {Logout as LogoutIcon} from 'grommet-icons';
import {useAuth} from "../state/auth";
import {useLocation, useNavigate} from "react-router-dom";
import {getStudentNav, LOGIN_ROUTE} from "../utils/routes";

export const ResponsiveHeader = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Header
            background="brand"
            pad={{horizontal: 'medium'}}
        >
            <Box direction="row" align="center" gap="medium">
                <Heading level='3'>UNQUE</Heading>
                {auth?.isStudentLogged &&
                    <Button
                        icon={<LogoutIcon/>}
                        hoverIndicator
                        onClick={() => {
                            auth?.logout()
                            navigate(LOGIN_ROUTE)
                        }}
                    />}
                {auth?.isStudentLogged &&
                    <Heading level="5"> DNI {auth?.student}</Heading>}
            </Box>
            <Box justify="end" direction="row" gap="medium">
                {getStudentNav(auth?.student).map(({name, to}) => {
                    return <Anchor
                        key={name}
                        color="text"
                        label={name}
                        disabled={location.pathname + location.search === "/" + to}
                        onClick={() => navigate(to)}/>
                })}
            </Box>
        </Header>
    );
};

export default ResponsiveHeader;
