import { createTheme as createMuiTheme } from '@mui/material';
import createComponents from './create-component';
import createPalette from './create-palette';
import createTypography from './create-typography';

export default function createTheme() {
    const palette = createPalette();
    const components = createComponents({ palette });
    const typography = createTypography();

    return createMuiTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1440,
            },
        },
        components,
        palette,
        typography,
    });
}
