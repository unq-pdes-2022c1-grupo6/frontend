import {Heading, Box, Header, Menu, ResponsiveContext, Button, Anchor, Nav} from 'grommet';
import {Logout as LogoutIcon} from 'grommet-icons';
import {useAuth} from "../state/auth";
import {useNavigate} from "react-router-dom";
import {DIRECTOR_NAV, LOGIN_ROUTE} from "../utils/routes";

export const ResponsiveHeader = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <Header
            background="brand"
            pad={{horizontal:'medium'}}
            margin={{bottom: "medium" }}
        >
            <Box direction="row" align="center" gap="medium">
                <Heading level='3'>UNQUE</Heading>
                {auth?.logged_in &&
                    <Button
                        icon={<LogoutIcon/>}
                        hoverIndicator
                        onClick={() => {
                            auth?.logout();
                            navigate(LOGIN_ROUTE)
                        }}
                    />}
            </Box>
            {auth?.role === "director" && <ResponsiveContext.Consumer>
                {(responsive) =>
                    responsive === 'small' ? (
                        <Menu
                            label="Menu"
                            items={DIRECTOR_NAV.map(({name, to}) => ({
                                label: name,
                                onClick: () => navigate(to)
                            }))}
                        />
                    ) : (
                        <Nav direction="row" align="center">
                            {DIRECTOR_NAV.map(({menu, name, to}, index) => {
                                return menu?
                                    <Menu key={index} label={name}
                                        items={menu.map(options =>  {
                                            return {
                                                label: options.name,
                                                onClick: () => {
                                                    navigate(to + options.to)
                                                }}
                                        })}
                                    />:
                                    <Anchor key={index} color="text" label={name} onClick={()=> navigate(to)} />
                            })}
                        </Nav>
                    )
                }
            </ResponsiveContext.Consumer>}
        </Header>
    );
};

export default ResponsiveHeader;