import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';

export default function Drawer({ isOpen, anchor, onClose, sections }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = useState(() => {
        const initialState = {
            top: false,
            left: false,
            bottom: false,
            right: false,
        };
        initialState[anchor] = isOpen;
        return initialState;
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen({ ...open, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300,
                rowGap: '2rem',
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {sections.map((section, index) => (
                <div key={index}>
                    <Typography variant="h5" sx={{ color: theme.palette.neutral[600] }}>
                        {section.header}
                    </Typography>
                    <List>
                        {section.navLinks.map((navLink, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        onClose();
                                        navigate(navLink.link);
                                    }}
                                >
                                    <ListItemIcon>{navLink.icon}</ListItemIcon>
                                    <ListItemText primary={navLink.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </div>
            ))}
            <Divider />
        </Box>
    );

    useEffect(() => {
        const updatedState = { ...open };
        updatedState[anchor] = isOpen;
        setOpen(updatedState);
    }, [isOpen]);

    return (
        <div>
            <React.Fragment key={anchor}>
                <SwipeableDrawer
                    anchor={anchor}
                    open={open[anchor]}
                    onClose={() => {
                        toggleDrawer(anchor, false);
                        onClose();
                    }}
                    onOpen={toggleDrawer(anchor, true)}
                >
                    <Box
                        sx={{
                            mt: '5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            rowGap: '5rem',
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{ padding: '2% 5%', textAlign: 'center', cursor: 'pointer' }}
                            onClick={() => {
                                onClose();
                                navigate('/');
                            }}
                        >
                            NTU Heritage Club Booking System
                        </Typography>
                        {list(anchor)}
                    </Box>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}
