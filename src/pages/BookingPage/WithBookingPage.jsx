import { useTheme } from '@emotion/react';

export default function WithBookingPage({ bookingForm }) {
    const theme = useTheme();

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '95vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2% 5%',
                    boxSizing: 'border-box',
                    backgroundColor: theme.palette.neutral[100],
                }}
            >
                {bookingForm}
            </div>
        </>
    );
}
