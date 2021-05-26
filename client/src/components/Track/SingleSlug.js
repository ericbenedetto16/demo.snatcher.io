import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import {
    makeStyles, Grid, CssBaseline, Typography,
} from '@material-ui/core';
import { GATEWAY_URL } from '../../api/queries';
import { Map as GoogleMap } from '../Map';

const columns = [
    {
        field: 'slug',
        headerName: 'Code',
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

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4),
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

const DEFAULT_CENTER = {
    lat: 40.724360,
    lng: -73.823897,
};

export const SingleSlug = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const urlParams = useParams();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [lat, setLat] = useState(DEFAULT_CENTER.lat);
    const [lng, setLng] = useState(DEFAULT_CENTER.lng);
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        if (!loading) {
            if (data.length > 0) {
                setLat(data[0].latitude);
                setLng(data[0].longitude);
                setZoom(11);
            }
        }
    }, [loading]);

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
        <>
            <CssBaseline />
            <div className={classes.container}>
                <Grid container spacing={2} justify='center'>
                    <Grid item sm={12} xs={12}>
                        <div className={classes.root}>
                            <Typography
                                component='h1'
                                variant='h2'
                                align='center'
                                color='textPrimary'
                                gutterBottom
                            >
                                Visitor Data
                            </Typography>
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
                                onRowClick={(rowData) => {
                                    // eslint-disable-next-line no-unused-expressions
                                    setLat(rowData.row.latitude);
                                    setLng(rowData.row.longitude);
                                }}
                                sortModel={[
                                    {
                                        field: 'dateAccessed',
                                        sort: 'desc',
                                    },
                                ]}
                            />
                        </div>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <div className={classes.root}>
                            {/* eslint-disable-next-line max-len */}
                            <GoogleMap lat={lat} lng={lng} data={data} zoom={zoom} DEFAULT_CENTER={DEFAULT_CENTER} />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};
