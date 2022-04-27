import {Box} from "grommet";
import {ReactNode} from "react";


const Header = ({ children }: { children: ReactNode }) =>
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{left: 'medium', right: 'small', vertical: 'small'}}
        elevation='medium'
        style={{zIndex: '1'}}
    >
        {children}
    </Box>

export default Header