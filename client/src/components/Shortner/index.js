import React, { useState } from 'react';
import {
    Button,
    IconButton,
    InputAdornment,
    TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { createLink } from '../../api/queries';

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

    return (
        <>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const slug = await createLink(url);

                    if (!slug) alert('Error Creating Slug');
                    else setShortened(slug);
                }}
                noValidate
                autoComplete='off'
                style={{ marginLeft: 25 }}
            >
                <div>
                    <TextField
                        error={!urlValidator(url)}
                        id='outlined-error'
                        label='Link to Shorten'
                        placeholder='https://google.com/'
                        variant='outlined'
                        helperText='Enter a Valid URL'
                        onChange={(e) => setUrl(e.target.value)}
                        style={{ width: '250px' }}
                    />
                </div>
                <div>
                    <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        disabled={url === '' || !urlValidator(url)}
                    >
                        Shorten
                    </Button>
                </div>
            </form>
            {shortened ? (
                <>
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
                        style={{
                            width: '250px',
                            marginTop: '10px',
                            marginLeft: '25px',
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Domain'
                                variant='outlined'
                            />
                        )}
                    />
                    <TextField
                        id='generated-url'
                        label='Shortened URL'
                        readOnly
                        value={`${domain}/${shortened}`}
                        style={{
                            marginLeft: 25,
                            marginTop: 10,
                            width: '300px',
                        }}
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
                </>
            ) : (
                []
            )}
        </>
    );
};
