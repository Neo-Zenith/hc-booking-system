import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';

export default function Footer() {
    const theme = useTheme();
    return (
        <div
            style={{
                marginBottom: '0.4rem',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: '4.6vh',
                alignItems: 'flex-end',
                backgroundColor: theme.palette.neutral[100],
            }}
        >
            <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                Built and designed by Lee Juin © 2023 |&nbsp;
                <Link
                    sx={{
                        color: theme.palette.primary,
                        textDecorationColor: theme.palette.primary,
                    }}
                    href="https://github.com/Neo-Zenith"
                    target="_blank"
                >
                    GitHub
                </Link>
            </Typography>
        </div>
    );
}
