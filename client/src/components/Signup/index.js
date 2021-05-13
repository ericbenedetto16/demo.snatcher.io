import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import {
    loadCaptchaEnginge,
    LoadCanvasTemplateNoReload,
    validateCaptcha,
} from 'react-simple-captcha';
import { GATEWAY_URL } from '../../api/queries';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    inline: {
        display: 'inline-block',
        marginRight: '5px',
    },
}));

export const Signup = ({ setToggleSignup }) => {
    const classes = useStyles();

    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailInUse, setEmailInUse] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [captcha, setCaptcha] = useState(false);
    const [captchaError, setCaptchaError] = useState(false);
    const [captchaInput, setCaptchaInput] = useState('');

    useEffect(() => {
        if (captcha) loadCaptchaEnginge(6);
    }, [captcha]);

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <form
                    className={classes.form}
                    // eslint-disable-next-line consistent-return
                    onSubmit={async (e) => {
                        try {
                            e.preventDefault();
                            setCaptchaError(false);

                            if (!captcha) {
                                setCaptcha(true);
                                return;
                            }

                            if (validateCaptcha(captchaInput) === false) {
                                setCaptchaError(true);
                                return;
                            }

                            setCaptcha(false);
                            setEmailInUse(false);

                            const payload = {
                                firstName,
                                lastName,
                                email,
                                password,
                            };

                            const res = await fetch(
                                `${GATEWAY_URL}/users/register/`,
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(payload),
                                }
                            );

                            if (res.status === 409) {
                                setEmailInUse(true);
                                return;
                            }

                            const json = await res.json();

                            if (!json.success) {
                                throw new Error('Could Not Sign Up');
                            }

                            // TODO: If came from SMS then return to sms
                            if (setToggleSignup) {
                                setToggleSignup(false);
                                return;
                            }
                            history.push('/login');
                        } catch (err) {
                            // eslint-disable-next-line no-alert
                            alert('Error Signing Up');
                        }
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete='fname'
                                name='firstName'
                                variant='outlined'
                                required
                                fullWidth
                                id='firstName'
                                label='First Name'
                                autoFocus
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id='lastName'
                                label='Last Name'
                                name='lastName'
                                autoComplete='lname'
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                type='email'
                                error={emailInUse}
                                helperText={
                                    emailInUse
                                        ? 'Email Address Already In Use'
                                        : ''
                                }
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                name='confirm-password'
                                label='Confirm Password'
                                type='password'
                                id='confirm-password'
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                error={
                                    // eslint-disable-next-line operator-linebreak
                                    password !== confirmPassword &&
                                    confirmPassword !== ''
                                }
                                helperText={
                                    // eslint-disable-next-line operator-linebreak
                                    password !== confirmPassword &&
                                    confirmPassword !== ''
                                        ? 'Passwords Do Not Match'
                                        : ''
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        disabled={captcha}
                    >
                        Sign Up
                    </Button>
                    {captcha === true ? (
                        <Grid item sm={4} xs={12}>
                            <div>
                                <LoadCanvasTemplateNoReload />
                                <TextField
                                    id='captcha-input'
                                    label='Captcha Value'
                                    onChange={(e) => {
                                        setCaptchaInput(e.target.value);
                                    }}
                                    error={captchaError}
                                    helperText={
                                        captchaError
                                            ? 'Captcha Did Not Match'
                                            : ''
                                    }
                                />
                                <Button type='submit' variant='contained'>
                                    Submit
                                </Button>
                            </div>
                        </Grid>
                    ) : (
                        []
                    )}
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <p className={classes.inline}>
                                Already have an account?
                            </p>

                            <Link
                                component={RouterLink}
                                onClick={(e) => {
                                    if (setToggleSignup) {
                                        e.preventDefault();
                                        setToggleSignup();
                                    }
                                }}
                                href='/login'
                                to='/login'
                                variant='body2'
                            >
                                Log in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

Signup.propTypes = {
    setToggleSignup: PropTypes.func,
};

Signup.defaultProps = {
    setToggleSignup: undefined,
};
