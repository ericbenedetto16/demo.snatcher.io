import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    Backdrop,
    Fade,
    TextField,
    Typography,
    makeStyles,
} from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';
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

// eslint-disable-next-line object-curly-newline
export const CreateSMSModal = ({ open, setOpen, shortenedLink, slug }) => {
    const classes = useStyles();
    const [edit, setEdit] = useState(true);
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    return (
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
                    <>
                        <Typography component='h1' variant='h5' align='center'>
                            Send link
                        </Typography>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setEdit(false);
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
                                onChange={(value) => {
                                    setPhone(value);
                                }}
                                autoFocus
                                disabled={!edit}
                                required
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
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                                disabled={!edit}
                            />
                            {!edit ? (
                                <>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => setEdit(true)}
                                        style={{
                                            width: '100%',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        <hr
                                            style={{
                                                width: '40%',
                                                float: 'left',
                                            }}
                                        />
                                        <p style={{ display: 'inline' }}>Or</p>
                                        <hr
                                            style={{
                                                width: '40%',
                                                float: 'right',
                                            }}
                                        />
                                    </div>
                                    <PayPalIntegration
                                        key={message + phone}
                                        msgBody={message}
                                        slug={slug}
                                        recipient={phone}
                                    />
                                </>
                            ) : (
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                >
                                    Next
                                </Button>
                            )}
                        </form>
                    </>
                </div>
            </Fade>
        </Modal>
    );
};

CreateSMSModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    shortenedLink: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
};
