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
            id: 'eventStartTime',
            numeric: false,
            label: 'From',
        },
        {
            id: 'eventEndTime',
            numeric: false,
            label: 'To',
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

    const filters = [
        {
            id: 'event',
            label: 'Event Name',
            accept: 'string',
            filterBy: (row, value) => {
                if (value === '') {
                    return row;
                }
                if (row.event.toLowerCase().includes(value.toLowerCase())) {
                    return row;
                }
            },
        },
        {
            id: 'division',
            label: 'Division',
            accept: 'multi-selection',
            options: [
                { name: 'EXCO', value: 'EXCO' },
                { name: 'HCI', value: 'HCI' },
                { name: 'HDE', value: 'HDE' },
                { name: 'HEO', value: 'HEO' },
                { name: 'HGC', value: 'HGC' },
                { name: 'HW', value: 'HW' },
                { name: 'PNP', value: 'PNP' },
            ],
            filterBy: (row, value) => {
                if (value.length === 0) {
                    return row;
                }
                if (value.includes(row.division)) {
                    return row;
                }
            },
        },
        {
            id: 'status',
            label: 'Status',
            accept: 'multi-selection',
            options: [
                { name: 'Submitted', value: 'Submitted' },
                { name: 'Rejected', value: 'Rejected' },
                { name: 'Approved', value: 'Approved' },
            ],
            filterBy: (row, value) => {
                if (value.length === 0) {
                    return row;
                }
                if (value.includes(row.status)) {
                    return row;
                }
            },
        },
    ];

    const fetchVenuesBooking = async () => {
        const response = await supabase
            .from('venuesBooking')
            .select(
                `uuid, event, division, eventDate, createdAt, eventStartTime, eventEndTime, status, venues(name)`,
            );
        const { data } = response;
        setBookings(() => {
            return data.map((d) => {
                return {
                    uuid: d.uuid,
                    event: d.event,
                    division: d.division,
                    eventDate: d.eventDate,
                    eventStartTime: d.eventStartTime,
                    eventEndTime: d.eventEndTime,
                    createdAt: new Date(d.createdAt).toLocaleString(),
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
            filters={filters}
        />
    );
}
