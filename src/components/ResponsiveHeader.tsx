import {Tab, Tabs, Heading, Box, Header, Menu, ResponsiveContext, Button} from 'grommet';
import {Logout as LogoutIcon} from 'grommet-icons';
import {useAuth} from "../state/auth";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {DIRECTOR_NAV} from "../utils/constants";

export const ResponsiveHeader = () => {
    const auth = useAuth();
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const onActive = (nextIndex: number) => {
        setIndex(nextIndex);
        navigate(DIRECTOR_NAV[nextIndex].to)
    };

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
                        onClick={() => auth?.logout()}
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
                        <Tabs activeIndex={index} onActive={onActive} justify="start">
                            {DIRECTOR_NAV.map(({name}, index,) => <Tab key={index} title={name}/>)}
                        </Tabs>
                    )
                }
            </ResponsiveContext.Consumer>}
        </Header>
    );
};

export default ResponsiveHeader;