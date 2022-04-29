import {Anchor, Heading, Box, Header, Menu, ResponsiveContext, Button, Nav} from 'grommet';
import {Logout as LogoutIcon} from 'grommet-icons';
import {useAuth} from "../state/auth";

export const ResponsiveHeader = () => {
    const auth = useAuth();

    return (
        <Header
            background="brand"
            pad={{left: 'medium', right: 'medium'}}
            height="xsmall"
        >
            <Box direction="row" align="center" gap="medium">
                <Heading level='3' margin='none'>UNQUE</Heading>
                {auth?.logged_in &&
                <Button
                    icon={<LogoutIcon/>}
                    hoverIndicator
                    onClick={() => auth?.logout()}
                />}
            </Box>
            {auth?.role === "director" && <ResponsiveContext.Consumer>
                {(responsive) =>
                    responsive === 'small' ? (
                        <Menu
                            label="Opciones"
                            items={[
                                {
                                    label: 'Historial académico', onClick: () => {
                                    }
                                },
                                {
                                    label: 'Oferta académica', onClick: () => {
                                    }
                                },
                                {
                                    label: 'Solicitudes', onClick: () => {
                                    }
                                },
                            ]}
                        />
                    ) : (
                        <Nav direction="row">
                            <Anchor color="text" href="#" label="Historial académico"/>
                            <Anchor color="text" href="#" label="Oferta académica"/>
                            <Anchor color="text" href="#" label="Solicitudes"/>
                        </Nav>
                    )
                }
            </ResponsiveContext.Consumer>}
        </Header>
    );
};

export default ResponsiveHeader;