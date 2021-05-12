import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grow } from '@material-ui/core';
import { Sms as SmsIcon } from '@material-ui/icons';
import { useAuthentication } from '../../hooks';
import { LoginSignupModal } from './LoginSignupModal';
import { CreateSMSModal } from './CreateSMSModal';

export const Sms = ({ shortenedLink, slug }) => {
    const isAuthenticated = useAuthentication();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Grow in timeout={1500}>
                <Button
                    variant='outlined'
                    color='primary'
                    endIcon={<SmsIcon />}
                    onClick={() => setOpen(true)}
                >
                    Send as text
                </Button>
            </Grow>

            {isAuthenticated ? (
                <CreateSMSModal
                    open={open}
                    setOpen={setOpen}
                    shortenedLink={shortenedLink}
                    slug={slug}
                />
            ) : (
                <LoginSignupModal open={open} setOpen={setOpen} />
            )}
        </>
    );
};

Sms.propTypes = {
    shortenedLink: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
};
