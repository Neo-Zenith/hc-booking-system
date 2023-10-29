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

    useEffect(() => {
        console.log(venues);
    }, [venues]);

    return (
        <Table
            title={'Venues'}
            headCells={headCells}
            defaultRowsPerPage={5}
            defaultOrderBy={'name'}
            defaultOrderStatus={'asc'}
            rows={venues}
        />
    );
}
