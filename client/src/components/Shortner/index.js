import React, { useState } from 'react';
import {
    Button,
    IconButton,
    InputAdornment,
    TextField,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { createLink } from '../../api/queries';

const urlValidator = (url) => {
    try {
        if (!url || url === '') return true;

        new URL(url);

        return true;
    } catch (err) {
        return false;
    }
};

export const Shortner = () => {
    const [url, setUrl] = useState('');
    const [shortened, setShortened] = useState(null);

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
                <TextField
                    id='generated-url'
                    label='Shortened URL'
                    readOnly
                    value={`http://localhost:8080/${shortened}`}
                    style={{ marginLeft: 25, marginTop: 10, width: '300px' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='Copy to Clipboard'
                                    onClick={(e) => {
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
            ) : (
                []
            )}
        </>
    );
};
