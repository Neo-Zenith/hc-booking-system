import { WithBookingForm } from './withBookingForm';

export default function ItemBookingForm() {
    const fields = [
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
        if (!inputable.name) {
            updatedErrors.name = 'Venue name is required.';
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

    return (
        <>
            <WithBookingForm
                title={'Book Venue'}
                subtitle={'Please fill up this form to facilitate your booking request.'}
                fields={fields}
                validator={validateFields}
            />
        </>
    );
}
