/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const Copyright = () => (
    <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}
        <Link color='inherit' href='/'>
            Snatcher Shortener
        </Link>{' '}
        {new Date().getFullYear()}
    </Typography>
);

const DevelopedBy = () => (
    <Typography
        variant='subtitle1'
        align='center'
        color='textSecondary'
        component='p'
    >
        Developed by{' '}
        <Link color='inherit' href='https://ericbenedetto.tech/'>
            Eric Benedetto
        </Link>{' '}
        and
        <Link
            color='inherit'
            href='https://www.linkedin.com/in/jonathanshitrit/'
        >
            {' '}
            Jonathan Shitrit
        </Link>
    </Typography>
);

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(6),
    },
}));

export const Footer = () => {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <footer className={classes.footer}>
                <DevelopedBy />
                <Copyright />
            </footer>
        </>
    );
};
