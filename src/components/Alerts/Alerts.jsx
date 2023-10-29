import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

export default function Alerts({ type, message, open }) {
    const [localOpen, setLocalOpen] = useState(open);

    const handleClose = () => {
        setLocalOpen(false);
    };

    return (
        <Snackbar open={localOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
