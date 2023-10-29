import VenuesBookingTable from '../../components/Table/VenuesBookingTable';
import WithListingPage from './WithListingPage';

export default function VenuesBookingListingPage() {
    const table = <VenuesBookingTable />;

    return <WithListingPage table={table} />;
}
