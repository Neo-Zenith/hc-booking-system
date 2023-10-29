import VenuesTable from '../../components/Table/VenuesTable';
import WithListingPage from './WithListingPage';

export default function VenuesListingPage() {
    const table = <VenuesTable />;

    return <WithListingPage table={table} />;
}
