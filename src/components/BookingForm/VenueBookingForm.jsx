import { useEffect, useState } from 'react';
import { supabase } from '../../App';
import { WithBookingForm } from './withBookingForm';

export default function VenueBookingForm() {
    const [venuesObj, setVenuesObj] = useState([]);
    const [venues, setVenues] = useState([]);

    async function getVenues() {
        const response = await supabase.from('venues').select();
        const { data } = response;
        setVenuesObj(data);
        const initialVenues = [];
        for (const venue of data) {
            initialVenues.push(venue.name);
        }
        setVenues(initialVenues);
    }

    useEffect(() => {
        getVenues();
    }, []);

    const fields = [
        {
            id: 'venue',
            name: 'Venue Name',
            accept: 'multi-input-selection',
            options: venues,
        },
        { id: 'event', name: 'Event Name', accept: 'string' },
        {
            id: 'division',
            name: 'Division',
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
        },
        { id: 'eventDate', name: 'Event Date', accept: 'date' },
    ];

    const validateFields = (inputable) => {
        const updatedErrors = {};
        if (!inputable.venue) {
            updatedErrors.venue = 'Venue name is required.';
        }
        if (!inputable.event) {
            updatedErrors.event = 'Event name is required.';
        }
        if (!inputable.division) {
            updatedErrors.division = 'Division is required.';
        }
        if (!inputable.eventDate || isNaN(new Date(inputable.eventDate).getTime())) {
            updatedErrors.eventDate = 'Event date is required.';
        }
        return updatedErrors;
    };

    const submitRequest = async (payload) => {
        const selectedVenueIdx = venues.indexOf(payload.venue);
        const venueUUID = venuesObj[selectedVenueIdx].uuid;
        const response = await supabase
            .from('venuesBooking')
            .insert({ ...payload, venue: venueUUID });
    };

    return (
        <>
            <WithBookingForm
                title={'Book Venue'}
                subtitle={'Please fill up this form to facilitate your booking request.'}
                fields={fields}
                validator={validateFields}
                submitRequest={submitRequest}
            />
        </>
    );
}
