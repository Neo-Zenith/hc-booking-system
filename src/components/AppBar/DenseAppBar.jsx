import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Drawer from './Drawer';

export default function DenseAppBar() {
    const [sidebarActive, setSidebarActive] = useState(false);
    const sidebarSections = [
        {
            header: 'Venues',
            navLinks: [
                {
                    label: 'Book Venue',
                    icon: <AddIcon />,
                    link: '/venues/book',
                },
                {
                    label: 'View All Venue',
                    icon: <FormatListBulletedIcon />,
                    link: '/venues',
                },
                {
                    label: 'View Booking History',
                    icon: <FormatListBulletedIcon />,
                    link: '/venues/history',
                },
            ],
        },
        {
            header: 'Inventory Items',
            navLinks: [
                {
                    label: 'Book Items',
                    icon: <AddIcon />,
                    link: '/items/book',
                },
                {
                    label: 'View All Items',
                    icon: <FormatListBulletedIcon />,
                    link: '/items',
                },
                {
                    label: 'View Booking History',
                    icon: <FormatListBulletedIcon />,
                    link: '/items/history',
                },
            ],
        },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setSidebarActive(true)}
                    >
                        <MenuIcon style={{ fontSize: '2rem' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                isOpen={sidebarActive}
                anchor={'left'}
                onClose={() => setSidebarActive(false)}
                sections={sidebarSections}
            />
        </Box>
    );
}
