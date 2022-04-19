import {Box} from "grommet";

const Header = (props: any) =>
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{left: 'medium', right: 'small', vertical: 'small'}}
        elevation='medium'
        style={{zIndex: '1'}}
        {...props}
    />;

export default Header