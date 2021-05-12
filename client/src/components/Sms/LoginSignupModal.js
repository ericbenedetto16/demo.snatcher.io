import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Backdrop,
    Fade,
    makeStyles,
    Modal,
    Typography,
} from '@material-ui/core';
import { Login } from '../Login';
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

export const LoginSignupModal = ({ open, setOpen }) => {
    const classes = useStyles();
    const [toggleSignup, setToggleSignup] = useState(false);

    return (
        <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <Typography
                        component='h1'
                        variant='h5'
                        align='center'
                        style={{ marginBottom: '-25px' }}
                    >
                        Must be logged in to send a text
                    </Typography>

                    {toggleSignup ? (
                        <Signup setToggleSignup={setToggleSignup} />
                    ) : (
                        <Login setToggleSignup={setToggleSignup} />
                    )}
                </div>
            </Fade>
        </Modal>
    );
};

LoginSignupModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};
