import {grommet, ThemeType} from "grommet/themes";
import {deepMerge} from "grommet/utils";

export const theme: ThemeType = deepMerge(grommet, {
    global: {
        colors: {
            brand: '#8a2d3e',
            focus: '#26547c'
        },
        font: {
            family: 'Roboto',
            size: '16px',
            height: '20px',
        },
    },
    notification: {
        toast: {
            time: 10000,
            container: {
                width: 'xlarge',
                background: "light-2"
            }
        },
        info: {
            toast: {
                background: {
                    color: 'light'
                },
            }
        },
        critical: {
            toast: {
                background: {
                    color: '#ffecec'
                },
            }
        },
        warning: {
            toast: {
                background: {
                    color: '#fff6e7'
                },
            }
        },
        normal: {
            toast: {
                background: {
                    color: '#e5f9f2'
                },
            }
        },
    }
});