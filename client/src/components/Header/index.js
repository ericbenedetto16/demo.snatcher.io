import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    Link,
    MenuItem,
    Divider,
    List,
    ListItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// import { getToken } from '../../utils';
import { useAuthentication } from '../../hooks';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 20,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    drawerNavItem: {
        width: 250,
        textDecoration: 'none!important',
    },
    navItem: {
        textDecoration: 'none!important',
    },
    navLabel: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    toolbar: theme.mixins.toolbar,
}));
export const Header = () => {
    const location = useLocation();

    useEffect(() => {}, [location]);

    const COLLAPSE_THRESHOLD = 900;
    const classes = useStyles();
    const [collapse, setCollapse] = useState(
        window.innerWidth <= COLLAPSE_THRESHOLD
    );
    const [drawer, setDrawer] = useState(false);

    window.onresize = () => {
        if (window.innerWidth <= COLLAPSE_THRESHOLD && !collapse) {
            setCollapse(true);
        }

        if (window.innerWidth > COLLAPSE_THRESHOLD && collapse) {
            setCollapse(false);
        }
    };

    const logged = useAuthentication();

    const LINKS = [
        { name: 'Home', href: '/' },
        // { name: 'Create', href: '/create/' },
        { name: 'Track', href: '/track/' },
        logged
            ? { name: 'Logout', href: '/logout/' }
            : { name: 'Login', href: '/login/' },
    ];

    const iconRenderer = () => {
        if (collapse) {
            return (
                <>
                    <IconButton
                        edge='start'
                        className={classes.menuButton}
                        color='inherit'
                        aria-label='menu'
                        onClick={() => setDrawer((curr) => !curr)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor='left'
                        open={drawer}
                        onClose={() => setDrawer(false)}
                    >
                        <div className={classes.toolbar} />
                        <Divider />
                        <List>
                            {LINKS.map(({ name, href }) => (
                                <ListItem key={name}>
                                    <Link
                                        component={RouterLink}
                                        to={href}
                                        color='inherit'
                                        key={name}
                                        className={classes.drawerNavItem}
                                    >
                                        <MenuItem className={classes.navLabel}>
                                            {name}
                                        </MenuItem>
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </>
            );
        }
        return null;
    };

    const menuRenderer = () => {
        if (!collapse) {
            return LINKS.map(({ name, href }) => (
                <Link
                    component={RouterLink}
                    to={href}
                    color='inherit'
                    key={name}
                    className={classes.navItem}
                >
                    <MenuItem className={classes.navLabel}>{name}</MenuItem>
                </Link>
            ));
        }
        return null;
    };

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    {iconRenderer()}
                    <Typography variant='h6' className={classes.title}>
                        Snatcher
                    </Typography>
                    {menuRenderer()}
                </Toolbar>
            </AppBar>
        </div>
    );
};
