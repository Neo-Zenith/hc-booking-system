import ItemBookingForm from '../../components/BookingForm/ItemBookingForm';
import WithBookingPage from './WithBookingPage';

export default function ItemBookingPage() {
    const bookingForm = <ItemBookingForm />;
    return (
        <>
            <WithBookingPage bookingForm={bookingForm} />
        </>
    );
}
