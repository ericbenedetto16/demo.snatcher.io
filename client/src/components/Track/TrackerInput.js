import React, { useState, useEffect } from 'react';
import {
    Button,
    Container,
    CssBaseline,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GATEWAY_URL } from '../../api/queries';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        marginBottom: theme.spacing(4),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
}));

export const TrackerInput = () => {
    const history = useHistory();
    const [invalid, setInvalid] = useState(false);
    const [trackerId, setTrackerId] = useState('');

    const classes = useStyles();
    useEffect(() => {
        if (invalid) setInvalid(false);
    }, [trackerId]);

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                setInvalid(false);

                const res = await fetch(`${GATEWAY_URL}/track/${trackerId}`);

                if (res.status === 404) {
                    setInvalid(true);
                    return;
                }
                history.push(`/track/${trackerId}`);
            }}
        >
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
                            Track a URL
                        </Typography>
                        <Typography
                            variant='h5'
                            align='center'
                            color='textSecondary'
                            paragraph
                        >
                            Enter your tracking code below to see data about the
                            link.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid
                                container
                                spacing={2}
                                alignItems='center'
                                justify='center'
                            >
                                <Grid item sm={8} xs={12}>
                                    <TextField
                                        error={invalid}
                                        id='outlined-error'
                                        label='Tracking Code'
                                        placeholder='Enter Tracking Code'
                                        variant='outlined'
                                        onChange={(e) => {
                                            setTrackerId(e.target.value.trim());
                                        }}
                                        style={{ width: '100%' }}
                                        autoFocus
                                        defaultValue=''
                                    />
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <Button
                                        type='submit'
                                        color='primary'
                                        variant='contained'
                                        fullWidth
                                        // onSubmit={() => history.push(`/track/${slug}`)}
                                        onClick={() => {
                                            history.push(`/track/${trackerId}`);
                                        }}
                                        // disabled={
                                        //     url === '' ||
                                        //     !canShorten ||
                                        //     !urlValidator(url) ||
                                        //     captcha
                                        // }
                                    >
                                        Track Link
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
        </form>
    );
};
