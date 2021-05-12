import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Grow,
    Modal,
    Backdrop,
    Fade,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
// eslint-disable-next-line no-unused-vars
import { Sms as SmsIcon } from '@material-ui/icons';
import MuiPhoneNumber from 'material-ui-phone-number';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Login } from '../Login';
import { Signup } from '../Signup';
import { useAuthentication } from '../../hooks';
import { PayPalIntegration } from '../PayPal';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export const Sms = ({ shortenedLink, slug }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const isAuthenticated = useAuthentication();
    const [toggleSignup, setToggleSignup] = useState(false);
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grow in timeout={1500}>
                <Button
                    variant='outlined'
                    color='primary'
                    endIcon={<SmsIcon />}
                    onClick={handleOpen}
                >
                    Send as text
                </Button>
            </Grow>
            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {isAuthenticated ? (
                            <>
                                <Typography component='h1' variant='h5' align='center'>
                                    Send link
                                </Typography>
                                <form
                                    // TODO: Send Requests to Texting Service
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <TextField
                                        id='generated-url'
                                        label='Shortened URL'
                                        readOnly
                                        value={shortenedLink}
                                        fullWidth
                                    />
                                    <MuiPhoneNumber
                                        name='phone'
                                        label='Phone Number'
                                        data-cy='user-phone'
                                        defaultCountry='us'
                                        value={phone}
                                        onChange={(value) => setPhone(value)}
                                        autoFocus
                                    />
                                    <TextField
                                        variant='outlined'
                                        margin='normal'
                                        required
                                        fullWidth
                                        id='message'
                                        label='Message body'
                                        name='message'
                                        multiline
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <PayPalScriptProvider
                                        options={{
                                            'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
                                            currency: 'USD',
                                            intent: 'authorize',
                                        }}
                                    >
                                        <PayPalIntegration
                                            key={message + phone}
                                            msgBody={message}
                                            slug={slug}
                                            recipient={phone} // FIXME: Remove Phone Number
                                        />
                                    </PayPalScriptProvider>
                                </form>
                            </>
                        ) : (
                            <>
                                <Typography component='h1' variant='h5' align='center' style={{ marginBottom: '-25px' }}>
                                    Must be logged in to send a text
                                </Typography>

                                {toggleSignup ? (
                                    <Signup setToggleSignup={setToggleSignup} />
                                ) : (
                                    <Login setToggleSignup={setToggleSignup} />
                                )}
                            </>
                        )}
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

Sms.propTypes = {
    shortenedLink: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
};
