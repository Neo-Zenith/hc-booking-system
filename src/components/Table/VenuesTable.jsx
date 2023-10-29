import { useEffect, useState } from 'react';
import Table from './Table';
import { supabase } from '../../App';

export default function VenuesTable() {
    const [venues, setVenues] = useState([]);

    const headCells = [
        {
            id: 'uuid',
            numeric: false,
            label: 'UUID',
        },
        {
            id: 'name',
            numeric: false,
            label: 'Name',
        },
        {
            id: 'capacity',
            numeric: true,
            label: 'Capacity',
        },
        {
            id: 'description',
            numeric: false,
            label: 'Description',
        },
        {
            id: 'location',
            numeric: false,
            label: 'Location',
        },
    ];

    const filters = [
        {
            id: 'name',
            label: 'Venue Name',
            accept: 'string',
            filterBy: (row, value) => {
                if (value === '') {
                    return row;
                }
                if (row.name.toLowerCase().includes(value.toLowerCase())) {
                    return row;
                }
            },
        },
        {
            id: 'capacity',
            label: 'Capacity',
            accept: 'integer',
            filterBy: (row, value) => {
                if (value === '') {
                    return row;
                }
                if (value >= row.capacity) {
                    return row;
                }
            },
        },
        {
            id: 'location',
            label: 'Location',
            accept: 'multi-selection',
            options: [
                { name: 'North Spine', value: 'NS' },
                { name: 'South Spine', value: 'SS' },
            ],
            filterBy: (row, value) => {
                if (value.length === 0) {
                    return row;
                }
                if (value.some((v) => row.location.startsWith(v))) {
                    return row;
                }
            },
        },
    ];

    const fetchVenues = async () => {
        const response = await supabase.from('venues').select();
        const { data } = response;
        setVenues(() =>
            data.map((venue) => {
                return {
                    uuid: venue.uuid,
                    name: venue.name,
                    capacity: venue.capacity,
                    description: venue.description,
                    location: venue.location,
                };
            }),
        );
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    return (
        <Table
            title={'Venues'}
            headCells={headCells}
            defaultRowsPerPage={5}
            defaultOrderBy={'name'}
            defaultOrderStatus={'asc'}
            rows={venues}
            filters={filters}
        />
    );
}
