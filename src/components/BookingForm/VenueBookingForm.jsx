import { useEffect, useState } from 'react';
import { manifestAlert, supabase } from '../../App';
import { WithBookingForm } from './withBookingForm';
import { useNavigate } from 'react-router-dom';

export default function VenueBookingForm() {
    const [alertPayload, setAlertPayload] = useState({});
    const [alertActive, setAlertActive] = useState(false);
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

    useEffect(() => {
        if (alertActive) {
            const timeout = setTimeout(() => {
                setAlertActive(false);
            }, 1500);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [alertActive]);

    const fields = [
        {
            id: 'venue',
            name: 'Venue Name',
            accept: 'input-selection',
            options: venues,
        },
        { id: 'event', name: 'Event Name', accept: 'string' },
        {
            id: 'division',
            name: 'Division',
            accept: 'selection',
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
        { id: 'eventStartTime', name: 'Event Start Time', accept: 'time' },
        { id: 'eventEndTime', name: 'Event End Time', accept: 'time' },
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

        if (!inputable.eventStartTime || isNaN(new Date(inputable.eventStartTime).getTime())) {
            updatedErrors.eventStartTime = 'Event start time is required.';
        }

        if (!inputable.eventEndTime || isNaN(new Date(inputable.eventEndTime).getTime())) {
            updatedErrors.eventEndTime = 'Event end time is required.';
        }

        if (
            inputable.eventStartTime &&
            new Date(inputable.eventEndTime).getTime() -
                new Date(inputable.eventStartTime).getTime() <
                60 * 60 * 1000
        ) {
            updatedErrors.eventStartTime = 'Event duration must be at least 1 hour.';
            updatedErrors.eventEndTime = 'Event duration must be at least 1 hour.';
        }
        return updatedErrors;
    };

    const submitRequest = async (payload) => {
        const selectedVenueIdx = venues.indexOf(payload.venue);
        const venueUUID = venuesObj[selectedVenueIdx].uuid;
        let paddedStartTime = new Date(payload.eventStartTime)
            .toLocaleTimeString('en-US')
            .split(':');
        const startTimeOffset = paddedStartTime[2].includes('PM') ? 12 : 0;
        paddedStartTime = paddedStartTime.map((element, index) => {
            if (index === 0)
                return (parseInt(element) + startTimeOffset).toString().padStart(2, '0');
            return element.padStart(2, '0');
        });
        paddedStartTime = paddedStartTime.join(':');
        paddedStartTime = paddedStartTime.slice(0, 5);

        let paddedEndTime = new Date(payload.eventEndTime).toLocaleTimeString('en-US').split(':');
        const endTimeOffset = paddedEndTime[2].includes('PM') ? 12 : 0;
        paddedEndTime = paddedEndTime.map((element, index) => {
            if (index === 0) return (parseInt(element) + endTimeOffset).toString().padStart(2, '0');
            return element.padStart(2, '0');
        });
        paddedEndTime = paddedEndTime.join(':');
        paddedEndTime = paddedEndTime.slice(0, 5);

        const response = await supabase.from('venuesBooking').insert({
            ...payload,
            venue: venueUUID,
            eventStartTime: paddedStartTime,
            eventEndTime: paddedEndTime,
        });
        if (response.status === 201) {
            setAlertActive(true);
            setAlertPayload({
                type: 'success',
                message: 'Venue booking request has been submitted.',
            });
        } else {
            setAlertActive(true);
            setAlertPayload({
                type: 'error',
                message: response.message,
            });
        }
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
            {alertActive && manifestAlert(alertPayload.type, alertPayload.message)}
        </>
    );
}
