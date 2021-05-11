import React, { useState } from 'react';
import {
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Grid,
    Grow,
} from '@material-ui/core';
// import SmsIcon from '@material-ui/icons/Sms';
import { Autocomplete } from '@material-ui/lab';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { createLink } from '../../api/queries';
// import { useAuthentication } from '../../hooks';
import { Sms } from '../Sms';

const urlValidator = (url) => {
    try {
        if (!url || url === '') return true;

        // eslint-disable-next-line no-new
        new URL(url);

        return true;
    } catch (err) {
        return false;
    }
};

// eslint-disable-next-line operator-linebreak
const DEFAULT_DOMAIN =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080'
        : 'https://shrtnd.xyz';

const DOMAINS = [
    {
        name: 'https://cmprsd.link',
    },
    {
        name: 'https://minified.live',
    },
    {
        name: 'https://shrinkd.xyz',
    },
    {
        name: 'https://shrtnd.xyz',
    },
    {
        name: 'https://shrtnr.io',
    },
    {
        name: 'https://tinyd.live',
    },
];

export const Shortner = () => {
    const [url, setUrl] = useState('');
    const [shortened, setShortened] = useState(null);
    const [domain, setDomain] = useState(DEFAULT_DOMAIN);
    const [canShorten, setCanShorten] = useState(false);

    return (
        <>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const slug = await createLink(url);

                    // eslint-disable-next-line no-alert
                    if (!slug) alert('Error Creating Slug');
                    else {
                        setShortened(slug);
                        setCanShorten(false);
                    }
                }}
                noValidate
                autoComplete='off'
            >
                <Grid container spacing={2} alignItems='center'>
                    <Grid item sm={8} xs={12}>
                        <TextField
                            error={!urlValidator(url)}
                            id='outlined-error'
                            label='Link to Shorten'
                            placeholder='https://google.com/'
                            variant='outlined'
                            onChange={(e) => {
                                setUrl(e.target.value.trim());
                                setCanShorten(true);
                            }}
                            style={{ width: '100%' }}
                            autoFocus
                            defaultValue='https://'
                        />
                    </Grid>

                    <Grid item sm={4} xs={12}>
                        <Button
                            type='submit'
                            color='primary'
                            variant='contained'
                            fullWidth
                            disabled={url === '' || !canShorten || !urlValidator(url)}
                        >
                            Shorten
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {shortened ? (
                <Grid container spacing={2} style={{ marginTop: '2%' }}>
                    <Grid item xs={12}>
                        <Grow in timeout={500}>
                            <Autocomplete
                                id='domain-autocomplete'
                                options={DOMAINS}
                                getOptionLabel={(opt) => opt.name}
                                getOptionSelected={(opt) => opt.name}
                                onChange={(e, v) => {
                                    if (v === '' || v === null) {
                                        setDomain(DEFAULT_DOMAIN);
                                    } else {
                                        setDomain(v.name);
                                    }
                                }}
                                value={{ name: domain || DEFAULT_DOMAIN }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label='Domain'
                                        variant='outlined'
                                    />
                                )}
                            />
                        </Grow>
                    </Grid>
                    <Grid item xs={12}>
                        <Grow in timeout={1000}>
                            <TextField
                                id='generated-url'
                                label='Shortened URL'
                                readOnly
                                value={`${domain}/${shortened}`}
                                style={{
                                    width: '100%',
                                }}
                                autoFocus
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='Copy to Clipboard'
                                                onClick={() => {
                                                    document
                                                        .querySelector('#generated-url')
                                                        .select();
                                                    document.execCommand('copy');
                                                }}
                                            >
                                                <FileCopyIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grow>
                    </Grid>
                    <Grid item xs={12}>
                        <Sms shortenedLink={`${domain}/${shortened}`} slug={shortened} />
                    </Grid>
                </Grid>
            ) : (
                []
            )}
        </>
    );
};
