import { useTheme } from '@emotion/react';
import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                bgcolor: theme.palette.neutral[100],
                minHeight: '95vh',
                alignItems: 'center',
                flexWrap: 'wrap',
                columnGap: '15rem',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    flex: '0.4 1 auto',
                    display: 'flex',
                    minWidth: '30rem',
                }}
            >
                <Typography sx={{ textAlign: 'center', width: '100%' }} variant="h1">
                    NTU Heritage Club Booking System
                </Typography>
            </div>
            <div
                style={{
                    flex: '0.4 1 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5rem',
                }}
            >
                <div>
                    <Typography variant="h4" sx={{ mb: '1.5rem' }}>
                        Start booking
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem' }}>
                        <Button variant="outlined" onClick={() => navigate('/items/book')}>
                            <Typography variant="body1">Book Item</Typography>
                        </Button>
                        <Button variant="contained" onClick={() => navigate('/venues/book')}>
                            <Typography variant="body1">Book Venue</Typography>
                        </Button>
                    </div>
                </div>
                <div>
                    <Typography variant="h4" sx={{ mb: '1.5rem' }}>
                        Developer?
                    </Typography>
                    <Typography variant="body1">
                        Access project repository{' '}
                        <Link
                            to={'https://github.com/Neo-Zenith/hc-booking-system'}
                            target="__blank"
                        >
                            here
                        </Link>
                    </Typography>
                </div>
            </div>
        </Box>
    );
}
