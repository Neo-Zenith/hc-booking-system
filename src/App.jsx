import './index.css';
import createTheme from './themes/create-theme';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VenueBookingPage from './pages/BookingPage/VenueBookingPage';
import DenseAppBar from './components/AppBar/DenseAppBar';
import ItemBookingPage from './pages/BookingPage/ItemBookingPage';
import { createClient } from '@supabase/supabase-js';
import VenuesListingPage from './pages/ListingPage/VenuesListingPage';
import VenuesBookingListingPage from './pages/ListingPage/VenuesBookingListingPage';

export const supabase = createClient(
    'https://aivkivxyepaocejantjk.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpdmtpdnh5ZXBhb2NlamFudGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ2MjE5OTQsImV4cCI6MjAxMDE5Nzk5NH0._0WHbom46xbwEu6k7FlHxBJY5z1pCK4UmbDUtizsDRk',
);

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
                        <Route path="/venues" element={<VenuesListingPage />} />
                        <Route path="/venues/history" element={<VenuesBookingListingPage />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
