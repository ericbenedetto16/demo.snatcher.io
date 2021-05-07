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
} from '@material-ui/core';
import { Sms as SmsIcon, Send as SendIcon } from '@material-ui/icons';
import { Login } from '../Login';
import { Signup } from '../Signup';
import { useAuthentication } from '../../hooks';

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

export const Sms = ({ shortenedLink }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const isAuthenticated = useAuthentication();
    const [toggleSignup, setToggleSignup] = useState(false);

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
                                <h2 id='transition-modal-title'>Send link</h2>
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
                                    <TextField
                                        variant='outlined'
                                        margin='normal'
                                        required
                                        fullWidth
                                        id='message'
                                        label='Message body'
                                        name='message'
                                        autoFocus
                                        multiline
                                    />
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                        endIcon={<SendIcon />}
                                    >
                                        Send
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <h2 id='transition-modal-title'>
                                    Must be logged in to send a text
                                </h2>
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
};
