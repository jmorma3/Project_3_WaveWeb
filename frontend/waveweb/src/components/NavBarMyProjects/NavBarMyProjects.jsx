import "./NavBarMyProjects.css"

import { useState } from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import NotificationsIcon from '@mui/icons-material/Notifications';
import WavesIcon from "@mui/icons-material/Waves";


export default function NavBarMyProjects() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    // Estado para el menú de notificaciones
    const [notifAnchorEl, setNotifAnchorEl] = useState(null);
    const isNotifMenuOpen = Boolean(notifAnchorEl);

    // Estado para el menú de Perfil
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleNotificationsMenuOpen = (event) => {
        //El menú sólo se abrirá si estamos logeados como el usuario con id = 2 ("dev1")
        if (parseInt(localStorage.getItem("userId")) === 2) {
            setNotifAnchorEl(event.currentTarget);
        }
    }

    const handleNotificationsMenuClose = () => {
        setNotifAnchorEl(null);
    };

    const renderNotificationsMenu = (
        <Menu
            anchorEl={notifAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="notifications-menu"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isNotifMenuOpen}
            onClose={handleNotificationsMenuClose}
        >
            <MenuItem onClick={handleNotificationsMenuClose}> You have a new project! </MenuItem>
        </Menu>
    );


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My Subscription</MenuItem>
            <MenuItem onClick={handleMenuClose}>Invoices</MenuItem>
            <MenuItem onClick={handleMenuClose}>Support </MenuItem>
            <MenuItem onClick={handleMenuClose}>About Us</MenuItem>
            <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1, marginBottom: '64px' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <WavesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Wave Web
                    </Typography>


                    <WavesIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Wave Web
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>


                        <IconButton
                            size="large"
                            aria-label="show new notifications"
                            color="inherit"
                            onClick={handleNotificationsMenuOpen}
                        >
                            {/* El icono de "1" nueva notificación sólo le aparecerá al user con id = 2 ("dev1") */}
                            <Badge badgeContent={parseInt(localStorage.getItem("userId")) === 2 ? 1 : 0} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {renderNotificationsMenu}
        </Box>
    );
}
