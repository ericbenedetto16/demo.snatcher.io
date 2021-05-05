/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState } from 'react';
import {
    Button,
    Grow,
    Modal,
    Backdrop,
    Fade,
    makeStyles,
    TextField,
} from '@material-ui/core';
import {
    Sms as SmsIcon,
    Send as SendIcon,
} from '@material-ui/icons';
import { Login } from '../Login';
import { getToken } from '../../utils';
import { Signup } from '../Signup';

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

export const Sms = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(getToken());
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
                        {
                            isAuthenticated !== null ? (
                                <>
                                    <h2 id='transition-modal-title'>Send link</h2>
                                    {/* <p id='transition-modal-description'>react-transition-group animates me.</p> */}
                                    <form>
                                        <TextField
                                            id='generated-url'
                                            label='Shortened URL'
                                            readOnly
                                            value={props.shortenedLink}
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
                                            autoComplete='message'
                                            autoFocus
                                            multiline
                                        />
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            endIcon={<SendIcon />}
                                        >
                                            Send
                                        </Button>
                                    </form>
                                </>
                            )
                                : (
                                    <>
                                        <h2 id='transition-modal-title'>Must be logged in to send a text</h2>
                                        {toggleSignup
                                            ? (
                                                <Signup setToggleSignup={setToggleSignup} />
                                            ) : (
                                                <Login setIsAuthenticated={setIsAuthenticated} setToggleSignup={setToggleSignup} />
                                            )}
                                    </>
                                )
                        }

                    </div>
                </Fade>
            </Modal>
        </>
    );
};
