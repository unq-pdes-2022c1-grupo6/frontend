import {Heading, Box, Header, Button, Anchor} from 'grommet';
import {Logout as LogoutIcon} from 'grommet-icons';
import {useAuth} from "../../state/auth";
import {useLocation, useNavigate} from "react-router-dom";
import {DIRECTOR_ROUTE, getUserNav, LOGIN_ROUTE} from "../../utils/routes";

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
                {auth?.isLogged &&
                    <Button
                        icon={<LogoutIcon/>}
                        hoverIndicator
                        onClick={() => {
                            auth?.logout();
                            navigate(auth?.rol === "Directivo" ? "/" + DIRECTOR_ROUTE : LOGIN_ROUTE)
                        }}
                    />}
                {auth?.isLogged &&
                    <Heading level="5">{auth?.user}</Heading>}
            </Box>
            <Box justify="end" direction="row" gap="medium">
                {getUserNav(location.pathname, auth?.rol).map(({name, to}) => {
                    return <Anchor
                        key={name}
                        color="text"
                        label={name}
                        disabled={location.pathname === "/" + to}
                        onClick={() => navigate(to)}/>
                })}
            </Box>
        </Header>
    );
};

export default ResponsiveHeader;
