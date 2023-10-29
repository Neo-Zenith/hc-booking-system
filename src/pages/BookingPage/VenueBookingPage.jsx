import VenueBookingForm from '../../components/BookingForm/VenueBookingForm';
import WithBookingPage from './WithBookingPage';

export default function VenueBookingPage() {
    const bookingForm = <VenueBookingForm />;
    return (
        <>
            <WithBookingPage bookingForm={bookingForm} />
        </>
    );
}
