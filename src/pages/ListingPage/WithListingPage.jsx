import { useTheme } from '@emotion/react';
import Footer from '../../components/Footer/Footer';

export default function WithListingPage({ table }) {
    const theme = useTheme();

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100vh',
                    alignItems: 'center',
                    padding: '2% 5% 0.4rem 5%',
                    gap: '3rem',
                    boxSizing: 'border-box',
                    backgroundColor: theme.palette.neutral[100],
                }}
            >
                <div style={{ marginTop: '10rem', display: 'flex', width: '100%' }}>{table}</div>
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
            </div>
        </>
    );
}
