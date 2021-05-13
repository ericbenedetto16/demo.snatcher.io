import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';
import { GATEWAY_URL } from '../../api/queries';

const columns = [
    {
        field: 'slug',
        headerName: 'Slug',
        width: 150,
        flex: 0.75,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'ip',
        headerName: 'IP Adress',
        width: 150,
        flex: 1,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'dateAccessed',
        headerName: 'Date Accessed',
        width: 150,
        flex: 1.75,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'country',
        headerName: 'Country',
        width: 150,
        flex: 1,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'region',
        headerName: 'Region',
        width: 150,
        flex: 0.75,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'postal',
        headerName: 'Postal',
        width: 150,
        flex: 0.75,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'latitude',
        headerName: 'Latitude',
        width: 150,
        flex: 1,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'longitude',
        headerName: 'Longitude',
        width: 150,
        flex: 1,
        headerClassName: 'super-app-theme--header',
    },
];

const useStyles = makeStyles({
    root: {
        height: 400,
        width: '100%',
        '& .super-app-theme--header': {
            backgroundColor: '#e0e0e0',
        },
    },
});

export const SingleSlug = () => {
    const [loading, setLoading] = useState(true);
    const urlParams = useParams();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);

    const classes = useStyles();

    useEffect(() => {
        let cancelled = false;
        const f = async () => {
            let res = await fetch(`${GATEWAY_URL}/track/${urlParams.slug}`);

            res = await res.json();

            if (res.success && !cancelled) {
                setData(res.trackers);
                setLoading(false);
            }

            return undefined;
        };
        f();
        // eslint-disable-next-line no-return-assign
        return () => (cancelled = true);
    }, [urlParams]);

    if (loading) return <></>;

    return (
        <div className={classes.root}>
            <DataGrid
                autoPageSize
                page={page}
                onPageChange={(params) => {
                    setPage(params.page);
                }}
                pageSize={5}
                pagination
                rows={data}
                columns={columns}
                components={{
                    Toolbar: GridToolbar,
                }}
            />
        </div>
    );
};
