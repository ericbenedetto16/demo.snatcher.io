/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
    makeStyles,
} from '@material-ui/core/';
import { GATEWAY_URL } from '../../api/queries';

import { setToken } from '../../utils/index';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    inline: {
        display: 'inline-block',
        marginRight: '5px',
    },
}));

export const Login = () => {
    const classes = useStyles();

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    Log in
                </Typography>
                <form
                    className={classes.form}
                    // eslint-disable-next-line consistent-return
                    onSubmit={async (e) => {
                        try {
                            e.preventDefault();

                            setInvalid(false); // Reset Invalid Credentials Status

                            const payload = {
                                username: email,
                                password,
                            };

                            const res = await fetch(
                                `${GATEWAY_URL}/users/login/`,
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(payload),
                                }
                            );

                            const json = await res.json();

                            if (!json.success) {
                                setInvalid(true);
                                return;
                            }

                            // TODO: Crete Util Functions For Set/Get Bearer Token in LocalStorage
                            setToken(json.token);
                            history.push('/');
                        } catch (err) {
                            setInvalid(true);
                            // eslint-disable-next-line no-alert
                            alert('Server Error');
                        }
                    }}
                >
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        error={invalid}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        error={invalid}
                        helperText={
                            invalid ? 'Invalid Username or Password' : ''
                        }
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <p className={classes.inline}>
                                Don&apos;t have an account?
                            </p>

                            <Link
                                component={RouterLink}
                                href='/signup'
                                to='/signup'
                                variant='body2'
                            >
                                Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};
