import { useTheme } from '@emotion/react';
import {
    Box,
    TableHead as DefaultTableHead,
    TableCell,
    TableRow,
    TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

export default function TableHead({ order, orderBy, onRequestSort, headCells }) {
    const theme = useTheme();
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <DefaultTableHead>
            <TableRow sx={{ bgcolor: theme.palette.neutral[100] }}>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sx={{ fontWeight: 600 }}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </DefaultTableHead>
    );
}
