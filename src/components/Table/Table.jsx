import React, { useState, useEffect, useReducer, useMemo } from 'react';
import Box from '@mui/material/Box';
import { Table as DefaultTable, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from './TableHead';
import TableToolbar from './TableToolbar';
import { useTheme } from '@emotion/react';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function Table({
    title,
    headCells,
    defaultOrderBy,
    defaultOrderStatus,
    defaultRowsPerPage,
    rows,
    filters,
}) {
    const theme = useTheme();
    const [filteredRows, setFilteredRows] = useState(rows);
    const [order, setOrder] = useState(defaultOrderStatus);
    const [orderBy, setOrderBy] = useState(defaultOrderBy);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [, reloadTable] = useReducer((x) => x + 1, 0);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(filteredRows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [filteredRows, order, orderBy, page, rowsPerPage],
    );

    const handleFilter = (filtersInputable) => {
        let updatedRows = rows;

        for (const input of Object.keys(filtersInputable)) {
            updatedRows = updatedRows.filter((row) => {
                const filter = filters.find((filter) => filter.id === input);
                return filter.filterBy(row, filtersInputable[input]);
            });
        }
        setFilteredRows(updatedRows);
    };

    useEffect(() => {
        setFilteredRows(rows);
    }, [rows]);

    useEffect(() => {
        setPage(0);
        reloadTable();
    }, [filteredRows]);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, padding: '1rem', boxSizing: 'border-box' }}>
                <TableToolbar title={title} filters={filters} onFilter={handleFilter} />
                <TableContainer sx={{ mt: 2, maxHeight: 500 }}>
                    <DefaultTable
                        stickyHeader
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="medium"
                    >
                        <TableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={headCells}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                        hover
                                        tabIndex={-1}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        {headCells.map((headCell, idx) => {
                                            if (headCell.id === 'status') {
                                                return (
                                                    <TableCell
                                                        key={idx}
                                                        align="left"
                                                        width={headCell.width}
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                padding: '2% 5%',
                                                                textAlign: 'center',
                                                                color:
                                                                    row[headCell.id] === 'Submitted'
                                                                        ? theme.palette.warning.main
                                                                        : row[headCell.id] ===
                                                                          'Rejected'
                                                                        ? theme.palette.error.main
                                                                        : theme.palette.success
                                                                              .main,
                                                                borderRadius: '0.8rem',
                                                                bgcolor:
                                                                    row[headCell.id] === 'Submitted'
                                                                        ? theme.palette.warning
                                                                              .light
                                                                        : row[headCell.id] ===
                                                                          'Rejected'
                                                                        ? theme.palette.error.light
                                                                        : theme.palette.success
                                                                              .lightest,
                                                            }}
                                                        >
                                                            {row[headCell.id]}
                                                        </Typography>
                                                    </TableCell>
                                                );
                                            }

                                            return (
                                                <TableCell
                                                    key={idx}
                                                    width={headCell.width}
                                                    align={headCell.numeric ? 'right' : 'left'}
                                                >
                                                    {row[headCell.id]}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </DefaultTable>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
