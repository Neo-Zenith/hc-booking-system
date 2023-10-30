import { useTheme } from '@emotion/react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '95vh',
                backgroundColor: '#f5f5f5',
                columnGap: '10%',
            }}
        >
            <img
                src="https://cdn.pixabay.com/photo/2013/07/13/11/44/penguin-158551_960_720.png"
                alt="404 Not Found"
                width={280}
                height={280}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h1" component="h1" align="center">
                    Uh Oh!! Page Not Found
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    my={2}
                    sx={{ color: theme.palette.neutral[500] }}
                >
                    I didn't eat it. I swear!!
                </Typography>
                <Button variant="contained" sx={{ margin: 'auto' }} onClick={() => navigate('/')}>
                    <Typography>Back to Home</Typography>
                </Button>
            </div>
        </Box>
    );
}
