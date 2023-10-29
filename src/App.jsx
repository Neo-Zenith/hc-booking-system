import './index.css';
import createTheme from './themes/create-theme';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VenueBookingPage from './pages/BookingPage/VenueBookingPage';
import DenseAppBar from './components/AppBar/DenseAppBar';

function App() {
    const theme = createTheme();
    return (
        <>
            <ThemeProvider theme={theme}>
                <DenseAppBar />
                <Router>
                    <Routes>
                        <Route path="/venues" element={<VenueBookingPage />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
