import './index.css';
import createTheme from './themes/create-theme';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VenueBookingPage from './pages/BookingPage/VenueBookingPage';
import DenseAppBar from './components/AppBar/DenseAppBar';
import ItemBookingPage from './pages/BookingPage/ItemBookingPage';

function App() {
    const theme = createTheme();
    return (
        <>
            <ThemeProvider theme={theme}>
                <Router>
                    <DenseAppBar />
                    <Routes>
                        <Route path="/venues/book" element={<VenueBookingPage />} />
                        <Route path="/items/book" element={<ItemBookingPage />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
