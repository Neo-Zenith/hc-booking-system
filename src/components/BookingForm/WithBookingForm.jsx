import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@emotion/react';
import { useState } from 'react';

export const WithBookingForm = ({ title, subtitle, fields, validator, submitRequest }) => {
    const theme = useTheme();
    const [inputable, setInputable] = useState(() => {
        const initialInputable = {};
        for (const key of fields) {
            if (key.accept === 'date') {
                initialInputable[key.id] = dayjs(new Date());
            } else {
                initialInputable[key.id] = '';
            }
        }
        return initialInputable;
    });
    const [errors, setErrors] = useState({});

    const fieldConfig = (field, index) => {
        switch (field.accept) {
            case 'string':
                return (
                    <TextField
                        key={index}
                        label={field.name}
                        value={inputable[field.id]}
                        fullWidth
                        onChange={(e) => {
                            const updatedInputable = { ...inputable };
                            updatedInputable[field.id] = e.target.value;
                            setInputable(updatedInputable);
                        }}
                        error={errors[field.id] ? true : false}
                        helperText={errors[field.id]}
                    />
                );
            case 'integer':
                return (
                    <TextField
                        key={index}
                        type="number"
                        label={field.name}
                        value={inputable[field.id]}
                        fullWidth
                        onChange={(e) => {
                            const updatedInputable = { ...inputable };
                            updatedInputable[field.id] = e.target.value;
                            setInputable(updatedInputable);
                        }}
                        error={errors[field.id] ? true : false}
                        helperText={errors[field.id]}
                    />
                );
            case 'multi-input-selection':
                return (
                    <Autocomplete
                        key={index}
                        options={field.options}
                        label={field.name}
                        value={inputable[field.id]}
                        onChange={(e) => {
                            const updatedInputable = { ...inputable };
                            updatedInputable[field.id] = e.target.textContent;
                            setInputable(updatedInputable);
                        }}
                        fullWidth
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={field.name}
                                error={errors[field.id] ? true : false}
                                helperText={errors[field.id]}
                            />
                        )}
                    />
                );
            case 'multi-selection':
                return (
                    <FormControl fullWidth key={index}>
                        <InputLabel>{field.name}</InputLabel>
                        <Select
                            label={field.name}
                            value={inputable[field.id]}
                            onChange={(e) => {
                                const updatedInputable = { ...inputable };
                                updatedInputable[field.id] = e.target.value;
                                setInputable(updatedInputable);
                            }}
                            error={errors[field.id] ? true : false}
                        >
                            {field.options.map((option, index) => {
                                return (
                                    <MenuItem key={index} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        {errors[field.id] && (
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: theme.palette.error.main,
                                    margin: '0.4rem 1.4rem 0rem 1.2rem',
                                }}
                            >
                                {errors[field.id]}
                            </Typography>
                        )}
                    </FormControl>
                );
            case 'date':
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs} key={index}>
                        <DatePicker
                            label={field.name}
                            minDate={dayjs(new Date())}
                            value={inputable[field.id]}
                            onChange={(e) => {
                                const updatedInputable = { ...inputable };
                                updatedInputable[field.id] = `${e.$y}-${e.$m + 1}-${e.$d}`;
                                setInputable(updatedInputable);
                            }}
                        />
                        {errors[field.id] && (
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: theme.palette.error.main,
                                    margin: '-1rem 1.4rem 0rem 1.2rem',
                                }}
                            >
                                {errors[field.id]}
                            </Typography>
                        )}
                    </LocalizationProvider>
                );
        }
    };

    const onReset = () => {
        const resettedInputable = {};
        for (const key of fields) {
            if (key.accept === 'date') {
                resettedInputable[key.id] = dayjs(new Date());
            } else {
                resettedInputable[key.id] = '';
            }
        }
        setErrors({});
        setInputable(resettedInputable);
    };

    const onSubmit = () => {
        const validatorErrors = validator(inputable);
        if (Object.keys(validatorErrors).length !== 0) {
            setErrors(validatorErrors);
            return false;
        }
        submitRequest(inputable);
        setErrors({});
    };

    return (
        <>
            <Box
                sx={{
                    boxShadow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 'max(2%, 1.5rem)',
                    width: '100%',
                    bgcolor: theme.palette.neutral[50],
                }}
            >
                <Typography variant="h2" sx={{ alignSelf: 'center', mb: '1rem' }}>
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ alignSelf: 'center', color: theme.palette.neutral[500], mb: '3.5rem' }}
                >
                    {subtitle}
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1.5rem' }}>
                    {fields.map((field, index) => {
                        return fieldConfig(field, index);
                    })}
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex' }}>
                    <Button sx={{ mr: 'auto' }} variant="outlined" onClick={onReset}>
                        <Typography variant="body1">Reset</Typography>
                    </Button>
                    <Button
                        sx={{ ml: 'auto' }}
                        variant="contained"
                        disableElevation
                        onClick={onSubmit}
                    >
                        <Typography variant="body1">Confirm</Typography>
                    </Button>
                </div>
            </Box>
        </>
    );
};
