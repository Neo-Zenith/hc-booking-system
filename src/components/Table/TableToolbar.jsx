import { useTheme } from '@emotion/react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function TableToolbar({ title, filters, onFilter }) {
    const theme = useTheme();
    const [filtersActive, setFiltersActive] = useState(false);
    const [filtersInputable, setFiltersInputable] = useState(() => {
        const initialFiltersInputable = {};
        for (const filter of filters) {
            if (filter.accept.startsWith('multi')) {
                initialFiltersInputable[filter.id] = [];
            } else {
                initialFiltersInputable[filter.id] = '';
            }
        }
        return initialFiltersInputable;
    });

    const filterConfig = (filter, idx) => {
        switch (filter.accept) {
            case 'string':
                return (
                    <TextField
                        fullWidth
                        key={idx}
                        label={filter.label}
                        value={filtersInputable[filter.id]}
                        onChange={(e) => {
                            const updatedFiltersInputable = { ...filtersInputable };
                            updatedFiltersInputable[filter.id] = e.target.value;
                            setFiltersInputable(updatedFiltersInputable);
                        }}
                    />
                );
            case 'integer':
                return (
                    <TextField
                        fullWidth
                        key={idx}
                        type="number"
                        label={filter.label}
                        value={filtersInputable[filter.id]}
                        onChange={(e) => {
                            const updatedFiltersInputable = { ...filtersInputable };
                            updatedFiltersInputable[filter.id] = e.target.value;
                            setFiltersInputable(updatedFiltersInputable);
                        }}
                    />
                );
            case 'multi-selection':
                return (
                    <FormControl fullWidth key={idx}>
                        <InputLabel>{filter.label}</InputLabel>
                        <Select
                            label={filter.label}
                            multiple
                            value={filtersInputable[filter.id]}
                            onChange={(e) => {
                                const updatedFiltersInputable = { ...filtersInputable };
                                updatedFiltersInputable[filter.id] = e.target.value;
                                setFiltersInputable(updatedFiltersInputable);
                            }}
                        >
                            {filter.options.map((option, index) => {
                                return (
                                    <MenuItem key={index} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                );
        }
    };

    const handleFilter = (payload) => {
        onFilter(payload);
    };

    const resetFilter = () => {
        const initialFiltersInputable = {};
        for (const filter of filters) {
            if (filter.accept.startsWith('multi')) {
                initialFiltersInputable[filter.id] = [];
            } else {
                initialFiltersInputable[filter.id] = '';
            }
        }
        setFiltersInputable(initialFiltersInputable);
        return initialFiltersInputable;
    };

    const cancelFilter = () => {
        const resettedFilters = resetFilter();
        handleFilter(resettedFilters);
        setFiltersActive(false);
    };

    return (
        <Box>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }}
            >
                <Typography variant="h3">{title}</Typography>
                {!filtersActive && (
                    <Button
                        variant="contained"
                        sx={{ ml: 'auto' }}
                        onClick={() => setFiltersActive(true)}
                    >
                        <Typography>Add Filter</Typography>
                    </Button>
                )}
                {filtersActive && (
                    <Button
                        variant="contained"
                        sx={{
                            ml: 'auto',
                            bgcolor: theme.palette.error.main,
                            ':hover': {
                                bgcolor: theme.palette.error.dark,
                            },
                        }}
                        onClick={cancelFilter}
                    >
                        <Typography>Cancel Filter</Typography>
                    </Button>
                )}
            </Toolbar>
            {filtersActive && (
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: '2rem' }}>
                    <Box
                        sx={{
                            mt: 1,
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 },
                            display: 'flex',
                            columnGap: '1rem',
                        }}
                    >
                        {filters.map((filter, idx) => {
                            return filterConfig(filter, idx);
                        })}
                    </Box>
                    <Box style={{ display: 'flex' }}>
                        <Button variant="outlined" sx={{ mr: 'auto', ml: 2 }} onClick={resetFilter}>
                            <Typography>Reset Filters</Typography>
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ ml: 'auto', mr: 1 }}
                            onClick={() => handleFilter(filtersInputable)}
                        >
                            <Typography>Apply Filters</Typography>
                        </Button>
                    </Box>
                </div>
            )}
        </Box>
    );
}
