import { Toolbar, Typography, alpha } from '@mui/material';

export default function TableToolbar({ title, numSelected }) {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <Typography variant="h3">{title}</Typography>
        </Toolbar>
    );
}
