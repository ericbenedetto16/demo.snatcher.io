import React from 'react';
import {
    Container,
    CssBaseline,
    Typography,
    Grid,
    makeStyles,
} from '@material-ui/core';
import { Shortner } from '../Shortner';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
}));

export const Home = () => {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth='sm'>
                        <Typography
                            component='h1'
                            variant='h2'
                            align='center'
                            color='textPrimary'
                            gutterBottom
                        >
                            Snatcher
                            <br />
                            URL Shortener
                        </Typography>
                        <Typography
                            variant='h5'
                            align='center'
                            color='textSecondary'
                            paragraph
                        >
                            Snatcher Shortener allows you to shorten long links
                            while providing you with some of the most advanced
                            and detailed statistical data and metadata for all
                            clicks on your links.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify='center'>
                                <Grid item>
                                    <Shortner />
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
        </>
    );
};
