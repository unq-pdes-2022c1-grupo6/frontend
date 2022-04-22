import {Box, Button, Collapsible, Layer} from "grommet";
import {Dispatch} from "react";
import {FormClose} from "grommet-icons";

type Props = {
    showSidebar: boolean
    setShowSidebar: Dispatch<boolean>
    size: string
}

const SideBar = ({showSidebar, setShowSidebar, size}: Props) => {

    if (!showSidebar || size !== 'small') {
        return <Collapsible direction="horizontal" open={showSidebar}>
            <Box
                flex
                width='medium'
                background='light-2'
                elevation='small'
                align='center'
                justify='center'>
                menu sidebar
            </Box>
        </Collapsible>
    }

    return <Layer>
        <Box
            background='light-2'
            tag='header'
            justify='end'
            align='center'
            direction='row'
        >
            <Button
                icon={<FormClose/>}
                onClick={() => setShowSidebar(false)}
            />
        </Box>
        <Box
            fill
            background='light-2'
            align='center'
            justify='center'
        >
            sidebar
        </Box>
    </Layer>

}

export default SideBar