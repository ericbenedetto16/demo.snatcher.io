import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
// eslint-disable-next-line object-curly-newline
import { makeStyles, Grid, CssBaseline, Typography } from '@material-ui/core';
import { GATEWAY_URL } from '../../api/queries';
import { getToken } from '../../utils';

const columns = [
    {
        field: 'id',
        hide: true,
        // eslint-disable-next-line arrow-body-style
        valueGetter: (params) => {
            return params.row.slug;
        },
    },
    {
        field: 'slug',
        headerName: 'Tracking Code',
        width: 150,
        flex: 0.75,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'fullUrl',
        headerName: 'Full URL',
        width: 150,
        flex: 1.75,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'createdAt',
        headerName: 'Date Created',
        width: 150,
        flex: 1,
        headerClassName: 'super-app-theme--header',
    },
];

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        paddingBottom: theme.spacing(6),
    },

    root: {
        height: 475,
        margin: '0 auto',
        width: '80%',
        '& .super-app-theme--header': {
            backgroundColor: '#e0e0e0',
        },
    },
}));

export const UserSlugs = () => {
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [slugs, setSlugs] = useState([]);
    const [page, setPage] = useState(0);

    const classes = useStyles();

    useEffect(() => {
        let cancelled = false;
        const f = async () => {
            let res = await fetch(`${GATEWAY_URL}/getSlugs`, {
                method: 'POST',
                headers: {
                    Authorization: getToken(),
                },
            });

            res = await res.json();

            if (res.success && !cancelled) {
                setSlugs(res.slugs);
                setLoading(false);
            }

            return undefined;
        };
        f();
        // eslint-disable-next-line no-return-assign
        return () => (cancelled = true);
    }, []);

    if (loading) return <p>Loading...</p>;
    return (
        <>
            <CssBaseline />
            <div className={classes.container}>
                <Typography
                    component='h1'
                    variant='h4'
                    align='center'
                    color='textPrimary'
                    gutterBottom
                >
                    Shortened Links
                </Typography>
                <Grid container spacing={2} justify='center'>
                    <Grid item sm={12} xs={12}>
                        <div className={classes.root}>
                            <DataGrid
                                autoPageSize
                                page={page}
                                onPageChange={(params) => {
                                    setPage(params.page);
                                }}
                                id='slug'
                                pageSize={5}
                                pagination
                                rows={slugs}
                                columns={columns}
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                                getRowId={(row) => row.slug}
                                onRowClick={(rowData) => {
                                    history.push(`/track/${rowData.id}`);
                                }}
                                sortModel={[
                                    {
                                        field: 'createdAt',
                                        sort: 'desc',
                                    },
                                ]}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};
