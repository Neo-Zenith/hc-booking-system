import { useTheme } from '@emotion/react';

export default function WithListingPage({ table }) {
    const theme = useTheme();

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    minHeight: '100vh',
                    justifyContent: 'center',
                    padding: '2% 5%',
                    paddingTop: '15rem',
                    boxSizing: 'border-box',
                    backgroundColor: theme.palette.neutral[100],
                }}
            >
                {table}
            </div>
        </>
    );
}
