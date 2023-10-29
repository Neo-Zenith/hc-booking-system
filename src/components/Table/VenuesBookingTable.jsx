import { useEffect, useState } from 'react';
import Table from './Table';
import { supabase } from '../../App';

export default function VenuesBookingTable() {
    const [bookings, setBookings] = useState([]);

    const headCells = [
        {
            id: 'uuid',
            numeric: false,
            label: 'UUID',
        },
        {
            id: 'event',
            numeric: false,
            label: 'Event',
        },
        {
            id: 'division',
            numeric: true,
            label: 'Division',
        },
        { id: 'venue', numeric: false, label: 'Venue' },
        {
            id: 'eventDate',
            numeric: false,
            label: 'Event Date',
        },
        {
            id: 'createdAt',
            numeric: false,
            label: 'Created at',
        },
        {
            id: 'status',
            numeric: false,
            label: 'Status',
        },
    ];

    const fetchVenuesBooking = async () => {
        const response = await supabase
            .from('venuesBooking')
            .select(`uuid, event, division, eventDate, createdAt, status, venues(name)`);
        const { data } = response;
        setBookings(() => {
            return data.map((d) => {
                return {
                    uuid: d.uuid,
                    event: d.event,
                    division: d.division,
                    eventDate: d.eventDate,
                    createdAt: d.createdAt,
                    venue: d.venues.name,
                    status: d.status.slice(0, 1).toUpperCase() + d.status.slice(1),
                };
            });
        });
    };

    useEffect(() => {
        fetchVenuesBooking();
    }, []);

    return (
        <Table
            title={'Venues Booking'}
            headCells={headCells}
            defaultRowsPerPage={5}
            defaultOrderBy={'name'}
            defaultOrderStatus={'asc'}
            rows={bookings}
        />
    );
}
