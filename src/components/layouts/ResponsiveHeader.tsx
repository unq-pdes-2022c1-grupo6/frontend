import {Heading, Box, Header, Button, Anchor, Nav, ResponsiveContext, Menu} from 'grommet';
import {Logout as LogoutIcon, Menu as MenuIcon} from 'grommet-icons';
import {useAuth} from "../../state/auth";
import {useLocation, useNavigate} from "react-router-dom";
import {DIRECTOR_ROUTE, getUserNav, LOGIN_ROUTE} from "../../utils/routes";

export const ResponsiveHeader = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Header background="brand" pad="medium" sticky="scrollup">
            <Box direction="row" align="center" gap="small">
                <Heading level={3} margin="none">UNQUE</Heading>
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
                    <Heading level={5} margin="none">{auth?.user}</Heading>}
            </Box>
            <ResponsiveContext.Consumer>
                {size =>
                    size === "small" ?
                        <Menu
                            icon={<MenuIcon/>}
                            items={getUserNav(location.pathname, auth?.rol).map(({name, to}) => {
                                return ({
                                    label: name,
                                    onClick: () => navigate(to),
                                    disabled: location.pathname === "/" + to
                                })
                            })}
                        /> :
                        <Nav direction="row">
                            {getUserNav(location.pathname, auth?.rol).map(({name, to}) => {
                                return <Anchor
                                    key={name}
                                    color="text"
                                    label={name}
                                    disabled={location.pathname === "/" + to}
                                    onClick={() => navigate(to)}/>
                            })}
                        </Nav>}
            </ResponsiveContext.Consumer>
        </Header>
    );
};

export default ResponsiveHeader;
