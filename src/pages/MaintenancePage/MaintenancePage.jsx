import { Box, Typography, CircularProgress } from '@mui/material';
import Footer from '../../components/Footer/Footer';

export default function MaintenancePage() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
                gap: '3rem',
            }}
        >
            <Box
                sx={{
                    marginTop: 'max(25vh, 10rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 4,
                    backgroundColor: 'white',
                    borderRadius: 4,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <img
                    src="https://cdn.pixabay.com/photo/2012/04/16/11/39/plumber-35611__340.png"
                    alt="Under Construction"
                    width={280}
                    height={280}
                />
                <Typography variant="h5" component="h1" align="center">
                    Construction in Progress
                </Typography>
                <Typography variant="body1" align="center" my={2}>
                    This feature is currently under construction.
                </Typography>
                <CircularProgress color="primary" />
            </Box>
            <div
                style={{
                    marginTop: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                }}
            >
                <Footer />
            </div>
        </Box>
    );
}
